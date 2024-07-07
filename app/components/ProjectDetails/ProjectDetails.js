import React, { useState } from 'react';
import styles from './style.module.css';
import { useProjects } from '../../../context/ProjectsContext';
import { useRouter } from 'next/navigation';
import CustomButton from '../CustomButton/CustomButton';

const ProjectDetails = ({ project }) => {

    //Function to get all NFT's corresponding to the project

    /*Instad of projects use list with all NFT's

    <div className={styles.grid2}>
                {projects != null && projects.map((project) => (
                    <div key={project.id} className={styles.card}>
                        <h2>{project.name}</h2>
                        <p>{project.description}</p>
                        <CustomButton text="Open Project" onClick={() => handleOpenProject(project.id)} />
                    </div>
                ))}
            </div>
*/

    return (
        <div className={styles.container}>
            <div>
                <h1>{project.name}</h1>
                <p>{project.description}</p>
            </div>
            <div>
                <h2>NFTs</h2>
                <p>Display all NFTs corresponding to the project</p>
            </div>
                <CustomButton text="Upload file"  />
                <CustomButton text="Generate file"  />
        </div>             
    );

}

export default ProjectDetails;


