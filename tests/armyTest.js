const assert = require('assert');
const Army = require('../battleField/army');
const { STRATEGY_TYPE } = require('../strategy/strategy');
const RandomStrategy = require('../strategy/randomStrategy');
const WeakestStrategy = require('../strategy/weakestStrategy');

describe('Army tests', () => {
  it('Should create new Army with 2 Squads and check its primary stats', () => {
    const newArmy = new Army(
      { squadStrategy: STRATEGY_TYPE.RANDOM, unitsPerSquad: 5 },
      { squadStrategy: STRATEGY_TYPE.WEAKEST, unitsPerSquad: 7 },
    );
    const [firstSquad, secondSquad] = newArmy.squads;

    assert.equal(newArmy.squads.length, 2);
    assert.equal(firstSquad.numberOfUnits, 5);
    assert.equal(firstSquad.experiencePerUnit, 0);
    assert.equal(firstSquad.totalSquadHealth, 500);
    assert.ok(firstSquad.strategy instanceof RandomStrategy);
    assert.equal(secondSquad.numberOfUnits, 7);
    assert.equal(secondSquad.experiencePerUnit, 0);
    assert.equal(secondSquad.totalSquadHealth, 700);
    assert.ok(secondSquad.strategy instanceof WeakestStrategy);
  });

  it('Should throw Error if trying to make Army with wrong strategy', () => {
    assert.throws(() => new Army('nonExistantStrategy', 5, 9), Error);
  });

  it('Should throw Error if trying to make Army with less than 2 Squads', () => {
    assert.throws(() => new Army('weakest', 5), Error);
  });
});
