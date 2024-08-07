// // TODO: architecture is a mixture of shit


import WalletConnector from './walletConnector';

import { Connection, Keypair, PublicKey, clusterApiUrl } from"@solana/web3.js";
import { Metaplex, isMetaplexFile, walletAdapterIdentity} from "@metaplex-foundation/js"
import {createGenericFileFromBrowserFile} from "@metaplex-foundation/umi"

import { useWallet } from '@solana/wallet-adapter-react';
import { useMetaplex } from '../components/MetaplexProvider/useMetaplex';


import * as HashmapSolanaProgram from "../blockchain_utils/hashmap_solana_program"

const { toBigNumber, toDateTime, sol } = require("@metaplex-foundation/js");
const crypto = require('crypto');

const COLLECTION_NFT_MINT = "E3ZVv4vCG1Z3ATMquaJrWrXgQzwg5yyXZ5Rp7C2ucejT"

const COLLECTION_METADATA = "https://v2.akord.com/public/vaults/active/OMeLr5KxXzXhJWtc18uWmuzYo6fjwS1R9aERVbmxNfU/gallery#5366346a-8827-4a11-841b-49725a275c6e"//'https://mfp2m2qzszjbowdjl2vofmto5aq6rtlfilkcqdtx2nskls2gnnsa.arweave.net/YV-mahmWUhdYaV6q4rJu6CHozWVC1CgOd9NkpctGa2Q';


// // metadata nft sample
// const NEW_METADATA = {
//     image: "https://arweave.net/z05OyMaDDpLFjkpfLzTHw7AkciLHGwuJD5hJbS68ESU",
//     imgType: 'image/png',
//     imgName: 'QuickPix New MetaName',
//     description: 'New description!',
//     attributes: [
//         { trait_type: 'Speed', value: 'Quicker' },
//         { trait_type: 'Type', value: 'Pixelated' },
//         { trait_type: 'Background', value: 'QuickNode Blue 2' },
//         { trait_type: 'Jesus', value: 'Christ' }
//     ]
// };


export default class NonFungibleAssetMinter {

    // static AssetType = {
    //     Project: "Project",
    //     Document: "Document",
    //     Model: "Model"
    //   };


    static async mintNft(metaplex, wallet, candyMachineId) {
        console.log(`Step 1 - Minting NFT`);
        const candyMachine = await metaplex
            .candyMachines()
            .findByAddress({ address: new PublicKey(candyMachineId) });
    
        
        console.log(candyMachine)
    
        let { nft, response } = await metaplex.candyMachines()
            .mint({
                candyMachine,
                //collectionUpdateAuthority: candyMachine.authorityAddress,
                //collectionUpdateAuthority: candyMachine.collectionMintAddress,
                collectionUpdateAuthority: new PublicKey( wallet.publicKey),
                
                
                
            }, 
            { 
                commitment: 'finalized'
        })
        
    
        console.log(`✅ - Minted NFT: ${nft.address.toString()}`);
        console.log(` Mint address is: ${nft.mint.address.toString()}`);
        console.log(`     https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`);
    
    
        return nft;
    }
    
    static async  uploadMetadata(metaplex, metadata) {
        console.log(`Step 2 - Uploading MetaData`);

        
        const { uri } = await metaplex
            .nfts()
            .uploadMetadata(metadata);
        return uri;
    }
    
    static async  updateNft(metaplex, nft, metadataUri, newName) {
        console.log(`Step 3 - Updating NFT`);
        await metaplex
            .nfts()
            .update({
                name: newName,
                nftOrSft: nft,
                uri: metadataUri,
                
                
            }, { commitment: 'finalized' });
        console.log(`   Success!🎉`);
        console.log(`   Updated NFT: https://explorer.solana.com/address/${nft.address}?cluster=devnet`);
    }
    


    static async uploadFile(file, metaplex){
        // Upload the asset.
        //const genericFile = await createGenericFileFromBrowserFile(file);
        const uri = await metaplex.storage().upload(file)

        
        return uri
    }

    static async NonFungibleAssetMintProject(candyMachineId, metaplex, wallet, name, description){

        //const candyMachineId = "5NEZFGGhJrQwvGmkBqFToLU5XmkfRQTs1aJJHu7dzHFH"
        
        

        // Note: we could maybe not use attributes, but they are useful as a standard to show data on wallet/platforms
        const NEW_METADATA = {
            image: "https://arweave.net/z05OyMaDDpLFjkpfLzTHw7AkciLHGwuJD5hJbS68ESU", 
            imgType: 'image/png',
            imgName: 'Project Image Placeholder',
            description: description,
            attributes: [
                { trait_type: 'Name', value: name },
                { trait_type: 'Type', value: "Project" },
                { trait_type: 'Description', value: description },
                { trait_type: 'Users', value: ""}
            ],
        };
        
        
        var nft = await NonFungibleAssetMinter.mintNft(metaplex, wallet, candyMachineId)
        var metadataUri = await NonFungibleAssetMinter.uploadMetadata(metaplex, NEW_METADATA)
        await NonFungibleAssetMinter.updateNft(metaplex, nft, metadataUri, name)
    }

    static async NonFungibleAssetMintProjectSubNft(candyMachineId, metaplex, wallet, { projectId, type, name, description, file}){

        const params = {projectId, type, name, description, file};
        for (const [key, value] of Object.entries(params)) {
            if (value === undefined || value === null || value === "") {
                throw new Error(`Parameter ${key} must be provided`);
            }
        }

        if (type !== "Document" && type !== "Model") {
            throw new Error(`sub NFT Parameter 'type' must be either "Document" or "Model"`);
        }

        // check every parameter


        const uploadedFileUri =  await NonFungibleAssetMinter.uploadFile(file, metaplex)

        // Note: we could maybe not use attributes, but they are useful as a standard to show data on wallet/platforms
        const NEW_METADATA = {
            name : "new-metadata",
            description: description,
            image: "https://arweave.net/0CWBDQz42UhQin2V76beTzXHVgPsPzqMR6xZwX7_7Kg", 
            
            //imgName: 'Model Image Placeholder',
            
            attributes: [
                { trait_type: 'Name', value: name },
                { trait_type: 'Type', value: type },
                { trait_type: 'ProjectID', value: projectId },
                { trait_type: 'Description', value: description },
                //{ trait_type: 'File', value: file} // TEST Setting the content of the file as attribute, should be a link to the file
            ],
            properties: {
                files: [
                    {
                        type: 'image/png',
                        uri: "https://arweave.net/0CWBDQz42UhQin2V76beTzXHVgPsPzqMR6xZwX7_7Kg",
                    },
                    {
                        type: 'application/pdf',
                        uri: uploadedFileUri
                    }
                ]
            }
        };  
        

        var nft = await NonFungibleAssetMinter.mintNft(metaplex, wallet, candyMachineId)
        var metadataUri = await NonFungibleAssetMinter.uploadMetadata(metaplex, NEW_METADATA)
        await NonFungibleAssetMinter.updateNft(metaplex, nft, metadataUri, name)
    }
    
    static async getCandyMachinesFromAddresses(metaplex, listOfAddress) {

        var candyMachines = []
    
        for (const address of listOfAddress){
            const candyMachine = await metaplex
                .candyMachines()
                .findByAddress({ address: new PublicKey(address) });
            
            if (candyMachine != null && candyMachine != undefined){
                candyMachines.push(candyMachine)
            }
        }
    
        return candyMachines
    }


    static async generateCollectionNFT(metaplex,wallet){
        const { nft: collectionNft } = await metaplex.nfts().create({
            name: "Non-Fungible-Assets",
            uri: COLLECTION_METADATA,
            sellerFeeBasisPoints: 0,
            isCollection: true,
            updateAuthority: wallet,
        })



        console.log(`✅ - Created Collection NFT: ${collectionNft.address.toString()}`);
        return collectionNft;
    }


    
    static async  generateCandyMachine(metaplex, wallet, collection_nft_address) {
        const buffer = crypto.createHash('sha256').update("").digest();
        const hash = new Uint8Array(buffer.length);
        for (let i = 0; i < buffer.length; ++i) {
            hash[i] = buffer[i];
        }



        const candyMachineSettings = {
            
            itemsAvailable: 1000,//toBigNumber(18446744073709551614), // Collection Size: 3
            sellerFeeBasisPoints: 1000, // 10% Royalties on Collection
            symbol: "NFA",
            maxEditionSupply: toBigNumber(0), // 0 reproductions of each NFT allowed
            isMutable: true,
            creators: [
                { address: wallet.publicKey, share: 100 },
            ],
            collection: {
                address: new PublicKey(collection_nft_address), // Can replace with your own NFT or upload a new one
                updateAuthority: wallet,
            },
            itemSettings: {
                type: "hidden",
                name: "new project",
                uri: "https://api.jsonbin.io/v3/qs/66868fbdad19ca34f882bac4",
                hash: Array.from(new Uint8Array(crypto.createHash('sha256').update("").digest())) //empty hash
            }
        };

        console.log("Creating candy machine...");
        const { candyMachine } = await metaplex.candyMachines().create(candyMachineSettings);

        
        console.log(`✅ - Created Candy Machine: ${candyMachine.address.toString()}`);
        console.log(`     https://explorer.solana.com/address/${candyMachine.address.toString()}?cluster=devnet`);

        await metaplex.candyMachines().update({
            candyMachine,
            guards: {
                solPayment: {
                    amount: sol(0.1),
                    destination: metaplex.identity().publicKey,
                },
            }}
        )

        console.log(`✅ - Updated Candy Machine`);

        return candyMachine;
    }
    

    
    

}





