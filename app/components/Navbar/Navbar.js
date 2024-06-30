import React from 'react';
import styles from '../Navbar/style.module.css'
import WalletConnector from '@/app/classes/walletConnector';

const Navbar = () => {
    return (
        <div className={styles.navbar_container}>
            <nav className={styles.navbar}>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>

            <button className={styles.navbar_end_button} onClick={() => WalletConnector.connect()}>
                Connect
            </button>
        </div>
    );
};

export default Navbar;