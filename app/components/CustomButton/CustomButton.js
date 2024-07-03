import React from 'react';
import styles from './customButton.module.css';

const CustomButton = ({ text, onClick }) => {
    return (
        <div className={styles.buttonContainer}>
            <button onClick={onClick} className={styles.customButton}>
                {text}
            </button>
        </div>
    );
};

export default CustomButton;