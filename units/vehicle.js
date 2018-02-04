const Unit = require('./unit');
const Soldier = require('./soldier');
const { geometricAverage, generateRandomNumber } = require('../util/helperFunctions');

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

  isActive() {
    return this.health > 0 && this.vehicleOperators.length > 0;
  }

  getHit(totalDamage) {
    const damageToVehicle = totalDamage * 30 / 100;
    const damageToUnluckyGuy = totalDamage * 50 / 100;

    // If there is only 1 vehicle operator, deal only damage to it
    if (this.vehicleOperators.length === 1) {
      const restOfTheDamage = totalDamage * 20 / 100;
      this.health -= damageToVehicle + restOfTheDamage;
      this.vehicleOperators[0].health -= damageToUnluckyGuy;
    } else {
      const restOfTheDamagePerOperator = totalDamage * 20 / 100 / (this.vehicleOperators.length - 1);
      const unluckyGuyIndex = generateRandomNumber(0, this.vehicleOperators.length - 1);

      for (let i = 0; i < this.vehicleOperators.length; i += 1) {
        const vehicleOperator = this.vehicleOperators[i];
        // Decrement Vehicle Operator health
        vehicleOperator.health -= unluckyGuyIndex === i ? damageToUnluckyGuy : restOfTheDamagePerOperator;
      }

      // Deal damage to vehicle
      this.health -= damageToVehicle;
    }

    // Remove innactive Vehicle Operators
    this.vehicleOperators = this.vehicleOperators
      .filter(operator => operator.isActive());
  }

  increaseSoldierExperience() {
    this.vehicleOperators.forEach(unit => unit.increaseSoldierExperience());
    this.experience += this.vehicleOperators.length;
  }
}

module.exports = Vehicle;