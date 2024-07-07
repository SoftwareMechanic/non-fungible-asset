"use client"

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from './components/Navbar/Navbar';
import ProjectsGrid from './components/ProjectsGrid/ProjectsGrid';
import React, { useState } from 'react';

export default function Home() {

  return (
    <main className={styles.main}>
      <Navbar />
      <ProjectsGrid />
    </main>
  );
}



