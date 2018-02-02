const Squad = require('./squad');
const Vehicle = require('./vehicle');
const Soldier = require('./soldier');
const { generateRandomNumber } = require('./helperFunctions');

class Army {
  constructor(numberOfSquads, strategy) {
    const allowedStrategies = ['random', 'weakest', 'strongest'];

    if (!allowedStrategies.includes(strategy)) {
      throw new Error('Invalid strategy! Choose one between: random, weakest, strongest');
    }

    if (numberOfSquads < 2) {
      throw new Error('Army must have minimum of 2 squads');
    }

    this.squads = [];

    // Create Squads for an Army
    for (let i = 0; i < numberOfSquads; i += 1) {
      const newSquad = new Squad(strategy);
      this.squads.push(newSquad);
    }
  }
}

console.log(require('util').inspect(new Army(2, 'weakest'), { colors: true, depth: null }));
module.exports = Army;