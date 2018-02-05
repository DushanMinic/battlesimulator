const { Strategy } = require('./strategy');

/**
 *
 * @class StrongestStrategy
 * @extends {Strategy}
 */
class StrongestStrategy extends Strategy {
  /**
   * Selects the strongest enemy squad
   *
   * @param {Object[]} enemySquads List of enemy Squads
   * @returns {Object} Strongest enemy Squad
   * @memberof StrongestStrategy
   */
  chooseEnemy(enemySquads) {
    const [strongestSquad] = enemySquads.sort((currentSquad, nextSquad) => {
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

    return strongestSquad;
  }
}

module.exports = StrongestStrategy;
