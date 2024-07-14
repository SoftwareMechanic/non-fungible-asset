"use client"

import React, { useReducer } from "react";
import Head from "next/head";
import DropZone from "@/app/components/DropZone/DropZone";
import styles from "../../../page.module.css"

import Navbar from "@/app/components/Navbar/Navbar";


export default function MintProjectItem({params}) {


  // reducer function to handle state changes
  const reducer = (state, action) => {
    switch (action.type) {
      case "SET_IN_DROP_ZONE":
        return { ...state, inDropZone: action.inDropZone };
      case "ADD_FILE_TO_LIST":
        return { ...state, fileList: state.fileList.concat(action.files) };
      default:
        return state;
    }
  };

  // destructuring state and dispatch, initializing fileList to empty array
  const [data, dispatch] = useReducer(reducer, {
    inDropZone: false,
    fileList: [],
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Drag And Drop File Upload</title>
        <meta name="description" content="Drag and drop file upload" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main className={styles.main}>
        <DropZone data={data} dispatch={dispatch} projectId={params.slug}/>
      </main>

    </div>
  );
}