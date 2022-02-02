import sha1 from "crypto-js/sha1.js";

class Block {
  constructor(amount) {
    (this.amount = amount), (this.hash = ""), (this.prevHash = "");
  }
  generateHash() {
    this.hash = sha1(this.amount + this.hash + this.prevHash).toString();
    return this.hash;
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    const genesisBlock = new Block(0);
    genesisBlock.generateHash();
    return genesisBlock;
  }

  addBlock(newBlock) {
    newBlock.prevHash = this.getLatestBlock().hash;
    newBlock.generateHash();
    this.chain.push(newBlock);
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  hasValidTransactions() {
    for (let i = 1; i < this.chain.length; i++) {
      const block = this.chain[i];
      const prevBlock = this.chain[i - 1];

      if (block.hash !== block.generateHash()) {
        return false;
      }
      if (block.prevHash !== prevBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

const coin = new BlockChain();
coin.addBlock(new Block(10));
coin.addBlock(new Block(20));

console.log(coin);
console.log("\n");
console.log(coin.hasValidTransactions());
