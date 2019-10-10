const INITIAL_DIFFICULTY = 3;

const MINE_RATE = 1000;

const STARTING_BALANCE = 1000;

const GENESIS_DATA = {
  timestamp:1,
  lastHash:'-----',
  hash: 'hash-one',
  data: [],
  difficulty:INITIAL_DIFFICULTY
};

module.exports = { GENESIS_DATA, MINE_RATE, STARTING_BALANCE };
