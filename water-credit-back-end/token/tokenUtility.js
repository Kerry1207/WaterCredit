import { createMint, getOrCreateAssociatedTokenAccount, mintTo } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { getConnection, getAccount } from './solanaUtility.js';

export async function createToken() {
    let connection = getConnection();
    let account = getAccount();
    let mint = createMint(connection, account, account.publicKey, null, 6);
    let tokenMintAddress = (await mint).toBase58();
    console.log("Token mint address: " + tokenMintAddress); 
    return tokenMintAddress;
} 

export async function mintToken(addressToReceive, mintTokenAddress, amount) {
    let connection = getConnection();
    let pubKeyUser = new PublicKey(addressToReceive);
    let mta = new PublicKey(mintTokenAddress);
    let account = getAccount();
    let ata = await getOrCreateAssociatedTokenAccount(connection, account, mta, pubKeyUser);
    let tx = await mintTo(connection, account, mta, ata.address, account.publicKey, amount);
    console.log("Transaction mint token to " + pubKeyUser.toBase58() + ": " + tx);
}
