var assert = require('assert');
const Squad = require('../battleField/squad');

describe('Squad tests', () => {
  it('Should throw Error if trying to make Squad with less than 5 units', () => {
    assert.throws(() => new Squad('strongest', 4), Error);
  });

  it('Should create new Squad with 7 units, strongest strategy and check its stats', () => {
    const newSquad = new Squad('strongest', 7);

    assert.equal(newSquad.numberOfUnits, 7);
    assert.equal(newSquad.experiencePerUnit, 0);
    assert.equal(newSquad.totalSquadHealth, 700);
    assert.ok(newSquad.totalSquadDamage > 0.35);
    assert.equal(newSquad.strategy, 'strongest');
    assert.equal(newSquad.isActive(), true);
  });

  it('Squad should be considered inactive if it has no units left', () => {
    const newSquad = new Squad('strongest', 7);
    newSquad.getHit(10000);

    assert.equal(newSquad.numberOfUnits, 0);
    assert.equal(newSquad.isActive(), false);
  });

  it('Attacking Squad should choose strongest Squad to attack', () => {
    const newSquad = new Squad('strongest', 7);
    const enemySquads = [new Squad('random', 5), new Squad('random', 9)];

    const strongestSquad = newSquad.chooseEnemy(enemySquads);

    assert.equal(strongestSquad.numberOfUnits, 9);
    assert.equal(newSquad.isActive(), true);
  });

  it('Attacking Squad should choose weakest Squad to attack', () => {
    const newSquad = new Squad('weakest', 7);
    const enemySquads = [new Squad('strongest', 5), new Squad('weakest', 9)];

    const weakestSquad = newSquad.chooseEnemy(enemySquads);

    assert.equal(weakestSquad.numberOfUnits, 5);
    assert.equal(newSquad.isActive(), true);
  });
});