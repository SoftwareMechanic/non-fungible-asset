"use client"

import React from 'react';
import styles from '../../../page.module.css';
import { useProjects } from '@/context/ProjectsContext';
import { useRouter } from 'next/navigation';

const ProjectPage = ({ params }) => {

  const router = useRouter();

  console.log(params);

  const { id } = params;
  const { projects } = useProjects();

  console.log("ProjectPage");
  console.log(projects);

  const project = projects.find((project) => project.id === id);
  //const router = useRouter();

  // const navigateHome = () => {
  //   // Programmatically navigate to the home page
  //   router.push('/');
  // };

  return (
    <main className={styles.main}>
      <div>
      <h1>{project.name}</h1>
      <p>Project ID: {project.id}</p>
      <p>{project.description}</p>
    </div>
    </main>
  );
};

export default ProjectPage;