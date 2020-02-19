const redis = require('redis');

const CHANNELS = {
  TEST: 'TEST',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION'
};

class PubSub {
  constructor({ blockchain, transactionPool, redisUrl }) {
    console.log('redis url', redisUrl);

    this.blockchain = blockchain;
    this.transactionPool = transactionPool;

    console.log('booting up redis...');
    this.publisher = redis.createClient(process.env.REDIS_URL);
    this.subscriber = redis.createClient(process.env.REDIS_URL);
    console.log('redis successfully boot up');

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

module.exports = PubSub;
