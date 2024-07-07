import React from 'react';
import styles from '../Navbar/style.module.css'
import WalletConnector from '@/app/classes/walletConnector';
import Link from 'next/link';

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const Navbar = () => {
    return (
        <div className={styles.navbar_container}>
            <nav className={styles.navbar}>
                <ul>
                    <li><Link href="/">Home</Link></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>

                <WalletMultiButton style={{ right:"10px"}} />
            </nav>

           
            {/* <button className={styles.navbar_end_button} onClick={() => WalletConnector.connect()}>
                Connect
            </button> */}
        </div>
    );
};

export default Navbar;