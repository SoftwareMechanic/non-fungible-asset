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

  console.log(projects)
  console.log(params.slug)

  const project = projects.find((p) => p.id ==params.slug);

  const getAllProjectSubNftsOfOwner = async () => {


    const nfts = await metaplex.nfts().findAllByOwner({ owner: wallet.publicKey });

    for (let i = 0; i < nfts.length; i++){
      try{
        const metadata = await fetch(nfts[i].uri)
          const metadataJson = await metadata.json()

          var TypeAttr = metadataJson.attributes.filter(attr => attr["trait_type"] === "Type")

          var ProjectIDAttr = metadataJson.attributes.filter(attr => attr["trait_type"] === "ProjectID")

          // sub NFTs must have a type attribute and a projectId attribute
          if (!(TypeAttr.length > 0 && ProjectIDAttr.length > 0)) continue;

          const projectId = project.id

          const nftProjectId = ProjectIDAttr[0].value.toString();

          if (nftProjectId !== projectId.toString()) continue;

          console.log("NFT FOUND")

          //if (TypeAttr.length > 0 && ProjectIDAttr === params.slug && (TypeAttr[0].value === "Model" || TypeAttr[0].value === "Document")) {
              const nftId = nfts[i].address.toString()

              const nftNameAttr = metadataJson.attributes.filter(attr => attr["trait_type"] === "Name")
              const nftDescAttr = metadataJson.attributes.filter(attr => attr["trait_type"] === "Description")
              const nftTypeAttr = metadataJson.attributes.filter(attr => attr["trait_type"] === "Type")
              const nftFileAttr = metadataJson.attributes.filter(attr => attr["trait_type"] === "File")
              
              const nftName = nftNameAttr[0].value
              const nftDesc = nftDescAttr[0].value
              const nftType = nftTypeAttr[0].value
              const nftFile = nftFileAttr[0].value

              console.log(nftName)
              console.log(nftDesc)
              console.log(nftType)
              console.log(nftFile)

              const item = {
                  id: nftId,
                  name: nftName,
                  description: nftDesc,
                  type: nftType,
                  file: nftFile
              }

              console.log(item)

              //if (projectItems.filter(p => p.id === itemId).length === 0){
                addProjectItem(item)
              //}
          //}
      }
      catch{

      }
    }

  };
  

  const addProjectItem = (newProjectItem) => {
    setProjectItems((prevProjectItems) => {
      const updatedProjectItems = [...prevProjectItems, newProjectItem];

      console.log("Updated proj items")
      console.log(updatedProjectItems)
      return updatedProjectItems;
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
      <h1>{params.slug}</h1>
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