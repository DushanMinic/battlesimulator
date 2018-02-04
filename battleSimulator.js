const Battlefield = require('./battleField/battleField');
const Army = require('./battleField/army');

// To add an Army, choose a valid strategy and start adding number of units per Squad
const battleField = new Battlefield(
  new Army('strongest', 10, 10, 10, 10, 10),
  new Army('weakest', 5, 7),
  new Army('random', 5, 9),
);

// Starts the simulation
battleField.startSimulator();