const { generateRandomNumber } = require('../util/helperFunctions');

/**
 *
 * @class RandomStrategy
 * @extends {Strategy}
 */
class RandomStrategy {
  /**
   * Choosees random enemy Squad
   *
   * @param {Object[]} enemySquads List of enemy Squads
   * @returns {Object} Random enemy Squad
   * @memberof RandomStrategy
   */
  chooseEnemy(enemySquads) {
    return enemySquads[generateRandomNumber(0, enemySquads.length - 1)];
  }
}


module.exports = RandomStrategy;
