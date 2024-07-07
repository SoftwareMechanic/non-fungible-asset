import { Connection, PublicKey, clusterApiUrl, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { Program, Provider, web3, BN , AnchorProvider} from '@project-serum/anchor';

import idl from './idl.json'; // Your compiled IDL file
import { useConnection } from '@solana/wallet-adapter-react';

// Setup provider
//const provider = window.phantom.solana;



// Function to insert an entry
export async function insertEntry(wallet, connection, key, value) {
    const kvStorePublicKey = new PublicKey("6yVhHyzpxL3C27YKRU4aUCQB6cSZiQNqbGPrLTWhPK14");

    const provider = new AnchorProvider(connection, wallet, {
      commitment: "processed",
    });
  
  
      // Program ID and Account
      const programId = new PublicKey("A8bZXDMH2YeCeFeedyiiV7SEScZtzaZXPf2LEBMnKra5");
      const program = new Program(idl, programId, provider);
  await program.methods.insertEntry(new PublicKey(key), new PublicKey(value)).accounts({kvStore: kvStorePublicKey}).rpc()
}




// Function to get all candy machines from a wallet
export async function getCandyMachinesPublickKeysForWallet(wallet, connection) {
    
  const kvStorePublicKey = new PublicKey("6yVhHyzpxL3C27YKRU4aUCQB6cSZiQNqbGPrLTWhPK14");

  const provider = new AnchorProvider(connection, wallet, {
    commitment: "processed",
  });


    // Program ID and Account
    const programId = new PublicKey("A8bZXDMH2YeCeFeedyiiV7SEScZtzaZXPf2LEBMnKra5");
    const program = new Program(idl, programId, provider);
  try {
    console.log(program.methods)

  
    // Correctly call the method and send the transaction
    //const tx = await program.methods.getEntry(wallet.PublicKey).accounts({kvStore: kvStorePublicKey}).rpc()

    var candyMachinesAddresses = []

    const kvStoreAccount = await program.account.kvStore.fetch(kvStorePublicKey);
    const walletsRegistered = kvStoreAccount.keys;
    const candyMachinesRegistered = kvStoreAccount.values;




    let counter = 0;
    for (const account of kvStoreAccount.keys){
        console.log( " ")
        console.log(account.toString())
        console.log(wallet.publicKey.toString())
        console.log( " ")
        if (account.toString() === wallet.publicKey.toString()){
            candyMachinesAddresses.push(candyMachinesRegistered[counter])
        }
        counter++
    }
   
    return candyMachinesAddresses

  } catch (error) {
    console.error("Entry not found or error fetching the entry:", error);
  }
}

export async function AddWalletCandyMachine(wallet, candyMachines){
    const kvStorePublicKey = new PublicKey("6yVhHyzpxL3C27YKRU4aUCQB6cSZiQNqbGPrLTWhPK14");

    const provider = new AnchorProvider(connection, wallet, {
        commitment: "processed",
    });


    // Program ID and Account
    const programId = new PublicKey("A8bZXDMH2YeCeFeedyiiV7SEScZtzaZXPf2LEBMnKra5");
    const program = new Program(idl, programId, provider);
}