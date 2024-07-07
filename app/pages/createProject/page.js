"use client"
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CreateProjectForm from '../../components/CreateProjectForm/CreateProjectForm';
import styles from '../../page.module.css';

const CreateProject = () => {
    return (
        <main className={styles.main}>
            <Navbar />
            <CreateProjectForm onCreate={(newProject) => setProjects([...projects, newProject])} />
        </main>
    );
};

export default CreateProject;