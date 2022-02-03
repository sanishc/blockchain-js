import SHA256 from "crypto-js/sha256.js";

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}
class Block {
  constructor(timestamp, transaction, previousHash) {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transaction = transaction;
    this.hash = this.generateHash();
    this.nounce = 0;
  }

  generateHash() {
    return SHA256(
      this.prevHash +
        this.timestamp +
        JSON.stringify(this.transaction) +
        this.nounce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nounce += 1;
      this.hash = this.generateHash();
    }
  }
}

class BlockChain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5;
    this.pending = [];
    this.reward = 50;
  }

  createGenesisBlock() {
    return new Block("12-01-2022", { from: null, to: null, amount: 0 }, "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(rewardAddress) {
    const transaction = this.pending.shift();
    if (transaction) {
      const newBlock = new Block(
        Date.now(),
        transaction,
        this.getLatestBlock().hash
      );
      newBlock.mineBlock(this.difficulty);
      this.chain.push(newBlock);
      this.createTransaction(new Transaction(null, rewardAddress, this.reward));
    }
  }

  createTransaction(transaction) {
    this.pending.push(transaction);
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

  checkBalance(address) {
    let balance = 0;
    this.chain.forEach((block) => {
      if (block.transaction.fromAddress === address)
        balance -= block.transaction.amount;
      if (block.transaction.toAddress === address)
        balance += block.transaction.amount;
    });
    return balance;
  }
}

const coin = new BlockChain();

console.log("Transaction ABC -> xyz");
coin.createTransaction(new Transaction("ABC", "xyz", 100));

console.log("Transaction xyz -> ABC");
coin.createTransaction(new Transaction("xyz", "ABC", 20));

console.log("current chain");
console.log(coin);

console.log("current balance of ABC", coin.checkBalance("ABC"));
console.log("current balance of xyz", coin.checkBalance("xyz"));
console.log("current balance of miner", coin.checkBalance("miner"));

runTest(3);

function runTest(count) {
  for (let i = 0; i < count; i++) {
    console.log(`\n${i}. miner mining...`);
    coin.minePendingTransactions("miner");
    console.log("miner mined successfuly!\n");

    console.log("current chain");
    console.log(coin);

    console.log("current balance of ABC", coin.checkBalance("ABC"));
    console.log("current balance of xyz", coin.checkBalance("xyz"));
    console.log("current balance of miner", coin.checkBalance("miner"));
  }
}
