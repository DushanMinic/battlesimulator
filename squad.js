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

    for (let i = this.unitList.length - 1; i >= 0; i -= 1) {
      const unit = this.unitList[i];
      // Decrement units health
      unit.getHit(damagePerUnit);
      // Remove unit if it has no health points
      if (!unit.isActive()) {
        this.unitList.splice(i, 1);
      }
    }
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