const Blockchain = require('./blockchain');
const Block = require('./block');

describe('Blockchain()', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  })

  it('contains a `chain` Array instance', () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it('starts with the genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block to the chain', () => {
    const newData = 'foo bar';
    blockchain.addBlock({data: newData});

    expect(blockchain.chain[blockchain.chain.length-1].data).toEqual(newData);
  });

  describe('is validChain()', () => {
    beforeEach(() => {
      blockchain.addBlock({ data: 'Bears' });
      blockchain.addBlock({ data: 'Beets' });
      blockchain.addBlock({ data: 'Brooms' });
    })

    describe('when the chain does not start with the genesis block', ()=> {
      it('returns false', () => {
        blockchain.chain[0] = { data: 'fake-gensis' };

        expect(Blockchain.isValid(blockchain.chain)).toBe(false);
      });
    });

    describe('when the chain starts with the genesis block and has multiple blocks', () => {
      describe('and a lastHash reference has changed', () => {
        it('returns false', () =>{
          blockchain.chain[2].lastHash = 'some alteration in the hash';

          expect(Blockchain.isValid(blockchain.chain)).toBe(false);
        })
      });

      describe('and the chain contains a block with an invalid field', () => {
        it('returns false', () => {
          blockchain.chain[2].data = 'Donald Trumps makeup.';

          expect(Blockchain.isValid(blockchain.chain)).toBe(false);
        })
      });

      describe('and the chain does not contain any invalid blocks', () => {
        it('returns true', () => {
          expect(Blockchain.isValid(blockchain.chain)).toBe(true);
        })
      });
    });
  });
});
