const Army = require('./army');
const { generateRandomNumber, writeToBattleLog, clearBattleLog } = require('../util/helperFunctions');

/**
 * 
 * @class Battlefield
 */
class Battlefield {
  /**
   * Creates an instance of Battlefield.
   * @param {...Army} armies Instances of Armies to add into Battlefield
   * @memberof Battlefield
   */
  constructor(...armies) {
    if (armies.length < 2) {
      throw new Error('Battlefield requires at least 2 armies');
    }

    if (!armies.every(army => army instanceof Army)) {
      throw new Error('Invalid Army');
    }

    // Group all Army squads in one place and assign Army Id
    this.squads = armies
      .reduce((totalSquads, currentArmy, i) => {
        currentArmy.squads.forEach(squad => squad.armyId = i + 1);
        totalSquads.push(...currentArmy.squads);
        return totalSquads;
      }, []);

  }

  /**
   * Starts the Battlefield simulator. It lasts until there is only one Army left
   * 
   * @memberof Battlefield
   */
  startSimulator() {
    let numberOfTurns = 1;
    clearBattleLog();

    while (!this.victoryCondition()) {
      this.squads = this.squads
        .sort((currentSquad, nextSquad) => currentSquad.getSquadTimeLeftToAttack() - nextSquad.getSquadTimeLeftToAttack());

      const [attackingSquad, ...restOfTheSquads] = this.squads;
      const enemySquads = restOfTheSquads.filter(squad => attackingSquad.armyId !== squad.armyId);
      const defendingSquad = attackingSquad.chooseEnemy(enemySquads);

      if (attackingSquad.calculateAttack() > defendingSquad.calculateAttack()) {
        // Apply damage to the enemy Squad
        defendingSquad.getHit(attackingSquad.calculateDamage());

        // Increase Soldier experience across the attacking Squad
        attackingSquad.increaseSquadExperience();
      }

      // Decrease the time to attack of the rest of the Squads by the recharge time of Squad that was attacking
      const passedTime = attackingSquad.getSquadTimeLeftToAttack();
      restOfTheSquads.forEach(squad => squad.decreaseTimeLeftToAttack(passedTime));
      // Attacking squad should reset time left to attack
      attackingSquad.resetTimeLeftToAttack();

      // Filter defeated Squads out of the Battlefield
      this.squads = this.squads.filter(squad => squad.isActive());

      numberOfTurns++;
    }

    const [{ armyId }] = this.squads;
    writeToBattleLog(`Number of turns taken: ${numberOfTurns}`)
    writeToBattleLog(`THE WINNER IS ARMY WITH ID OF: ${armyId}`)
  }

  /**
   * Returns whether victory conditions are met
   * 
   * @returns {boolean}
   * @memberof Battlefield
   */
  victoryCondition() {
    const [firstSquad] = this.squads;
    return this.squads.every(squad => squad.armyId === firstSquad.armyId);
  }
}

module.exports = Battlefield;