"use client"

import { useRouter } from 'next/navigation'
import Image from "next/image";
import styles from "./page.module.css";
import Navbar from './components/Navbar/Navbar';
import ProjectsGrid from './components/ProjectsGrid/ProjectsGrid';
import React, { useState } from 'react';

export default function Home() {

  const router = useRouter();

  const handleCreateProjectClick = () => {
    router.push('./pages/createProject');
  };

  const [projects, setProjects] = useState([
    { id: 1, name: 'Project 1', description: 'Description of Project 1' },
    { id: 2, name: 'Project 2', description: 'Description of Project 2' },
  ]);

  return (
    <main className={styles.main}>
      <Navbar />
      <ProjectsGrid projects={projects} onCreate={handleCreateProjectClick} />
    </main>
  );
}



