const assert = require('assert');
const Vehicle = require('../units/vehicle');

describe('Vehicle tests', () => {
  it('Should create new Vehicle with 3 Vehicle operators, 1100 recharge time and check its primary stats', () => {
    const newVehicle = new Vehicle(3, 1100);


    assert.equal(newVehicle.recharge, 1100);
    assert.equal(newVehicle.timeLeftToAttack, 1100);
    assert.equal(newVehicle.vehicleOperators.length, 3);
    assert.ok(newVehicle.calculateAttack() > 0.28);

    const vehicleOpsPrimaryStats = newVehicle.vehicleOperators
      .every(operator => (
        operator.experience === 0
        && operator.health === 100
        && operator.recharge > 100
        && operator.recharge < 2000
      ));

    assert.equal(vehicleOpsPrimaryStats, true);
    assert.equal(newVehicle.calculateDamage(), 0.1);
    assert.equal(newVehicle.isActive(), true);
  });

  it('Should increase Vehicle operators experience', () => {
    const newVehicle = new Vehicle(3, 1100);
    newVehicle.increaseSoldierExperience();

    const vehicleOperatorsExp = newVehicle.vehicleOperators
      .every(operator => operator.experience === 1);

    assert.equal(vehicleOperatorsExp, true);
    assert.equal(newVehicle.isActive(), true);
  });

  it('Vehicle with only 1 active Vehicle operator should get 50% of total damage (10) when it\'s hit', () => {
    const newVehicle = new Vehicle(1, 1100);
    newVehicle.getHit(10);
    const [unluckyGuy] = newVehicle.vehicleOperators;

    assert.equal(newVehicle.health, 95);
    assert.equal(unluckyGuy.health, 95);
    assert.equal(newVehicle.isActive(), true);
  });

  it('Vehicle with 3 active Vehicle operator should get 30% of total damage (10) when it\'s hit', () => {
    const newVehicle = new Vehicle(3, 1100);
    newVehicle.getHit(10);

    const unluckyGuy = newVehicle.vehicleOperators
      .find(operator => operator.health === 95);

    const restOfTheOperatorsHealth = newVehicle.vehicleOperators
      .filter(operator => operator.health === 99);

    assert.equal(newVehicle.health, 97);
    assert.equal(unluckyGuy.health, 95);
    assert.equal(restOfTheOperatorsHealth.length, 2);
    assert.equal(newVehicle.isActive(), true);
  });
});