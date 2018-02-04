const Squad = require('./squad');
const { generateRandomNumber } = require('../util/helperFunctions');

class Army {
  constructor(strategy, ...unitsPerSquad) {
    const allowedStrategies = ['random', 'weakest', 'strongest'];

    if (!allowedStrategies.includes(strategy)) {
      throw new Error('Invalid strategy! Choose one between: random, weakest, strongest');
    }

    if (unitsPerSquad.length < 2) {
      throw new Error('Army must have minimum of 2 squads');
    }

    // Create Squads for an Army
    this.squads = unitsPerSquad
      .map(units => new Squad(strategy, units));
  }
}

module.exports = Army;