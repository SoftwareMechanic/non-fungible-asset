"use client"

import React from 'react';
import styles from '../../../page.module.css';
import { useProjects } from '@/context/ProjectsContext';
import { useRouter } from 'next/navigation';

const ProjectPage = ({ params }) => {

  const router = useRouter();

  let id = params.slug;

  const { projects } = useProjects();

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
      <p>{project.description}</p>
    </div>
    </main>
  );
};

export default ProjectPage;