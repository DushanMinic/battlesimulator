var assert = require('assert');
const Army = require('../battleField/army');

describe('Army tests', () => {
  it('Should create new Army with 2 Squads and check its primary stats', () => {
    const newArmy = new Army('random', 5, 7);
    const [firstSquad, secondSquad] = newArmy.squads;

    assert.equal(newArmy.squads.length, 2);
    assert.equal(firstSquad.numberOfUnits, 5);
    assert.equal(firstSquad.experiencePerUnit, 0);
    assert.equal(firstSquad.totalSquadHealth, 500);
    assert.equal(secondSquad.numberOfUnits, 7);
    assert.equal(secondSquad.experiencePerUnit, 0);
    assert.equal(secondSquad.totalSquadHealth, 700);
  });

  it('Should throw Error if trying to make Army with wrong strategy', () => {
    assert.throws(() => new Army('nonExistantStrategy', 5, 9), Error);
  });

  it('Should throw Error if trying to make Army with less than 2 Squads', () => {
    assert.throws(() => new Army('weakest', 5), Error);
  });
});