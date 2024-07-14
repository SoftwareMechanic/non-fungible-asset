"use client"

import Image from "next/image";
import styles from "./page.module.css";
import Navbar from './components/Navbar/Navbar';
import ProjectsGrid from './components/ProjectsGrid/ProjectsGrid';
import React, { useState } from 'react';
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function Home() {

  const wallet = useWallet()
  return (
    <div>
      <Navbar />
      {wallet.connected ? 
        <ProjectsGrid />
        :
        <div style={{ display:"flex", flexDirection:"column", minWidth:"100%", minHeight: "100vh", alignItems: "center", alignContent: "center"}}>
          <h1> Connect wallet </h1>
          <WalletMultiButton/>
        </div>

        
      }
    </div>
    
  );
}



