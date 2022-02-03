import SHA256 from "crypto-js/sha256.js";
class Block {
  constructor(timestamp, amount, previousHash) {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.amount = amount;
    this.hash = this.generateHash();
    this.nounce = 0;
  }

  generateHash() {
    return SHA256(
      this.prevHash + this.timestamp + this.amount + this.nounce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nounce += 1;
      this.hash = this.generateHash();
    }
    console.log("Block Mined", this.hash);
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5;
  }

  createGenesisBlock() {
    return new Block("12-01-2022", 0, "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.prevHash = this.getLatestBlock().hash;
    newBlock.mineBlock(this.difficulty);
    this.chain.push(newBlock);
  }

  validate() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];
      if (currentBlock.hash !== currentBlock.generateHash()) return false;
      if (currentBlock.prevHash !== previousBlock.hash) return false;
    }
    return true;
  }
}

const coin = new BlockChain();

console.log("create block 1");
coin.addBlock(new Block(10));

console.log("create block 2");
coin.addBlock(new Block(20));

console.log(coin.chain);
