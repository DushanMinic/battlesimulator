const Battlefield = require('./battleField/battleField');
const Army = require('./battleField/army');

const battleField = new Battlefield(
  new Army('strongest', 10, 10, 10, 10, 10),
  new Army('weakest', 5, 7),
  new Army('random', 5, 9),
);

battleField.startSimulator();