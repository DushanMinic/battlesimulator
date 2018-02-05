const assert = require('assert');
const Squad = require('../battleField/squad');
const { STRATEGY_TYPE } = require('../strategy/strategy');
const StrongestStrategy = require('../strategy/strongestStrategy');

describe('Squad tests', () => {
  it('Should throw Error if trying to make Squad with less than 5 units', () => {
    assert.throws(() => new Squad(STRATEGY_TYPE.STRONGEST, 4), Error);
  });

  it('Should create new Squad with 7 units, strongest strategy and check its stats', () => {
    const newSquad = new Squad(STRATEGY_TYPE.STRONGEST, 7);

    assert.equal(newSquad.numberOfUnits, 7);
    assert.equal(newSquad.experiencePerUnit, 0);
    assert.equal(newSquad.totalSquadHealth, 700);
    assert.ok(newSquad.totalSquadDamage > 0.35);
    assert.ok(newSquad.strategy instanceof StrongestStrategy);
    assert.equal(newSquad.isActive(), true);
  });

  it('Squad should be considered inactive if it has no units left', () => {
    const newSquad = new Squad(STRATEGY_TYPE.STRONGEST, 7);
    newSquad.getHit(10000);

    assert.equal(newSquad.numberOfUnits, 0);
    assert.equal(newSquad.isActive(), false);
  });

  it('Attacking Squad should choose strongest Squad to attack', () => {
    const newSquad = new Squad(STRATEGY_TYPE.STRONGEST, 7);
    const enemySquads = [new Squad(STRATEGY_TYPE.RANDOM, 5), new Squad(STRATEGY_TYPE.RANDOM, 9)];

    const strongestSquad = newSquad.chooseEnemy(enemySquads);

    assert.equal(strongestSquad.numberOfUnits, 9);
    assert.equal(newSquad.isActive(), true);
  });

  it('Attacking Squad should choose weakest Squad to attack', () => {
    const newSquad = new Squad(STRATEGY_TYPE.WEAKEST, 7);
    const enemySquads = [new Squad(STRATEGY_TYPE.STRONGEST, 5), new Squad(STRATEGY_TYPE.STRONGEST, 9)];

    const weakestSquad = newSquad.chooseEnemy(enemySquads);

    assert.equal(weakestSquad.numberOfUnits, 5);
    assert.equal(newSquad.isActive(), true);
  });
});
