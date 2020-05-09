const sha256 = require('crypto-js/sha256');

class Block {
  constructor(index, timestamp, data, previousHash='0') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const { index, data, timestamp, previousHash } = this;
    return sha256(index + JSON.stringify(data) + timestamp + previousHash).toString();
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.addGenesisBlock()];
  }

  addGenesisBlock() {
    return new Block(0, "Oct 19, 2019", "Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  validateBlock(newBlock) {
    // if (typeof newBlock.index !== "number") return false;
    // if (typeof newBlock.data !== "object") return false;
    // if (typeof newBlock.timestamp !== "string") return false;
    // if (typeof newBlock.previousHash !== "string") return false;

    return true;
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();

    if (this.validateBlock(newBlock)) {
      return this.chain.push(newBlock);
    } else {
      return false;
    }
  }

  isChainValid() {
    console.log('Number of block in the chain is: ', this.chain.length);
    for (let i = 1; i < this.chain.length; i++) {
      const curr = this.chain[i];
      const prev = this.chain[i-1];

      if (curr.hash !== curr.calculateHash()) {
        return false;
      }
      console.log('Comparing:::', curr.previousHash, prev.hash);
      if (curr.previousHash !== prev.hash) {
        return false;
      }

      return true;
    }
  }
}

const Arkadoin = new BlockChain();

Arkadoin.addBlock(new Block(1, "Oct 19, 2019", { money: { over: 9000 } }));
Arkadoin.addBlock(new Block(2, "Oct 20, 2019", { money: 'LOADS' }));

Arkadoin.chain[1].data.money = 1500500;
Arkadoin.chain[1].hash = Arkadoin.chain[1].calculateHash();

// console.log(JSON.stringify(Arkadoin, '.', 4));
console.log(Arkadoin.isChainValid())
