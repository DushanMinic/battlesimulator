const Battlefield = require('./battleField/battleField');
const Army = require('./battleField/army');
const { STRATEGY_TYPE } = require('./strategy/strategy');

// To start the battle simulation choose time scale speed of Battle (1 for real time, the higher the faster battle simulation ends)
// Then choose a valid strategy for each Squad in Army and start adding number of units for it
const battleField = new Battlefield(50,
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
battleField.startSimulator()
  .then(() => {
    console.log('SIMULATION FINISHED');
  })
  .catch(console.log);
