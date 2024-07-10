"use client"

import React, {useEffect, useState} from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useMetaplex } from "../../../components/MetaplexProvider/useMetaplex";
import Navbar from '@/app/components/Navbar/Navbar';
import { useRouter } from 'next/navigation';
import ProjectDetails from '@/app/components/ProjectDetails/ProjectDetails';
import { useProjects } from '@/context/ProjectsContext';

const ProjectPage = ({ params }) => {
  const router = useRouter()
  const { metaplex } = useMetaplex();
  const wallet = useWallet();
  const { projects } = useProjects();

  const [projectItems, setProjectItems] = useState([]) // create a context for project items?

  const project = projects.find((p) => p.id ==params.slug);

  const getAllProjectSubNftsOfOwner = async () => {


    const nfts = await metaplex.nfts().findAllByOwner({ owner: wallet.publicKey });

    // TODO: filter nfts not of the platform
    nfts.forEach(async nft => {
      try{
          const metadata = await fetch(nft.uri)
          const metadataJson = await metadata.json()

          var TypeAttr = metadataJson.attributes.filter(attr => attr["trait_type"] === "Type")


          if (TypeAttr.length > 0 && (TypeAttr[0].value === "Model" || TypeAttr[0].value === "Document")) {
              const itemId = nft.address
              const nftName = metadataJson.attributes.filter(attr => attr["trait_type"] === "Name")[0].value
              const nftDescription = metadataJson.attributes.filter(attr => attr["trait_type"] === "Description")[0].value
              const nftType = metadataJson.attributes.filter(attr => attr["trait_type"] === "Type")[0].value
              const nftFile = metadataJson.attributes.filter(attr => attr["trait_type"] === "File")[0].value

              const item = {
                  id: item,
                  name: nftName,
                  description: nftDescription,
                  type: nftType,
                  file: nftFile
              }

              if (projectItems.filter(p => p.id === itemId).length === 0){
                addProjectItem(item)
              }
          }
      }
      catch(err){
          
      }
  });
  }

  const addProjectItem = (newProjectItem) => {
    setProjectItems((prevProjectItems) => {
      const updatedProjects = [...prevProjectItems, newProject, newProjectItem];
      return updatedProjects;
    })
  }

  useEffect(() => {
    if (wallet.connected){
      getAllProjectSubNftsOfOwner()
    }

  },[metaplex, wallet])

  const handleMintSubNFT = () => {
    router.push(`/pages/projects/${params.slug}/mint`)
  }

  // dynamic string ticks javascript
  // const dynamicString = `This is a dynamic page with id: ${params.slug}`

  
  return (
    <main>
      <Navbar />
      <ProjectDetails project={project} projectItems={projectItems} onClick={handleMintSubNFT} />
    </main>
  );
};

export default ProjectPage;

/*<h1>This is a dynamic page with id: {params.slug}</h1>
      <h2>
        create project items grid,
      </h2>
      <main>
        {projectItems != null && projectItems.map((projectItem) => (
          <div key={projectItem.id} className={styles.card}>
            <h2>{projectItem.name}</h2>
            <p>{projectItem.description}</p>
            <p>{projectItem.type}</p>
            <p>{projectItem.file}</p>
          </div>
        ))}
      </main>
      
      <button onClick={() => router.push(`/pages/projects/${params.slug}/mint`)}>Go To Mint SubNFT</button>*/