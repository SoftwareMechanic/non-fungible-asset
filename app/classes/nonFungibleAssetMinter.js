// // TODO: architecture is a mixture of shit


import WalletConnector from './walletConnector';

import { Connection, Keypair, PublicKey, clusterApiUrl } from"@solana/web3.js";
import { Metaplex, walletAdapterIdentity} from "@metaplex-foundation/js"



export default class NonFungibleAssetMinter {
     async mintToken() {

        const connection = new Connection(clusterApiUrl('devnet'));
        // // Assuming getProvider() returns a connected wallet provider
        const provider = WalletConnector.getProvider();
        // // Initialize Metaplex instance with your Solana connection and wallet provider
        const metaplex = Metaplex.make(connection)

     
        // // Ensure the wallet is connected
        await WalletConnector.establishConnection();

        
        // // Create a new connection to the Solana blockchain

        //   .use(walletAdapterIdentity(provider));
    }

}
//     static async mintToken() {
//         // Ensure the wallet is connected
//         WalletConnector.connect();
      
//         // Create a new connection to the Solana blockchain
//         const connection = new Connection(clusterApiUrl('devnet'));
      
//         // Assuming getProvider() returns a connected wallet provider
//         const provider = WalletConnector.getProvider();
      
//         // Initialize Metaplex instance with your Solana connection and wallet provider
//         const metaplex = Metaplex.make(connection)
//           .use(walletAdapterIdentity(provider));

//           console.log('Metaplex instance created:')
//           console.log(metaplex)
      
//         // Use Metaplex SDK to mint a new token
//         try {
      
      
//         //   const { nft } = await metaplex.nfts().create({
//         //     uri: 'https://example.com/my-nft-metadata.json', // Metadata URI
//         //     name: 'My NFT Name',
//         //     sellerFeeBasisPoints: 500, // 5% seller fee
//         //   }).run();
      
//         //   console.log('NFT minted:', nft);
//         } catch (error) {
//           console.error('Failed to mint NFT:', error);
//         }
//       }
      
//       // Call mintToken() when appropriate, e.g., in response to a user action
// }



