import { BlockChain, Transaction } from "./blockchain.js";

const coin = new BlockChain();

console.log("New Transaction ABC -> XYZ");
coin.createTransaction(new Transaction("ABC", "XYZ", 100));

console.log("New Transaction XYZ -> ABC");
coin.createTransaction(new Transaction("XYZ", "ABC", 20));

console.log("current chain");
console.log(coin);

console.log("current balance of ABC", coin.checkBalance("ABC"));
console.log("current balance of XYZ", coin.checkBalance("XYZ"));
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
    console.log("current balance of XYZ", coin.checkBalance("XYZ"));
    console.log("current balance of miner", coin.checkBalance("miner"));
  }
}
