"use client"

import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMetaplex } from "../../../components/MetaplexProvider/useMetaplex";
import Navbar from '@/app/components/Navbar/Navbar';

const ProjectPage = ({ params }) => {

  const { metaplex } = useMetaplex();
  const wallet = useWallet();

  const getAllNftsOfOwner = async () => {

    const myAssets = await metaplex.nfts().findAllByOwner({ owner: metaplex.identity().publicKey });

    console.log(myAssets.length)
    console.log(myAssets);
  }

  
  return (
    <main>
      <Navbar />
      <h1>This is a dynamic page with id: {params.slug}</h1>
      <h2>
        create project items grid,
        button which to route to a page so we can mint sub nfts
        
      </h2>
      <button onClick={() => getAllNftsOfOwner()}>Test check NFTs</button>
      <button >Go Home</button>
    </main>
  );
};

export default ProjectPage;