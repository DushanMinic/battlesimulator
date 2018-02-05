const { createWriteStream, truncateSync } = require('fs');
const path = require('path');

const battleLogFilePath = path.join(__dirname, '../battleLog.txt');

/**
 * Generates random number between min and max inclusive
 *
 * @param {number} min Generate number from
 * @param {number} max Generate number to
 * @returns {number} Random number
 */
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

/**
 * Calculates the geometric average
 *
 * @param {number} sum Product of numbers
 * @param {number} numberOfElements nth root of numbers length
 * @returns {number} Geometric average of numbers
 */
function geometricAverage(sum, numberOfElements) {
  return sum ** (1 / numberOfElements);
}

/**
 * Writes Battlefield events into battle log file
 *
 * @param {string} message Message to write into log
 */
function writeToBattleLog(message) {
  const battleLog = createWriteStream(battleLogFilePath, { flags: 'a' });
  battleLog.write(`${message}\n`);
}

/**
 * Empties the battle log
 */
function clearBattleLog() {
  truncateSync(battleLogFilePath, 0);
}

module.exports = {
  generateRandomNumber,
  geometricAverage,
  writeToBattleLog,
  clearBattleLog,
};
