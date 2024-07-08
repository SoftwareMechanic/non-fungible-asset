"use client"
import React, { useCallback } from 'react';
import styles from "../../page.module.css"
import Navbar from '../../components/Navbar/Navbar';
import CreateProjectForm from '../../components/CreateProjectForm/CreateProjectForm';
import NonFungibleAssetMinter from '@/app/classes/nonFungibleAssetMinter';
import { useMetaplex } from "../../components/MetaplexProvider/useMetaplex";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { getCandyMachinesPublickKeysForWallet, insertEntry } from '@/app/blockchain_utils/hashmap_solana_program';

const CreateProject = () => {
    const {metaplex} = useMetaplex()
    const wallet = useWallet()

    

    const connnection = useConnection();


    // TODO improve architecture and logic ?
    const mintProjectNft = async (newProject) => {
        var candyMachinesAddresses =  await getCandyMachinesPublickKeysForWallet(wallet, connnection.connection)

        console.log(candyMachinesAddresses)

        var candyMachines = await NonFungibleAssetMinter.getCandyMachinesFromAddresses(metaplex, candyMachinesAddresses)

        console.log(candyMachines)
        if (candyMachines.length == 0){
            // first time the wallet (user) create a project
            // create his own candy machine 

        

            const collectionNft = await NonFungibleAssetMinter.generateCollectionNFT(metaplex, wallet)
            const candyMachine = await NonFungibleAssetMinter.generateCandyMachine(metaplex, wallet, collectionNft.address.toString())

            await insertEntry(wallet, connnection.connection, wallet.publicKey.toString(), candyMachine.address.toString())

            NonFungibleAssetMinter.NonFungibleAssetMintProject(candyMachine.address, metaplex,wallet, newProject.name, newProject.description)
        }
        else{
            //just take the first
            const candyMachine = candyMachines[0]
            NonFungibleAssetMinter.NonFungibleAssetMintProject(candyMachine.address, metaplex,wallet, newProject.name, newProject.description);
        }
    }

    
    
    return (
        <div>
            <Navbar />
            <main className={styles.main}>
                <CreateProjectForm onCreate={(newProject) => mintProjectNft( newProject)} />
            </main>
        </div>
    );
};

export default CreateProject;