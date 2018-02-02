const Unit = require('./unit');
const Soldier = require('./soldier');
const { geometricAverage } = require('./helperFunctions');

class Vehicle extends Unit {
  constructor(recharge, numberOfOperators) {
    if (recharge < 1000 || recharge > 2000) {
      throw new Error('Vehicle recharge must be between 1000 and 2000');
    }
    if (numberOfOperators < 1 || numberOfOperators > 3) {
      throw new Error('Operator numbers must be between 1 and 3');
    }

    super(recharge);
    this.numberOfOperators = numberOfOperators;
    this.baseHealth = this.health;
    this.vehicleOperators = [];
  }

  // Adds new vehicle operator
  addVehicleOperator(recharge) {
    if (this.vehicleOperators.length === this.numberOfOperators) {
      throw new Error('Vehicle operators limit reached');
    }
    this.vehicleOperators.push(new Soldier(recharge));

    const averageOperatorsHP = this.vehicleOperators
      .reduce((total, operator) => total + operator.health, 0) / this.vehicleOperators.length;

    this.health = averageOperatorsHP + this.baseHealth;
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