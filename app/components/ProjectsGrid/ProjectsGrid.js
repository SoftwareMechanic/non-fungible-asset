import React from 'react';
import styles from './ProjectsGrid.module.css';
import CustomButton from '../CustomButton/CustomButton';

const ProjectsGrid = ({ projects = null, onCreate }) => {
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
                    </div>
                ))}
            </div>
            <CustomButton text="Create New Project" onClick={onCreate} />
        </div>
    );
};

export default ProjectsGrid;
