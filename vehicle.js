const Unit = require('./unit');
const { geometricAverage } = require('./helperFunctions');

class Vehicle extends Unit {
  constructor(recharge, numberOfOperators) {
    if (recharge < 1000) {
      throw new Error('Vehicle recharge must be over 1000');
    }
    if (numberOfOperators > 3 || numberOfOperators < 1) {
      throw new Error('Operator numbers must be between 1 and 3');
    }
    super(recharge);
    this.numberOfOperators = numberOfOperators;
    this.operatorsList = [];
  }

  addSoldier(soldier) {
    if (this.operatorsList.length === this.numberOfOperators) {
      throw new Error('Vehicle operators limit reached');
    }
    this.operatorsList.push(soldier);
  }

  calculateAttack() {
    const operatorsAttackProduct = this.operatorsList
      .reduce((total, current) => total * current.calculateAttack(), 1);

    return 0.5 * (1 + this.health / 100) * geometricAverage(operatorsAttackProduct, this.operatorsList.length);
  }

  calculateDamage() {
    const operatorsExperienceSum = this.operatorsList
      .reduce((total, current) => total + current.experience / 100, 0);
    return 0.1 + operatorsExperienceSum;
  }
}

module.exports = Vehicle;