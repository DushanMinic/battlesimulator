const Army = require('./army');
const { writeToBattleLog, clearBattleLog } = require('../util/helperFunctions');
const battleLogMessages = require('../util/battleLogMessages');

/**
 *
 * @class Battlefield
 */
class Battlefield {
  /**
   * Creates an instance of Battlefield.
   * @param {number} [timeScale=1] Time scale speed of battlefield, 1 is realtime, the higher the faster simulation goes
   * @param {...Army} armies Instances of Armies to add into Battlefield
   * @memberof Battlefield
   */
  constructor(timeScale = 1, ...armies) {
    if (timeScale <= 0) {
      throw new Error('Time scale must be greater than zero');
    }

    if (armies.length < 2) {
      throw new Error('Battlefield requires at least 2 armies');
    }

    if (!armies.every(army => army instanceof Army)) {
      throw new Error('Invalid Army');
    }

    this.timeScale = timeScale;

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
  async startSimulator() {
    clearBattleLog();

    await Promise.all(this.squads.map(squad => squad.startBattle(this)));

    const [{ armyId }] = this.squads;
    writeToBattleLog(battleLogMessages.endOfSimulation(armyId));
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
