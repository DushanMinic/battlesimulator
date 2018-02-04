class Unit {
  constructor(recharge) {
    this.health = 100;
    this.recharge = recharge;
    this.timeLeftToAttack = recharge;
    this.experience = 0;
  }
}

module.exports = Unit;