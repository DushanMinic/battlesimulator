const { createWriteStream, unlinkSync } = require('fs');
const path = require('path');
const battleLogFilePath = path.join(__dirname, '../battleLog.txt');

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

function geometricAverage(sum, numberOfElements) {
  return sum ** (1 / numberOfElements);
}

function writeToBattleLog(message) {
  const battleLog = createWriteStream(battleLogFilePath, { flags: 'a' });
  battleLog.write(`${message}\n`);
}

function clearBattleLog() {
  unlinkSync(battleLogFilePath);
}

module.exports = {
  generateRandomNumber,
  geometricAverage,
  writeToBattleLog,
  clearBattleLog,
};
