import React, { useState } from "react";
import DatePicker from "react-datepicker";
import CustomButton from "../CustomButton/CustomButton";
import styles from './style.module.css';

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

export default function GenerateSensorData() {
  const [startDate, setStartDate] = useState(new Date());
  const [name, setName] = useState('');
  const [generatedData, setGeneratedData] = useState([])


  const addGeneratedData = (newGeneratedData) => {
    setGeneratedData((prevGeneratedData) => {
      const updatedGeneratedData = [...prevGeneratedData, newGeneratedData];
      return updatedGeneratedData;
    })
  }

  const handleGenerate = () => {
    // generate data
    const data = {
      name: name,
      date: startDate.toString()
    }
    addGeneratedData(data)
  }

  return (
    <div className={styles.container}>
            <div className={styles.header}>
                <h1>Projects</h1>
            </div>
        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        <label className={styles.label}>
        Data:
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                required
            />
        </label>

        <CustomButton text="Add data" onClick={handleGenerate} />

        <div className={styles.grid2}>
                {generatedData != null && generatedData.map((generatedItem) => (
                    <div className={styles.card}>
                        <h2>{generatedItem.name}</h2>
                        <p>{generatedItem.date}</p>
                    </div>
                ))}
            </div>

        <CustomButton text="Generate and mint" onClick={handleGenerate} />
    </div>  

  );
};