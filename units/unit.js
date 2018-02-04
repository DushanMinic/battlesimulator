/**
 * 
 * @class Unit
 */
class Unit {
  /**
   * Creates an instance of Unit.
   * @param {number} recharge - Time needed for unit to recharge
   * @memberof Unit
   */
  constructor(recharge) {
    this.health = 100;
    this.recharge = recharge;
    this.timeLeftToAttack = recharge;
    this.experience = 0;
  }
}

module.exports = Unit;