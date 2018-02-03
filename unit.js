class Unit {
  constructor(recharge) {
    this.health = 100;
    this.recharge = recharge;
    this.timeLeftToAttack = recharge;
  }
}

module.exports = Unit;