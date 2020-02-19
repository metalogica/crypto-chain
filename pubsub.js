const redis = require('redis');

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION'
};

class PubSub {
  constructor({ blockchain, transactionPool, redisUrl }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;

    this.publisher = redis.createClient(redisUrl);
    this.subscriber = redis.createClient(redisUrl);

    this.subscribeToChannels();

    this.subscriber.on(
      'message',
      (channel, message) => this.handleMessage(channel, message)
    );
  }

  subscribeToChannels() {
    Object.values(CHANNELS).forEach(channel => {
      this.subscriber.subscribe(channel);
    });
  }

  handleMessage(channel, message) {
    console.log(`Message received... Channel: ${channel}. Message: ${message}.`)

    const parsedMessage = JSON.parse(message);

    // Backup code for pubsub subscription; can be removed any time.
    // if (channel === CHANNELS.BLOCKCHAIN) {
    //   this.blockchain.replaceChain(parsedMessage);
    // }

    switch(channel) {
      case CHANNELS.blockchain:
        this.blockchain.replaceChain(parsedMessage, () => {
          this.transactionPool.clearBlockchainTransactions({
            chain: parsedMessage
          });
        });
      case CHANNELS.subscription:
        this.transactionPool.setTransaction(parsedMessage);
      default:
        return;
    }
  }

  publish({ channel, message}) {
    this.subscriber.unsubscribe(channel, () => {
      this.publisher.publish(channel, message, () => {
        this.subscriber.subscribe(channel);
      });
    });
  }

  broadcastChain() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain)
    });
  }
}

// const testPubSub = new PubSub();
// setTimeout(() => {testPubSub.publisher.publish(CHANNELS.TEST, 'foo')}, 1000);

module.exports = PubSub;
