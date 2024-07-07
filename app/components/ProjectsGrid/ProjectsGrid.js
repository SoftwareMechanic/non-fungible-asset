"use client";
"use strict"

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
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true)
    }, [])

    const {metaplex} = useMetaplex()
    const wallet = useWallet()

    const handleOpenProject = (id) => {
        routerProject.push(`pages/projects/${id}`)
    }

    const handleCreateProjectClick = () => {
        routerProject.push('/pages/createProject');
    };

    const getAllProjectsNFTs = async ()  => {

        clearProjects();
        const nfts = await metaplex.nfts().findAllByOwner({owner: wallet.publicKey});


        
        // TODO: filter nfts not of the platform
        nfts.forEach(async element => {
            console.log(element)
            //get json from uri

            try{
                const metadata = await fetch(element.uri)
                const metadataJson = await metadata.json()

                //console.log(metadataJson)

                var TypeAttr = metadataJson.attributes.filter(attr => attr["trait_type"] === "Type")

                if (TypeAttr.length > 0 && TypeAttr[0].value === "Project") {

                    const projectId = element.address
 
                    const projectName = metadataJson.attributes.filter(attr => attr["trait_type"] === "Name")[0].value
    
                    const projectDescription = metadataJson.attributes.filter(attr => attr["trait_type"] === "Description")[0].value

                    const project = {
                        id: projectId,
                        name: projectName,
                        description: projectDescription
                    }

                    //usersProjects.push(project)
                    addProject(project)
                    //console.log(metadataJson)
                }
            }
            catch(err){
                
            }
        });
        //setProjects(usersProjects)
    }


    useEffect(() => {
        if (metaplex != undefined && wallet != undefined && wallet.connected && mounted){
            getAllProjectsNFTs();
        }
    },[metaplex, wallet, mounted])

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
