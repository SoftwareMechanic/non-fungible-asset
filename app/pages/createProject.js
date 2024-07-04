import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import CreateProjectForm from '../components/CreateProjectForm/CreateProjectForm';

/*
export default function CreateProject() {

    return (
        <main className={styles.main}>
            <Navbar />
            <CreateProjectForm />
        </main>
    );
};
*/

const CreateProject = () => {
    return (
        <main>
            <Navbar />
            <CreateProjectForm onCreate={(newProject) => setProjects([...projects, newProject])} />
        </main>
    );
};

export default CreateProject;