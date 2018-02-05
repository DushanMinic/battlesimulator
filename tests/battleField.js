const assert = require('assert');
const Battlefield = require('../battleField/battleField');
const Army = require('../battleField/army');
const { STRATEGY_TYPE } = require('../strategy/strategy');

describe('Battlefield tests', () => {

  it('Should throw Error if trying to make a Battlefield with less than 2 Armies', () => {
    assert.throws(() => new Battlefield(
      new Army(
        { squadStrategy: STRATEGY_TYPE.STRONGEST, unitsPerSquad: 7 },
      ),
    ), Error);
  });

  it('Should simulate BattleField where most of the time Army with highest number of squads should win', () => {
    const newBattlefield = new Battlefield(
      new Army(
        { squadStrategy: STRATEGY_TYPE.STRONGEST, unitsPerSquad: 10 },
        { squadStrategy: STRATEGY_TYPE.WEAKEST, unitsPerSquad: 10 },
        { squadStrategy: STRATEGY_TYPE.STRONGEST, unitsPerSquad: 10 },
        { squadStrategy: STRATEGY_TYPE.STRONGEST, unitsPerSquad: 10 },
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

    newBattlefield.startSimulator();
    const winningArmy = newBattlefield.squads
      .every(squad => squad.armyId === 1);

    assert.ok(winningArmy);
  });
});
