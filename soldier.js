const Unit = require('./unit');
const { generateRandomNumber } = require('./helperFunctions');

class Soldier extends Unit {
  constructor(recharge = generateRandomNumber(100, 2000)) {
    if (recharge < 100 || recharge > 2000) {
      throw new Error('Soldier recharge must be between 100 and 2000');
    }
    super(recharge);
    this.experience = 0;
  }

  calculateAttack() {
    return 0.5 * (1 + this.health / 100) * generateRandomNumber(30 + this.experience, 100) / 100;
  }

  calculateDamage() {
    return 0.05 + this.experience / 100;
  }

  getHit(totalDamage) {
    this.health -= totalDamage;
    if (this.health < 0) {
      this.health = 0;
    }
  }

  isActive() {
    return this.health > 0;
  }

  increaseSoldierExperience() {
    if (this.experience < 50) {
      this.experience += 1;
    }
  }
}

module.exports = Soldier;