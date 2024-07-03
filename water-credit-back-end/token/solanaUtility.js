import { Connection, Keypair } from '@solana/web3.js';

// NOTE: Inserting your secretKey
let secretKey = "";

export async function requestAidrop() {
    let account = getAccount();
    let connection = getConnection();
    let tx = await connection.requestAirdrop(account.publicKey, 1e9);
    console.log("Airdrop tx: " + tx);
}

export function getConnection() {
    return new Connection("https://api.devnet.solana.com", "confirmed");
}

export function getAccount() {
    const myAccount = Keypair.fromSecretKey(new Uint8Array(secretKey));
    return myAccount;
}

export function getPrivateKey() {
    return secretKey;
}