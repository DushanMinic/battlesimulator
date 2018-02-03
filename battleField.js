const Army = require('./army');
const { generateRandomNumber } = require('./helperFunctions');

class Battlefield {
  constructor(...armies) {
    if (armies.length < 2) {
      throw new Error('Battlefield requires at least 2 armies');
    }

    if (!armies.every(army => army instanceof Army)) {
      throw new Error('Invalid Army');
    }

    // Group all Army squads in one place, add Army ID and sort by lowest recharge time
    this.squads = armies
      .reduce((totalSquads, currentArmy, i) => {
        currentArmy.squads.forEach(squad => squad.armyId = i + 1);
        totalSquads.push(...currentArmy.squads);
        return totalSquads;
      }, []);

  }

  startSimulator() {
    let numberOfTurns = 0;

    while (!this.victoryCondition()) {
      this.squads = this.squads
        .sort((currentSquad, nextSquad) => currentSquad.getSquadTimeLeftToAttack() - nextSquad.getSquadTimeLeftToAttack());

      const [firstSquadToAttack, ...restOfTheSquads] = this.squads;
      const enemySquads = restOfTheSquads.filter(squad => firstSquadToAttack.armyId !== squad.armyId);
      // for testing purposes only, until strategies implemented
      const [randomEnemy] = enemySquads;

      const testArmy = this.squads.filter(squad => squad.armyId === 3).length;

      if (firstSquadToAttack.calculateAttack() > randomEnemy.calculateAttack()) {
        // Apply damage to the enemy Squad
        randomEnemy.getHit(firstSquadToAttack.calculateDamage());

        // Increase Soldier experience across the attacking Squad
        firstSquadToAttack.increaseSquadExperience();
      }

      // Decrease the time to attack of the rest of the Squads by the recharge time of Squad that was attacking
      const passedTime = firstSquadToAttack.getSquadTimeLeftToAttack();
      restOfTheSquads.forEach(squad => squad.decreaseTimeLeftToAttack(passedTime));
      // attacking squad should reset time left to attack
      firstSquadToAttack.resetTimeLeftToAttack();

      // Filter defeated Squads out of the Battlefield
      this.squads = this.squads.filter(squad => squad.isActive());

      numberOfTurns++;
    }
    console.log(`Number of turns taken: ${numberOfTurns}`);
    const [{ armyId }] = this.squads;
    console.log(`THE WINNER IS ARMY WITH ID OF: ${armyId}`);
  }

  victoryCondition() {
    const [firstSquad] = this.squads;
    return this.squads.every(squad => squad.armyId === firstSquad.armyId);
  }
}

const battleField = new Battlefield(
  new Army('weakest', 5),
  new Army('weakest', 1),
  new Army('strongest', 10, 10, 10, 10, 10),
);

battleField.startSimulator();