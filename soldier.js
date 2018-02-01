const Unit = require('./unit');
const { generateRandomNumber } = require('./helperFunctions');

class Soldier extends Unit {
  constructor(recharge, experience) {
    super(recharge);
    this.experience = experience;
  }

  calculateAttack() {
    return 0.5 * (1 + this.health / 100) * generateRandomNumber(30 + this.experience, 100) / 100;
  }

  calculateDamage() {
    return 0.05 + this.experience / 100;
  }
}

module.exports = Soldier;