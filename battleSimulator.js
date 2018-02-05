const Battlefield = require('./battleField/battleField');
const Army = require('./battleField/army');
const { STRATEGY_TYPE } = require('./strategy/strategy');

// To add an Army, choose a valid strategy and start adding number of units per Squad
const battleField = new Battlefield(
  new Army(
    { squadStrategy: STRATEGY_TYPE.STRONGEST, unitsPerSquad: 10 },
    { squadStrategy: STRATEGY_TYPE.WEAKEST, unitsPerSquad: 10 },
    { squadStrategy: STRATEGY_TYPE.STRONGEST, unitsPerSquad: 10 },
    { squadStrategy: STRATEGY_TYPE.STRONGEST, unitsPerSquad: 10 },
    { squadStrategy: STRATEGY_TYPE.WEAKEST, unitsPerSquad: 9 },
  ),
  new Army(
    { squadStrategy: STRATEGY_TYPE.WEAKEST, unitsPerSquad: 5 },
    { squadStrategy: STRATEGY_TYPE.RANDOM, unitsPerSquad: 9 },
    { squadStrategy: STRATEGY_TYPE.WEAKEST, unitsPerSquad: 5 },
  ),
  new Army(
    { squadStrategy: STRATEGY_TYPE.STRONGEST, unitsPerSquad: 7 },
    { squadStrategy: STRATEGY_TYPE.RANDOM, unitsPerSquad: 5 },
  ),
);

// Starts the simulation
battleField.startSimulator();
