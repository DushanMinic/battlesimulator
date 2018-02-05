const Squad = require('./squad');

/**
 *
 * @class Army
 */
class Army {
  /**
   * Creates an instance of Army.
   * @param {...Squad} squads Squad strategy and number of units per Squad
   * @memberof Army
   */
  constructor(...squads) {
    if (squads.length < 2) {
      throw new Error('Army must have minimum of 2 squads');
    }

    // Create Squads for an Army
    this.squads = squads
      .map(({ squadStrategy, unitsPerSquad }) => new Squad(squadStrategy, unitsPerSquad));
  }
}

module.exports = Army;
