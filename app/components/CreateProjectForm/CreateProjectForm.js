import React, { useState } from 'react';
import styles from './CreateProjectForm.module.css';

const CreateProjectForm = ({ onCreate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProject = {
            id: Date.now(),
            name,
            description,
        };
        onCreate(newProject);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h1 className={styles.title}>Create New Project</h1>
            <label className={styles.label}>
                Project Name:
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={styles.input}
                    required
                />
            </label>
            <label className={styles.label}>
                Description:
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.textarea}
                    required
                />
            </label>
            <button type="submit" className={styles.button}>
                Create
            </button>
        </form>
    );
};

export default CreateProjectForm;
