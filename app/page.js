"use client"

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from './components/Navbar/Navbar';
import ProjectsGrid from './components/ProjectsGrid/ProjectsGrid';
import React, { useState } from 'react';
import Link from 'next/link';


export default function Home() {

  /*
  const [projects, setProjects] = useState([
    { id: 1, name: 'Project 1', description: 'Description of Project 1' },
    { id: 2, name: 'Project 2', description: 'Description of Project 2' },
  ]);
*/
  return (
    <main className={styles.main}>
      <Navbar />
      <ProjectsGrid />
      <Link href="/pages/about">About</Link>
    </main>
  );
}



