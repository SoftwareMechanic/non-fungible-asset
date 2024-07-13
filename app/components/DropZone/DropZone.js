import React, { useRef, useState } from "react";
import Image from "next/image";
import FilePreview from "../FilePreview/FilePreview";
import styles from "./style.module.css";

import { useMetaplex } from "@/app/components/MetaplexProvider/useMetaplex";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import NonFungibleAssetMinter from "@/app/classes/nonFungibleAssetMinter";
import { getCandyMachinesPublickKeysForWallet } from "@/app/blockchain_utils/hashmap_solana_program";


const DropZone = ({ data, dispatch, projectId }) => {

  const subNftTypes = {
    Model: "Model",
    Document: "Document",
    Json: "Json"
  }

  const [subNftType, setSubNftType] = useState(subNftTypes.Model)


   const { metaplex } = useMetaplex();
   const wallet = useWallet();

   const connnection  = useConnection()

   const nameInput = useRef(null)
   const descriptionInput = useRef(null)
   const [fileContent, setFileContent] = useState(undefined)

   const mintProjectSubNft = async () => {
    
    
     var candyMachinesAddresses =  await getCandyMachinesPublickKeysForWallet(wallet, connnection.connection)

     var candyMachines = await NonFungibleAssetMinter.getCandyMachinesFromAddresses(metaplex, candyMachinesAddresses)

     // User should have alreadt created the candy machine
     const candyMachine = candyMachines[0]
     await NonFungibleAssetMinter.NonFungibleAssetMintProjectSubNft(
         candyMachine.address, 
         metaplex,
         wallet, 
         {
             projectId: projectId,
             type: subNftType, // Model, Document, etc
             name: nameInput.current.value,
             description: descriptionInput.current.value,
             file: fileContent // URL or TEXT?
         }
     );
    }


  // onDragEnter sets inDropZone to true
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDragLeave sets inDropZone to false
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  // onDragOver sets inDropZone to true
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // set dropEffect to copy i.e copy of the source item
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };

  // onDrop sets inDropZone to false and adds files to fileList
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // get files from event on the dataTransfer object as an array
    let files = [...e.dataTransfer.files];

    // ensure a file or files are dropped
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.pop();

    

      console.log(files);
      var reader = new FileReader();

      reader.readAsText(files, "UTF-8");

      reader.onload = (event) => {
        
        const thisFileContent = event.target.result;
        console.log(thisFileContent);
        setFileContent(thisFileContent)
      };
      reader.onerror = (event) => {
        console.error("Error reading file:", event.target.error);
      };

      console.log(reader);
      

      //files = files.filter((f) => !existingFiles.includes(f.name));

      // dispatch action to add droped file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
      // reset inDropZone to false
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };

  // handle file selection via input element
  const handleFileSelect = (e) => {
    // get files from event on the input element as an array
    let files = [...e.target.files];

    // ensure a file or files are selected
    if (files && files.length > 0) {
      // loop over existing files
      const existingFiles = data.fileList.map((f) => f.name);
      // check if file already exists, if so, don't add to fileList
      // this is to prevent duplicates
      files = files.pop();
      console.log(files);
      var reader = new FileReader();

      reader.readAsText(files, "UTF-8");

      reader.onload = (event) => {
        
        const thisFileContent = event.target.result;
        console.log(thisFileContent);
        setFileContent(thisFileContent)
      };
      reader.onerror = (event) => {
        console.error("Error reading file:", event.target.error);
      };

      console.log(reader);
      

      // dispatch action to add selected file or files to fileList
      dispatch({ type: "ADD_FILE_TO_LIST", files });
    }
  };


  const handleDropdownChange = () => {
    const select = document.getElementById("typeDropdown")
    const selectedOption = select.options[select.selectedIndex].value

    setSubNftType(selectedOption)
  }

  // // to handle file uploads
  // const uploadFiles = async () => {
  //   // get the files from the fileList as an array
  //   let files = data.fileList;
  //   // initialize formData object
  //   const formData = new FormData();
  //   // loop over files and add to formData
  //   files.forEach((file) => formData.append("files", file));

  //   // Upload the files as a POST request to the server using fetch
  //   // Note: /api/fileupload is not a real endpoint, it is just an example
  //   const response = await fetch("/api/fileupload", {
  //     method: "POST",
  //     body: formData,
  //   });

  //   //successful file upload
  //   if (response.ok) {
  //     alert("Files uploaded successfully");
  //   } else {
  //     // unsuccessful file upload
  //     alert("Error uploading files");
  //   }
  // };

  return (
    <>
    <label for="labelInput">Name</label>
    <input type="text" id="labelInput" name="name" ref={nameInput}/>

    <label for="descriptionInput" >Description</label>
    <input type="text" id="descriptionInput" name="description" ref={descriptionInput}/>
    <select style={{minWidth:"100px"}} id="typeDropdown" onChange={() => handleDropdownChange()}>
        {Object.values(subNftTypes).map((value) =>
          <option 
            value={value}
            key={value}
            >
              {value}
        </option> 
        )}
   </select>
      <div
        className={styles.dropzone}
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <Image src="@/upload.svg" alt="upload" height={50} width={50} />

        
        {subNftType == subNftTypes.Model ?
          <input
            id="fileSelect"
            type="file"
            multiple
            className={styles.files}
            onChange={(e) => handleFileSelect(e)}
            accept=".ifc"
          />
          :
          <input
            id="fileSelect"
            type="file"
            multiple
            className={styles.files}
            onChange={(e) => handleFileSelect(e)}
            accept=".pdf"
          />
        }

        
        <label htmlFor="fileSelect">You can select multiple Files</label>

        <h3 className={styles.uploadMessage}>
          or drag &amp; drop your file here
        </h3>
      </div>
      {/* Pass the selectect or dropped files as props */}
      <FilePreview fileData={data} />
      {/* Only show upload button after selecting atleast 1 file */}
      {data.fileList.length > 0 && (
        <button className={styles.uploadBtn} onClick={() => mintProjectSubNft()}>
          Mint Project Item
        </button>
      )}
    </>
  );
};

export default DropZone;