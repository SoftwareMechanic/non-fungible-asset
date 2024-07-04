import React from 'react';
import styles from './ProjectsGrid.module.css';
import CustomButton from '../CustomButton/CustomButton';
import { useRouter } from 'next/navigation';

const ProjectsGrid = ({ projects = null, onCreate }) => {

    const routerProject = useRouter();

    const handleOpenProject = (id) => {
        routerProject.push(`/projects/${id}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1>Projects</h1>
            </div>
            <div className={styles.grid}>
                {projects != null && projects.map((project) => (
                    <div key={project.id} className={styles.card}>
                        <h2>{project.name}</h2>
                        <p>{project.description}</p>
                        <CustomButton text="Open Project" onClick={() => handleOpenProject(project.id)} />
                    </div>
                ))}
            </div>
            <CustomButton text="Create New Project" onClick={onCreate} />
        </div>
    );
};

export default ProjectsGrid;
