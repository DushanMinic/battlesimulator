const { clearBattleLog } = require('../util/helperFunctions');

// Clears battle log after tests complete
after(() => {
  clearBattleLog();
});