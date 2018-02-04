var assert = require('assert');
const Soldier = require('../units/soldier');

describe('Soldier tests', () => {
  it('Should create new Soldier with 200ms recharge time and check his primary stats', () => {
    const newSoldier = new Soldier(200);

    assert.equal(newSoldier.recharge, 200);
    assert.equal(newSoldier.experience, 0);
    assert.equal(newSoldier.timeLeftToAttack, 200);
    assert.equal(newSoldier.calculateDamage(), 0.05);
    assert.ok(newSoldier.calculateAttack() > 0.29);
    assert.equal(newSoldier.isActive(), true);
  });

  it('Should increase Soldier experience by 1 point', () => {
    const newSoldier = new Soldier(100);
    newSoldier.increaseSoldierExperience();

    assert.equal(newSoldier.experience, 1);
    assert.equal(newSoldier.recharge, 100);
    assert.equal(newSoldier.timeLeftToAttack, 100);
    assert.equal(Number(newSoldier.calculateDamage().toFixed(2)), 0.06);
    assert.ok(newSoldier.calculateAttack() > 0.29);
    assert.equal(newSoldier.isActive(), true);
  });

  it('Should decrease Soldier health by 1 point when he gets hit by 1 damage', () => {
    const newSoldier = new Soldier(100);
    newSoldier.getHit(1);

    assert.equal(newSoldier.health, 99);
    assert.equal(newSoldier.experience, 0);
    assert.equal(newSoldier.recharge, 100);
    assert.equal(newSoldier.timeLeftToAttack, 100);
    assert.equal(newSoldier.calculateDamage(), 0.05);
    assert.ok(newSoldier.calculateAttack() > 0.29);
    assert.equal(newSoldier.isActive(), true);
  });

  it('Should return that Soldier is not active if its health drops to 0', () => {
    const newSoldier = new Soldier(100);
    newSoldier.getHit(100);

    assert.equal(newSoldier.health, 0);
    assert.equal(newSoldier.isActive(), false);
  });
});