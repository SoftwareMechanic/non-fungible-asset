// TODO: Improve architecture for apis to blockchain, now its a mixture of shit

// NOTE: The functions 'createCollectionNft', 'generateCandyMachine', 'updateCandyMachine'
// are reported for utility, but should not be used in runtime (for now)
// while 'mintNft', 'updateMintedNft' must be used to mint and update NFTs
// both for the platform projects and the 'sub nft' assets (models, images, documents, etc.)



const { Connection, Keypair, PublicKey } = require("@solana/web3.js");
const { Metaplex, keypairIdentity, irysStorage, toMetaplexFile, toBigNumber, toDateTime, sol, findNftsByOwnerOperation } = require("@metaplex-foundation/js");
const secret = require('./guideSecret.json');
const BigNumber = require("bignumber.js");
const crypto = require('crypto');

const QUICKNODE_RPC = 'https://api.devnet.solana.com'; // Replace with your QuickNode Solana Devnet HTTP Endpoint
const SOLANA_CONNECTION = new Connection(QUICKNODE_RPC, { commitment: 'finalized' });

const WALLET = Keypair.fromSecretKey(new Uint8Array(secret));
const NFT_METADATA = "https://v2.akord.com/public/vaults/active/OMeLr5KxXzXhJWtc18uWmuzYo6fjwS1R9aERVbmxNfU/gallery#5366346a-8827-4a11-841b-49725a275c6e"//'https://mfp2m2qzszjbowdjl2vofmto5aq6rtlfilkcqdtx2nskls2gnnsa.arweave.net/YV-mahmWUhdYaV6q4rJu6CHozWVC1CgOd9NkpctGa2Q';
const COLLECTION_NFT_MINT = "E3ZVv4vCG1Z3ATMquaJrWrXgQzwg5yyXZ5Rp7C2ucejT"//'7E1DraqXvDJoAvGsLEqswMMweH5kDbDFVaAwViJmmcA7';
const CANDY_MACHINE_ID = "5NEZFGGhJrQwvGmkBqFToLU5XmkfRQTs1aJJHu7dzHFH"//'HtsaizmAPweRMJ3osEQhgbkimHHNUZdQSMUXrU4LBkiW';

async function createCollectionNft() {
    const { nft: collectionNft } = await METAPLEX.nfts().create({
        name: "Non-Fungible-Assets",
        uri: NFT_METADATA,
        sellerFeeBasisPoints: 0,
        isCollection: true,
        updateAuthority: WALLET,
    });

    console.log(`✅ - Minted Collection NFT: ${collectionNft.address.toString()}`);
    console.log(`     https://explorer.solana.com/address/${collectionNft.address.toString()}?cluster=devnet`);
}

async function generateCandyMachine() {
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
            { address: WALLET.publicKey, share: 100 },
        ],
        collection: {
            address: new PublicKey(COLLECTION_NFT_MINT), // Can replace with your own NFT or upload a new one
            updateAuthority: WALLET,
        },
        itemSettings: {
            type: "hidden",
            name: "new project",
            uri: "https://api.jsonbin.io/v3/qs/66868fbdad19ca34f882bac4",
            hash: Array.from(new Uint8Array(crypto.createHash('sha256').update("").digest())) //empty hash
        }
    };
    const { candyMachine } = await METAPLEX.candyMachines().create(candyMachineSettings);
    console.log(`✅ - Created Candy Machine: ${candyMachine.address.toString()}`);
    console.log(`     https://explorer.solana.com/address/${candyMachine.address.toString()}?cluster=devnet`);
}

async function updateCandyMachine() {
    const candyMachine = await METAPLEX
        .candyMachines()
        .findByAddress({ address: new PublicKey(CANDY_MACHINE_ID) });

    const { response } = await METAPLEX.candyMachines().update({
        candyMachine,
        guards: {
            solPayment: {
                amount: sol(0.1),
                destination: METAPLEX.identity().publicKey,
            },
        }
    });
    
    console.log(`✅ - Updated Candy Machine: ${CANDY_MACHINE_ID}`);
    console.log(`     https://explorer.solana.com/tx/${response.signature}?cluster=devnet`);
}

async function mintNft() {
    const candyMachine = await METAPLEX
        .candyMachines()
        .findByAddress({ address: new PublicKey(CANDY_MACHINE_ID) });
    let { nft, response } = await METAPLEX.candyMachines().mint({
        candyMachine,
        collectionUpdateAuthority: WALLET.publicKey,
    }, { commitment: 'finalized' });

    console.log(`✅ - Minted NFT: ${nft.address.toString()}`);
    console.log(` Mint address is: ${nft.mint.address.toString()}`);
    console.log(`     https://explorer.solana.com/address/${nft.address.toString()}?cluster=devnet`);
    console.log(`     https://explorer.solana.com/tx/${response.signature}?cluster=devnet`);
}

async function updateMintedNft(mintAddress, new_name, new_metadata) {
    const nft = await FetchNft(mintAddress);

    if (nft.json == null)
        return;

    const newUri = await uploadMetadata(new_metadata.image, new_metadata.imgType, new_metadata.imgName, new_metadata.description, new_metadata.attributes);

    updateNft(nft, newUri, new_name);
}

async function FetchNft(mintAddress) {
    console.log(`Step 1 - Fetching existing NFT`);

    
    
    const nft = await METAPLEX.nfts().findByMint({ mintAddress: new PublicKey(mintAddress) });
    console.log(nft.json);
    if (!nft) {
        throw new Error("Unable to find existing nft!");
    }

    return nft;
}

async function uploadMetadata(imgUri, imgType, nftName, description, attributes) {
    console.log(`Step 2 - Uploading MetaData`);
    const { uri } = await METAPLEX
        .nfts()
        .uploadMetadata({
            name: nftName,
            description: description,
            image: imgUri,
            attributes: attributes,
            properties: {
                files: [
                    {
                        type: imgType,
                        uri: imgUri,
                    },
                ]
            }
        });
    return uri;
}

async function updateNft(nft, metadataUri, newName) {
    console.log(`Step 3 - Updating NFT`);
    await METAPLEX
        .nfts()
        .update({
            name: newName,
            nftOrSft: nft,
            uri: metadataUri,
        }, { commitment: 'finalized' });
    console.log(`   Success!🎉`);
    console.log(`   Updated NFT: https://explorer.solana.com/address/${nft.address}?cluster=devnet`);
}

const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
    .use(keypairIdentity(WALLET))
    .use(irysStorage({
        address: 'https://devnet.irys.xyz',
        providerUrl: QUICKNODE_RPC,
        timeout: 60000,
    }));

const mint_address = "CSNLH9Fgnc8QX6gDdchGNbW8QErejQ3wwRRzPni4o6dE";
//const mint_address2 = "8sSs8NMo5uN9Rw7cSyKqmUxkrSB75xpgpNAKu64E1wf8";

const NEW_METADATA = {
    image: "https://arweave.net/z05OyMaDDpLFjkpfLzTHw7AkciLHGwuJD5hJbS68ESU",
    imgType: 'image/png',
    imgName: 'QuickPix New MetaName',
    description: 'New description!',
    attributes: [
        { trait_type: 'Speed', value: 'Quicker' },
        { trait_type: 'Type', value: 'Pixelated' },
        { trait_type: 'Background', value: 'QuickNode Blue 2' },
        { trait_type: 'Jesus', value: 'Christ' }
    ]
};

//updateMintedNft(mint_address2);

//generateCandyMachine()

//createCollectionNft()

//generateCandyMachine()

//updateCandyMachine()

//mintNft()

updateMintedNft(mint_address, "new-project", NEW_METADATA)