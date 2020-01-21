const Block = require('./block');
const { cryptoHash } = require('../util');
const { REWARD_INPUT, MINING_REWARD } = require('../config');

class Blockchain {
  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock({ data }) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length-1],
      data
    });

    this.chain.push(newBlock);
  }

  replaceChain(chain, onSuccess)  {
    if (chain.length <= this.chain.length) {
      console.error('The incoming chain must be longer');
      return;
    }

    if (!Blockchain.isValid(chain)) {
      console.error('The incoming chain must be valid!');
      return;
    }

    if (onSuccess) onSuccess();
    console.log('replacing chain with ', chain);
    this.chain = chain;
  }

  validTransactionData({ chain }) {
    for (let i=1; i<chain.length; i++) {
      const block = chain[i];
      let rewardTransactionData = 0;

      for (let transaction of block.data) {
        if (transaction.input.address === REWARD_INPUT.address) {
          rewardTransactionData += 1;

          if (rewardTransactionData > 1) {
            console.error('Miner reward exceeds limit');
            return false;
          }
        }
      }
    }

    return true;
  }

  static isValid(chain) {
    if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
      return false;
    }

    for (let i=1; i<chain.length; i++) {
      const { timestamp, lastHash, hash, data, nonce, difficulty } = chain[i];
      const lastDifficulty = chain[i-1].difficulty;

      const actualLastHash = chain[i-1].hash;

      if (lastHash !== actualLastHash) return false;

      const validatedHash = cryptoHash(timestamp, lastHash, data, nonce, difficulty);

      if(hash != validatedHash) return false;

      if((lastDifficulty - difficulty) > 1) return false;
    }

    return true;
  }
}

module.exports = Blockchain;
