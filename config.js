const INITIAL_DIFFICULTY = 2;

const MINE_RATE = 1000;

const STARTING_BALANCE = 1000;

const GENESIS_DATA = {
  timestamp: 1,
  lastHash: '------',
  hash: 'hash-one',
  data: [],
  difficulty: INITIAL_DIFFICULTY
};

const REWARD_INPUT = { adress: '*authorized-reward*' };

const MINING_REWARD = 50;

module.exports = { GENESIS_DATA, MINE_RATE, STARTING_BALANCE, REWARD_INPUT, MINING_REWARD };
