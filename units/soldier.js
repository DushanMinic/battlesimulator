const Unit = require('./unit');
const { generateRandomNumber } = require('../util/helperFunctions');

/**
 *
 * @class Soldier
 * @extends {Unit}
 */
class Soldier extends Unit {
  /**
   * Creates an instance of Soldier.
   * @param {number} [recharge] - Recharge time for Soldier unit
   * @memberof Soldier
   */
  constructor(recharge = generateRandomNumber(100, 2000)) {
    if (recharge < 100 || recharge > 2000) {
      throw new Error('Soldier recharge must be between 100 and 2000');
    }
    super(recharge);
  }

  /**
   * Calculates the attack probabilty of Soldier unit
   *
   * @returns {number} Chance to hit another unit
   * @memberof Soldier
   */
  calculateAttack() {
    return 0.5 * (1 + this.health / 100) * generateRandomNumber(30 + this.experience, 100) / 100;
  }

  /**
   * Calculates the damage of Soldier unit
   *
   * @returns {number} Amount of damage Soldier unit can do
   * @memberof Soldier
   */
  calculateDamage() {
    return 0.05 + this.experience / 100;
  }

  /**
   * Decrements Soldier health by the damage received
   *
   * @param {number} totalDamage Amount of the damage for Soldier unit to receive
   * @memberof Soldier
   */
  getHit(totalDamage) {
    this.health -= totalDamage;
    if (this.health < 0) {
      this.health = 0;
    }
  }

  /**
   * Returns Boolean on whether Soldier is active
   *
   * @returns {boolean}
   * @memberof Soldier
   */
  isActive() {
    return this.health > 0;
  }

  /**
   * Increases Soldier experience by 1, up to 50
   *
   * @memberof Soldier
   */
  increaseSoldierExperience() {
    if (this.experience < 50) {
      this.experience += 1;
    }
  }
}

module.exports = Soldier;