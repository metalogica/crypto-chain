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

    this.publisher = redis.createClient('redis://h:p136dc6cc19cadae3d1cf5f81052b22701e34c29341aef040091d9a3c956916cd@ec2-23-22-216-104.compute-1.amazonaws.com:25629');
    this.subscriber = redis.createClient('redis://h:p136dc6cc19cadae3d1cf5f81052b22701e34c29341aef040091d9a3c956916cd@ec2-23-22-216-104.compute-1.amazonaws.com:25629');

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
