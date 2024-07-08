"use client"


import React from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMetaplex } from "../../../../components/MetaplexProvider/useMetaplex";
import Navbar from '@/app/components/Navbar/Navbar';
import NonFungibleAssetMinter from '@/app/classes/nonFungibleAssetMinter';

const ProjectMintSubNftPage = ({ params }) => {

  const { metaplex } = useMetaplex();
  const wallet = useWallet();

  const {connnection } = useConnection()

  const mintProjectSubNft = async (newProject) => {
    
    var candyMachinesAddresses =  await getCandyMachinesPublickKeysForWallet(wallet, connnection.connection)

    var candyMachines = await NonFungibleAssetMinter.getCandyMachinesFromAddresses(metaplex, candyMachinesAddresses)

    // User should have alreadt created the candy machine
    const candyMachine = candyMachines[0]
    await NonFungibleAssetMinter.NonFungibleAssetMintProjectSubNft(
        candyMachine.address, 
        metaplex,
        wallet, 
        {
            projectId: "GET FROM CURRENT URL PROJECT ADDRESS",
            type: "GET INPUT FOR TYPE", // Model, Document, etc
            name: "GET INPUT FOR NAME",
            description: "GET INPUT FOR DESCRIPTION",
            file: "GET INPUT FOR FILE" // URL or TEXT?
        }
    );

  
}

  
  return (
    <main>
      <Navbar />
      <h1>This is MINT sub NFT page</h1>
      <button >MINT SUB NFT</button>
    </main>
  );
};

export default ProjectMintSubNftPage;