import { getAccount, requestAidrop } from './solanaUtility.js';
import { Connection } from '@solana/web3.js';
import { createToken, mintToken } from './tokenUtility.js';

// NOTE: Before running this script change into package.json the key 'type' from "commonjs" to "module" value.

console.log("Starting creating token process...");
const account = getAccount();
console.log("Public key: "+ account.publicKey);
let connection = new Connection("https://api.devnet.solana.com", "confirmed");
console.log("Connection: " + connection.rpcEndpoint);
console.log("Request airdrop operation...");
await requestAidrop(connection);
console.log("Finished request airdrop operation");
console.log("Creating token...");
let tokenMintAddress = await createToken();
console.log("Finished creating token operation...");
console.log("Minting token...");
// NOTE: Fill the public key of address that it receives tokens
let addressToReceive = new PublicKey("");
await mintToken(addressToReceive, tokenMintAddress, 1e6);
console.log("Finished to minting token...");
