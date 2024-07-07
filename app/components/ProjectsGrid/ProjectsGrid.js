"use client";

import React from 'react';
import styles from './ProjectsGrid.module.css';
import CustomButton from '../CustomButton/CustomButton';
import { useRouter } from 'next/navigation';
import { useProjects } from '../../../context/ProjectsContext';

const ProjectsGrid = () => {

    const routerProject = useRouter();

    const { projects } = useProjects();

    const handleOpenProject = (id) => {
        routerProject.push(`pages/projects/${id}`)
    }

    console.log("ProjectsGrid");
    console.log(projects);

    const handleCreateProjectClick = () => {
        routerProject.push('pages/createProject');
      };

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
