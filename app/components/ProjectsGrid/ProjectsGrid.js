"use client";

import React, { useEffect, useState } from 'react';
import styles from './ProjectsGrid.module.css';
import CustomButton from '../CustomButton/CustomButton';
import { useRouter } from 'next/navigation';
import { useProjects, ProjectsProvider } from '../../../context/ProjectsContext';
import { useMetaplex } from '../MetaplexProvider/useMetaplex';
import { useWallet } from '@solana/wallet-adapter-react';

const ProjectsGrid = () => {
    const routerProject = useRouter();
    const {projects, addProject, setProjects, clearProjects } = useProjects();
    const [fetched, setFetched] = useState(false);
   

    const {metaplex} = useMetaplex()
    const wallet = useWallet()

    const handleOpenProject = (id) => {
        routerProject.push(`pages/projects/${id}`)
    }

    const handleCreateProjectClick = () => {
        routerProject.push('/pages/createProject');
    };

    const getAllProjectsNFTs = async ()  => {
        clearProjects()

        const nfts = await metaplex.nfts().findAllByOwner({owner: wallet.publicKey});

        // TODO: filter nfts not of the platform
        nfts.forEach(async nft => {
            try{
                const metadata = await fetch(nft.uri)
                const metadataJson = await metadata.json()

                var TypeAttr = metadataJson.attributes.filter(attr => attr["trait_type"] === "Type")

                if (TypeAttr.length > 0 && TypeAttr[0].value === "Project") {

                    const projectId = nft.address
                    const projectName = metadataJson.attributes.filter(attr => attr["trait_type"] === "Name")[0].value
                    const projectDescription = metadataJson.attributes.filter(attr => attr["trait_type"] === "Description")[0].value

                    const project = {
                        id: projectId,
                        name: projectName,
                        description: projectDescription
                    }

                    if (projects.filter(p => p.id === projectId).length === 0){
                        addProject(project)
                    }
                }
            }
            catch(err){
                
            }
        });
    }


    useEffect(() => {
        setFetched(false) //avoid multiple calls
    },[])


    useEffect(() => {

        if (metaplex != undefined && wallet != undefined && wallet.connected  && !fetched){
            setFetched(true)
           // Correctly using an async IIFE
            getAllProjectsNFTs()
        }
    },[metaplex, wallet, fetched])

    return (
        
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Projects</h1>
            </div>
            <div className={styles.grid2}>
                {projects != null && projects.map((project) => (
                    <div key={project.id} className={styles.card}>
                        <h2>{project.name}</h2>
                        <p>{project.description}</p>
                        <CustomButton text="Open Project" onClick={() => handleOpenProject(project.id)} />
                    </div>
                ))}
            </div>
            <CustomButton text="Create New Project" onClick={handleCreateProjectClick} />
        </div>
    );
};

export default ProjectsGrid;
