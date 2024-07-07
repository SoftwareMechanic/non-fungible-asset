"use client"

import React from 'react';
import styles from '../../../page.module.css';
import { useProjects } from '@/context/ProjectsContext';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar/Navbar';
import ProjectDetails from '@/app/components/ProjectDetails/ProjectDetails';

const ProjectPage = ({ params }) => {

  const router = useRouter();

  let id = params.slug;

  const { projects } = useProjects();

  const project = projects.find((project) => project.id === id);
  //const router = useRouter();

  // const navigateHome = () => {
  //   // Programmatically navigate to the home page
  //   router.push('/');
  // };

  return (
    <main className={styles.main}>
    <Navbar />
    <ProjectDetails project={project} />
    </main>
  );
};

export default ProjectPage;