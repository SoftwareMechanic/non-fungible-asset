"use client"

import React, {useEffect, useState} from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMetaplex } from "../../../../components/MetaplexProvider/useMetaplex";
import Navbar from '@/app/components/Navbar/Navbar';
import { useRouter } from 'next/navigation';
import { useProjectItems } from '@/context/ProjectItemsContext';
import IfcModelViewer from '@/app/components/IfcModelViewer/IfcModelViewer';

const ItemPage = ({ params }) => {
  const router = useRouter()
  const wallet = useWallet();
  const { metaplex } = useMetaplex();
  const {projectItems} = useProjectItems()

  const [currentNft, setCurrentNft] = useState(undefined)

  const [viewerUrl, setViewerUrl] = useState(undefined)

  
  const getCurrentNft = async () => {
    const nft = projectItems.filter(item => item.id === params.nftAddress)[0]
    setCurrentNft(nft)
  }

  async function fetchFileAndOpenViewer(nft) {
    const file = await fetch(nft.file.uri);
    const blob = await file.blob();
    
    

    if (nft.type === "Model"){
      var link = window.URL.createObjectURL(blob);
      setViewerUrl(link);

      
    }
    else if (nft.type === "Document"){
      const buffer = await blob.arrayBuffer();
      const blob2 = new Blob([buffer], { type: nft.file.type });
      var link = window.URL.createObjectURL(blob2);
      setViewerUrl(link);
    }
  }

  useEffect(() => {
    if (wallet.connected && currentNft === undefined){
        getCurrentNft()
    }

  },[metaplex, wallet])

  useEffect(() => {
    if (currentNft !== undefined){
        console.log(currentNft)

        fetchFileAndOpenViewer(currentNft);
    }
  }, [currentNft])

  
  // dynamic string ticks javascript
  // const dynamicString = `This is a dynamic page with id: ${params.slug}`

  
  return (
    <main>
      <Navbar />
      {currentNft !== undefined && currentNft.type === 'Document' &&
        <iframe src={viewerUrl} style={{minWidth: "100%", minHeight: "100vh"}}/>
      }
      {
        viewerUrl !== undefined && currentNft.type === 'Model' &&
        
        <IfcModelViewer  fileURL={viewerUrl} />
      }
      
    </main>
  );
};

export default ItemPage;


