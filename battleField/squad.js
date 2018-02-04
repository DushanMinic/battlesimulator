const Vehicle = require('../units/vehicle');
const Soldier = require('../units/soldier');
const { geometricAverage, generateRandomNumber } = require('../util/helperFunctions');

/**
 * 
 * @class Squad
 */
class Squad {
  /**
   * Creates an instance of Squad.
   * @param {('weakest' | 'strongest' | 'random')} strategy Available Squad strategies
   * @param {number} numberOfUnits Number of units to create in a Squad, min 5, max 10
   * @memberof Squad
   */
  constructor(strategy, numberOfUnits) {
    if (!Number.isInteger(numberOfUnits)) {
      throw new Error('Number of units must be an integer');
    }

    if (numberOfUnits < 5 || numberOfUnits > 10) {
      throw new Error('Squad units number must be between 5 and 10');
    }

    this.strategy = strategy;
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
    const damagePerUnit = totalDamage / this.unitList.length;

    // Deal damage to each unit in squad
    this.unitList.forEach(unit => unit.getHit(damagePerUnit));

    // Remove units with no health points left
    this.unitList = this.unitList.filter(unit => unit.isActive());

    // Refresh Squad stats
    this.refreshSquadStats();
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
   * Sorts enemy Squads based on their strength (from strongest to weakest)
   * 
   * @param {object[]} enemySquads Enemy squads
   * @returns {object[]} List of enemy squads sorted by strength
   * @memberof Squad
   */
  sortEnemySquadsByStrength(enemySquads) {
    return enemySquads.sort((currentSquad, nextSquad) => {
      if (nextSquad.totalSquadHealth === currentSquad.totalSquadHealth) {
        if (nextSquad.experiencePerUnit === currentSquad.experiencePerUnit) {
          if (nextSquad.numberOfUnits === currentSquad.numberOfUnits) {
            if (nextSquad.totalSquadDamage === currentSquad.totalSquadDamage) {
              return -1;
            }
            return nextSquad.totalSquadDamage - currentSquad.totalSquadDamage;
          }
          return nextSquad.numberOfUnits - currentSquad.numberOfUnits;
        }
        return nextSquad.experiencePerUnit - currentSquad.experiencePerUnit;
      }
      return nextSquad.totalSquadHealth - currentSquad.totalSquadHealth;
    });
  }

  /**
   * Selects enemy based on strategy of the Ssquad
   * 
   * @param {object[]} enemySquads List of enemy squads to select from
   * @returns {object[]} Single enemy squad
   * @memberof Squad
   */
  chooseEnemy(enemySquads) {
    switch (this.strategy) {
      case 'strongest':
        return this.sortEnemySquadsByStrength(enemySquads)[0];
      case 'weakest':
        return this.sortEnemySquadsByStrength(enemySquads)[enemySquads.length - 1];
      default:
        return enemySquads[generateRandomNumber(0, enemySquads.length - 1)];
    }
  }
}

module.exports = Squad;