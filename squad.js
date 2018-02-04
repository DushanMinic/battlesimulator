const Vehicle = require('./vehicle');
const Soldier = require('./soldier');
const { geometricAverage, generateRandomNumber } = require('./helperFunctions');

class Squad {
  constructor(strategy, numberOfUnits) {
    if (!Number.isInteger(numberOfUnits)) {
      throw new Error('Number of units must be an integer');
    }

    if (numberOfUnits < 5 || numberOfUnits > 10) {
      throw new Error('Squad units number must be between 5 and 10');
    }

    this.strategy = strategy;
    this.unitList = [];

    for (let i = 0; i < numberOfUnits; i += 1) {
      const randomUnit = generateRandomNumber(1, 2) === 1 ? new Vehicle() : new Soldier();
      this.unitList.push(randomUnit);
    }

  }

  calculateAttack() {
    const squadProductAttack = this.unitList
      .reduce((total, current) => total * current.calculateAttack(), 1);

    return geometricAverage(squadProductAttack, this.unitList.length);
  }

  calculateDamage() {
    return this.unitList
      .reduce((total, current) => total + current.calculateDamage(), 0);
  }

  getHit(totalDamage) {
    const damagePerUnit = totalDamage / this.unitList.length;

    // Deal damage to each unit in squad
    this.unitList.forEach(unit => unit.getHit(damagePerUnit));

    // Remove units with no health points left
    this.unitList = this.unitList.filter(unit => unit.isActive());
  }

  isActive() {
    return this.unitList.length > 0;
  }

  decreaseTimeLeftToAttack(passedTime) {
    this.unitList.forEach(unit => unit.timeLeftToAttack -= passedTime);
  }

  resetTimeLeftToAttack() {
    this.unitList.forEach(unit => unit.timeLeftToAttack = unit.recharge)
  }

  getSquadTimeLeftToAttack() {
    const [slowestTime] = this.unitList
      .sort((current, next) => next.timeLeftToAttack - current.timeLeftToAttack);
    return slowestTime.timeLeftToAttack;
  }

  increaseSquadExperience() {
    this.unitList.forEach(unit => unit.increaseSoldierExperience());
  }
}

module.exports = Squad;