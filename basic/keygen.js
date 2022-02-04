import Elliptic from "elliptic";

const ec = new Elliptic.ec("secp256k1");
const key = ec.genKeyPair();
const publicKey = key.getPublic("hex");
const privateKey = key.getPrivate("hex");

console.log(key);
console.log();
console.log(privateKey);
console.log();
console.log(publicKey);
