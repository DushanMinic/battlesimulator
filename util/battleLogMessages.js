const battleLogMessages = {
  squadAttacking: (attackingSquad, defendingSquad) => (
    [`Squad from an Army ${attackingSquad.armyId}, with attack chance of ${attackingSquad.calculateAttack()},`,
    `is attacking Squad from an Army ${defendingSquad.armyId}, with attack chance of ${defendingSquad.calculateAttack()}`].join(' ')
  ),
  squadGetsHit: (damage) => `Squad successfully hit for ${damage} damage`,
  squadDestroyed: () => `Squad is destroyed!`,
  endOfSimulation: (turns, armyId) => (
    `Number of turns taken for victory: ${turns}
  THE WINNER IS ARMY WITH ID OF: ${armyId}`
  ),
};

module.exports = battleLogMessages;