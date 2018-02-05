const Vehicle = require('../units/vehicle');
const Soldier = require('../units/soldier');
const { geometricAverage, generateRandomNumber, writeToBattleLog } = require('../util/helperFunctions');
const battleLogMessages = require('../util/battleLogMessages');
const StrategyFactory = require('../strategy/strategyFactory');

/**
 *
 * @class Squad
 */
class Squad {
  /**
   * Creates an instance of Squad.
   * @param {string} strategy Squad strategies
   * @param {number} numberOfUnits Number of units to create in a Squad, min 5, max 10
   * @memberof Squad
   */
  constructor(strategyType, numberOfUnits) {
    if (!Number.isInteger(numberOfUnits)) {
      throw new Error('Number of units must be an integer');
    }

    if (numberOfUnits < 5 || numberOfUnits > 10) {
      throw new Error('Squad units number must be between 5 and 10');
    }

    this.strategy = StrategyFactory.createStrategy(strategyType);
    this.unitList = [];

    for (let i = 0; i < numberOfUnits; i += 1) {
      const randomUnit = generateRandomNumber(1, 2) === 1 ? new Vehicle() : new Soldier();
      this.unitList.push(randomUnit);
    }

    this.totalSquadHealth = this.unitList.length * 100;
    this.experiencePerUnit = 0;
    this.numberOfUnits = this.unitList.length;
    this.totalSquadDamage = this.calculateDamage();
  }

  /**
   * Calculates the attack success probabilty of a Squad
   *
   * @returns {number} Squad chance to hit
   * @memberof Squad
   */
  calculateAttack() {
    const squadProductAttack = this.unitList
      .reduce((total, current) => total * current.calculateAttack(), 1);

    return geometricAverage(squadProductAttack, this.unitList.length);
  }

  /**
   * Calculates the damage of the Squad
   *
   * @returns {number} Amount of damage Squad can deal
   * @memberof Squad
   */
  calculateDamage() {
    return this.unitList
      .reduce((total, current) => total + current.calculateDamage(), 0);
  }

  /**
   * Decrements health of all units in a Squad respectively
   *
   * @param {number} totalDamage Amount of damage Squad units will receieve respectively
   * @memberof Squad
   */
  getHit(totalDamage) {
    writeToBattleLog(battleLogMessages.squadGetsHit(totalDamage));

    const damagePerUnit = totalDamage / this.unitList.length;

    // Deal damage to each unit in squad
    this.unitList.forEach(unit => unit.getHit(damagePerUnit));

    // Remove units with no health points left
    this.unitList = this.unitList.filter(unit => unit.isActive());

    // Refresh Squad stats
    this.refreshSquadStats();

    if (!this.isActive()) {
      writeToBattleLog(battleLogMessages.squadDestroyed());
    }
  }

  /**
   * Returns whether Squad is active
   *
   * @returns {boolean}
   * @memberof Squad
   */
  isActive() {
    return this.unitList.length > 0;
  }

  /**
   * Decreases time left to attack for all units accross Squad
   *
   * @param {number} passedTime Time passed of the attacking Squad
   * @memberof Squad
   */
  decreaseTimeLeftToAttack(passedTime) {
    this.unitList.forEach(unit => unit.timeLeftToAttack -= passedTime);
  }

  /**
   * Resets the Squad units time left to attack to default
   *
   * @memberof Squad
   */
  resetTimeLeftToAttack() {
    this.unitList.forEach(unit => unit.timeLeftToAttack = unit.recharge)
  }

  /**
   * Calculates the Squad time left to attack based on its slowest unit
   *
   * @returns {number} Time required for Squad to attack
   * @memberof Squad
   */
  getSquadTimeLeftToAttack() {
    const [slowestTime] = this.unitList
      .sort((current, next) => next.timeLeftToAttack - current.timeLeftToAttack);
    return slowestTime.timeLeftToAttack;
  }

  /**
   * Increases the units experience across the squad
   *
   * @memberof Squad
   */
  increaseSquadExperience() {
    this.unitList.forEach(unit => unit.increaseSoldierExperience());
    this.refreshSquadStats();
  }

  /**
   * Refreshes Squads stats (total Squad health, experience per unit, number of units, total Squad damage)
   *
   * @memberof Squad
   */
  refreshSquadStats() {
    this.totalSquadHealth = this.unitList.reduce((totalHP, unit) => totalHP + unit.health, 0);
    this.experiencePerUnit = this.unitList.reduce((totalExp, unit) => totalExp + unit.experience, 0);
    this.numberOfUnits = this.unitList.length;
    this.totalSquadDamage = this.calculateDamage();
  }

  /**
   * Selects enemy based on strategy of the Ssquad
   *
   * @param {object[]} enemySquads List of enemy squads to select from
   * @returns {object[]} Single enemy squad
   * @memberof Squad
   */
  chooseEnemy(enemySquads) {
    return this.strategy.chooseEnemy(enemySquads);
  }

  /**
   * Find enemy squad to attack
   *
   * @param {Battlefield} battleField Battlefield of squads
   * @returns {boolean} Returns true if there are no enemy squads to hit
   * @memberof Squad
   */
  seekAndDestroy(battleField) {
    const enemySquads = battleField.squads.filter(squad => this.armyId !== squad.armyId);

    if (!enemySquads.length) {
      return true;
    }

    const defendingSquad = this.chooseEnemy(enemySquads);

    writeToBattleLog(battleLogMessages.squadAttacking(this, defendingSquad));

    if (this.calculateAttack() > defendingSquad.calculateAttack()) {

      // Apply damage to the enemy Squad
      defendingSquad.getHit(this.calculateDamage());

      // Increase Soldier experience across the attacking Squad
      this.increaseSquadExperience();
    }

    // Attacking squad should reset time left to attack
    this.resetTimeLeftToAttack();

    // Filter defeated Squads out of the Battlefield
    battleField.squads = battleField.squads.filter(squad => squad.isActive());

    return battleField.victoryCondition();
  }

  /**
   * Starts the battle for Squad
   *
   * @param {Battlefield} battleField Battlefield of squads
   * @returns {Promise}
   * @memberof Squad
   */
  async startBattle(battleField) {
    const passedTime = this.getSquadTimeLeftToAttack();

    await this.delay(passedTime / battleField.timeScale);

    if (!this.isActive()) {
      return false;
    }

    const victory = this.seekAndDestroy(battleField);

    if (victory) {
      return true;
    }

    return this.startBattle(battleField);
  }

  /**
   * Delays the time in battlefield
   *
   * @param {number} ms Number of milliseconds to delay the Squad time
   * @returns {Promise}
   * @memberof Squad
   */
  delay(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
}

module.exports = Squad;
