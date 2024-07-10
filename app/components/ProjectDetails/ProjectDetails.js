import React, { useState } from 'react';
import styles from './style.module.css';
import { useRouter } from 'next/navigation';
import CustomButton from '../CustomButton/CustomButton';

const ProjectDetails = ({ project,projectItems, onClick }) => {

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

const routerProject = useRouter();

const handleUploadFileClick = () => {
    routerProject.push('/pages/fileUpload');
};

const handleGenerateFileClick = () => {
    routerProject.push('/pages/generateData');
}

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
            <div className={styles.grid2}>
                {projectItems != null && projectItems.map((projectItem) => (
                    <div key={projectItem.id} className={styles.card}>
                        <h2>{projectItem.name}</h2>
                        <p>{projectItem.description}</p>
                        <p>{projectItem.type}</p>
                        <p>{projectItem.file}</p>
                    </div>
                ))}
            </div>
                <CustomButton text="Upload file" onClick={handleUploadFileClick} />
                <CustomButton text="Generate file" onClick={handleGenerateFileClick} />
        </div>             
    );

}

export default ProjectDetails;


