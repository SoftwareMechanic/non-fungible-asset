"use client"


//import styles from "./page.module.css";
//import React, { useState } from 'react';

import { useMemo, useState, useEffect } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  //GlowWalletAdapter,
  PhantomWalletAdapter,
  //SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import {
  WalletModalProvider,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { MetaplexProvider } from "../MetaplexProvider/MetaplexProvider" //"" './components/MetaplexProvider/MetaplexProvider';
//import { MetaplexProvider } from './MetaplexProvider';
//import { ShowNFTs } from './ShowNFTs';
import '@solana/wallet-adapter-react-ui/styles.css';

import styles from '../../page.module.css'


export default function BlockchainWallet(props) {

  
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
      setMounted(true)
  }, [])

   
  const [network, setNetwork] = useState(WalletAdapterNetwork.Devnet);

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      //new GlowWalletAdapter(),
      //new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  const handleChange = (event) => {
    switch (event.target.value) {
      case "devnet":
        setNetwork(WalletAdapterNetwork.Devnet);
        break;
      case "mainnet":
        setNetwork(WalletAdapterNetwork.Mainnet);
        break;
      case "testnet":
        setNetwork(WalletAdapterNetwork.Testnet);
        break;
      default:
        setNetwork(WalletAdapterNetwork.Devnet);
        break;
    }
  };
  



  return (
      mounted && <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <MetaplexProvider>
              {/* <div className={styles.App}>
                
                {/* <ShowNFTs onClusterChange={handleChange} /> */}
                {
                    props.children
                }
              
            </MetaplexProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
  );
}



