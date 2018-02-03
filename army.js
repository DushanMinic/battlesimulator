const Squad = require('./squad');
const { generateRandomNumber } = require('./helperFunctions');

class Army {
  constructor(strategy, ...unitsPerSquad) {
    const allowedStrategies = ['random', 'weakest', 'strongest'];

    if (!allowedStrategies.includes(strategy)) {
      throw new Error('Invalid strategy! Choose one between: random, weakest, strongest');
    }

    if (unitsPerSquad.length < 2) {
      throw new Error('Army must have minimum of 2 squads');
    }

    this.squads = [];

    // Create Squads for an Army
    for (let i = 0; i < unitsPerSquad.length; i += 1) {
      const numberOfUnits = unitsPerSquad[i];
      const newSquad = new Squad(strategy, numberOfUnits);
      this.squads.push(newSquad);
    }
  }
}

const newArmy = new Army('random', 5, 6);
// console.log(require('util').inspect(newArmy, { colors: true, depth: null }));

module.exports = Army;