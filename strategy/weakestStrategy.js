const { Strategy } = require('./strategy');

/**
 *
 * @class WeakestStrategy
 * @extends {Strategy}
 */
class WeakestStrategy extends Strategy {
  /**
   * Selects weakest enemy Squad
   *
   * @param {Object[]} enemySquads List of enemy squads to choose from
   * @returns {Object} Weakest enemy Squad
   * @memberof WeakestStrategy
   */
  chooseEnemy(enemySquads) {
    const [weakestSquad] = enemySquads.sort((currentSquad, nextSquad) => {
      if (currentSquad.totalSquadHealth === nextSquad.totalSquadHealth) {
        if (currentSquad.experiencePerUnit === nextSquad.experiencePerUnit) {
          if (currentSquad.numberOfUnits === nextSquad.numberOfUnits) {
            if (currentSquad.totalSquadDamage === nextSquad.totalSquadDamage) {
              return -1;
            }
            return currentSquad.totalSquadDamage - nextSquad.totalSquadDamage;
          }
          return currentSquad.numberOfUnits - nextSquad.numberOfUnits;
        }
        return currentSquad.experiencePerUnit - nextSquad.experiencePerUnit;
      }
      return currentSquad.totalSquadHealth - nextSquad.totalSquadHealth;
    });

    return weakestSquad;
  }
}

module.exports = WeakestStrategy;
