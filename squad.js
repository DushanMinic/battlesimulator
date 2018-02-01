const Vehicle = require('./vehicle');
const Soldier = require('./soldier');
const { geometricAverage } = require('./helperFunctions');

class Squad {
  constructor(strategy) {
    this.strategy = strategy;
    this.unitList = [];
  }

  calculateAttack() {
    const squadProductAttack = this.unitList
      .reduce((total, current) => total + current.calculateAttack(), 0);

    return geometricAverage(squadProductAttack, this.unitList.length);
  }

  calculateDamage() {
    return this.unitList
      .reduce((total, current) => total + current.calculateDamage(), 0);
  }

  addUnit(unit) {
    this.unitList.push(unit);
  }
}

const newVehicle = new Vehicle(1200, 3);
newVehicle.addSoldier(new Soldier(150, 0));
newVehicle.addSoldier(new Soldier(150, 0));
newVehicle.addSoldier(new Soldier(150, 0));

const newSquad = new Squad('weak');
newSquad.addUnit(newVehicle);
console.log(newSquad.calculateAttack());
console.log(newSquad.calculateDamage());

module.exports = Squad;