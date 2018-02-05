const RandomStrategy = require('./randomStrategy');
const WeakestStrategy = require('./weakestStrategy');
const StrongestStrategy = require('./strongestStrategy');
const { STRATEGY_TYPE } = require('./strategy');

/**
 * Creates new Strategy classes
 *
 * @class StrategyFactory
 */
class StrategyFactory {
  /**
   * Creates new Strategy
   *
   * @static
   * @param {string} strategyType Type of strategy
   * @returns {Strategy}
   * @memberof StrategyFactory
   */
  static createStrategy(strategyType) {
    switch (strategyType) {
      case STRATEGY_TYPE.RANDOM:
        return new RandomStrategy();
      case STRATEGY_TYPE.WEAKEST:
        return new WeakestStrategy();
      case STRATEGY_TYPE.STRONGEST:
        return new StrongestStrategy();
      default:
        throw new Error('Invalid strategy');
    }
  }
}

module.exports = StrategyFactory;
