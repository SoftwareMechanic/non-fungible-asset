"use client"
import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import CreateProjectForm from '../../components/CreateProjectForm/CreateProjectForm';

const CreateProject = () => {
    return (
        <main>
            <Navbar />
            <CreateProjectForm onCreate={(newProject) => setProjects([...projects, newProject])} />
        </main>
    );
};

export default CreateProject;