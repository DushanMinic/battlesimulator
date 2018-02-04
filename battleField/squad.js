const Vehicle = require('../units/vehicle');
const Soldier = require('../units/soldier');
const { geometricAverage, generateRandomNumber } = require('../util/helperFunctions');

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

    this.totalSquadHealth = this.unitList.length * 100;
    this.experiencePerUnit = 0;
    this.numberOfUnits = this.unitList.length;
    this.totalSquadDamage = this.calculateDamage();
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

    // Refresh Squad stats
    this.refreshSquadStats();
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
    this.refreshSquadStats();
  }

  refreshSquadStats() {
    this.totalSquadHealth = this.unitList.reduce((totalHP, unit) => totalHP + unit.health, 0);
    this.experiencePerUnit = this.unitList.reduce((totalExp, unit) => totalExp + unit.experience, 0);
    this.numberOfUnits = this.unitList.length;
    this.totalSquadDamage = this.calculateDamage();
  }

  sortEnemySquadsByStrength(enemySquads) {
    return enemySquads.sort((currentSquad, nextSquad) => {
      if (nextSquad.totalSquadHealth === currentSquad.totalSquadHealth) {
        if (nextSquad.experiencePerUnit === currentSquad.experiencePerUnit) {
          if (nextSquad.numberOfUnits === currentSquad.numberOfUnits) {
            if (nextSquad.totalSquadDamage === currentSquad.totalSquadDamage) {
              return -1;
            }
            return nextSquad.totalSquadDamage - currentSquad.totalSquadDamage;
          }
          return nextSquad.numberOfUnits - currentSquad.numberOfUnits;
        }
        return nextSquad.experiencePerUnit - currentSquad.experiencePerUnit;
      }
      return nextSquad.totalSquadHealth - currentSquad.totalSquadHealth;
    });
  }

  chooseEnemy(enemySquads) {
    switch (this.strategy) {
      case 'strongest':
        return this.sortEnemySquadsByStrength(enemySquads)[0];
      case 'weakest':
        return this.sortEnemySquadsByStrength(enemySquads)[enemySquads.length - 1];
      default:
        return enemySquads[generateRandomNumber(0, enemySquads.length - 1)];
    }
  }
}

module.exports = Squad;