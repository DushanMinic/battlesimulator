var assert = require('assert');
const Battlefield = require('../battleField/battleField');
const Army = require('../battleField/army');

describe('Battlefield tests', () => {

  it('Should throw Error if trying to make a Battlefield with less than 2 Armies', () => {
    assert.throws(() => new Battlefield(
      new Army('strongest', 5, 6),
    ), Error);
  });

  it('Should simulate BattleField where most of the time Army with highest number of squads should win', () => {
    const newBattlefield = new Battlefield(
      new Army('weakest', 10, 10, 10, 10, 10),
      new Army('strongest', 5, 5),
      new Army('random', 5, 5),
    );

    newBattlefield.startSimulator();
    const winningArmy = newBattlefield.squads
      .every(squad => squad.armyId === 1);

    assert.ok(winningArmy);
  });
});