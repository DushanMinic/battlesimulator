function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}

function geometricAverage(sum, numberOfElements) {
  return sum ** (1 / numberOfElements);
}

module.exports = {
  generateRandomNumber,
  geometricAverage,
};
