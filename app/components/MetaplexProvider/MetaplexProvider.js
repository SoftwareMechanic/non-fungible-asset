"use client"

import { Metaplex, irysStorage, walletAdapterIdentity } from '@metaplex-foundation/js';
import { MetaplexContext } from './useMetaplex';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { useMemo } from 'react';

export const MetaplexProvider = ({ children }) => {
  const { connection } = useConnection();

  const wallet = useWallet();

  const metaplex = useMemo(
    () => Metaplex.make(connection)
      .use(walletAdapterIdentity(wallet))      
      .use(irysStorage({
        address: 'https://devnet.irys.xyz',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
      }))

      ,
    [connection, wallet]
  );

  
 
  // metaplex.storage().uploadAll({extension: 'json', o})
  // await metaplex.nfts().uploadMetadata({ properties :{files:[ {type: 'application/pdf', u}]}}).then((s) => s.)

  return (
    <MetaplexContext.Provider value={{ metaplex }}>
      {children}
    </MetaplexContext.Provider>
  )
}
