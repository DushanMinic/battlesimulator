const Vehicle = require('./vehicle');
const Soldier = require('./soldier');
const { geometricAverage } = require('./helperFunctions');

class Squad {
  constructor(strategy) {
    const allowedStrategies = ['random', 'weakest', 'strongest'];
    if (!allowedStrategies.includes(strategy)) {
      throw new Error('Invalid strategy! Choose one between: random, weakest, strongest');
    }
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
    if (!(unit instanceof Vehicle) && !(unit instanceof Soldier)) {
      throw new Error('Unit must be Soldier or Vehicle');
    }
    this.unitList.push(unit);
  }
}

const newVehicle = new Vehicle(1200, 3);
newVehicle.addVehicleOperator(230, 0);
newVehicle.addVehicleOperator(150, 0);
newVehicle.addVehicleOperator(1500, 0);

const newSoldier = new Soldier(123);

const newSquad = new Squad('weakest');
newSquad.addUnit(newVehicle);
newSquad.addUnit(newSoldier);
console.log(newSquad.calculateAttack());
console.log(newSquad.calculateDamage());

module.exports = Squad;