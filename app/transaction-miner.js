class TransactionMiner {
  constructor({ blockchain, transactionPool, wallet, pubsub }) {
    this.blockchain = blockchain;
    this.transactionPool;
    this.wallet = wallet;
    this.pubsub = pubsub;
  }

  mineTransactions() {
    // get the transaction pool's valid transactions

    // generate the miner's reward

    // add a block consisting of these transactionsto the blockxhain

    //broadcast the updated blockchain

    // clear the pool
  }
}

module.exports = TransactionMiner;
