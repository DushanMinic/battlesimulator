const Unit = require('./unit');
const Soldier = require('./soldier');
const { geometricAverage, generateRandomNumber } = require('./helperFunctions');

class Vehicle extends Unit {
  constructor(numberOfOperators = generateRandomNumber(1, 3), recharge = generateRandomNumber(1000, 2000)) {
    if (recharge < 1000 || recharge > 2000) {
      throw new Error('Vehicle recharge must be between 1000 and 2000');
    }
    if (numberOfOperators < 1 || numberOfOperators > 3) {
      throw new Error('Operator numbers must be between 1 and 3');
    }

    super(recharge);
    this.vehicleOperators = [];

    // Add vehicle operators
    for (let i = 0; i < numberOfOperators; i += 1) {
      this.vehicleOperators.push(new Soldier());
    }

    this.averageOperatorsHP = this.vehicleOperators
      .reduce((total, operator) => total + operator.health, 0) / this.vehicleOperators.length;
    this.health += this.averageOperatorsHP;
  }

  // Calculates vehicle attack success probability
  calculateAttack() {
    const operatorsAttackProduct = this.vehicleOperators
      .reduce((total, operator) => total * operator.calculateAttack(), 1);

    return 0.5 * (1 + this.health / 100) * geometricAverage(operatorsAttackProduct, this.vehicleOperators.length);
  }

  // Calculates vehicle damage
  calculateDamage() {
    const operatorsExperienceSum = this.vehicleOperators
      .reduce((total, operator) => total + operator.experience / 100, 0);
    return 0.1 + operatorsExperienceSum;
  }
}

module.exports = Vehicle;