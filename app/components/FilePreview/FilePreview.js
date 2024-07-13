import React from "react";
import styles from './style.module.css';

const FilePreview = ({ fileData }) => {
  if (!fileData) return null;

  if (fileData.fileList.length === 0) { return }
  
    let lastFile = [fileData.fileList[fileData.fileList.length - 1]];

  return (
    <div className={styles.fileList}>
      <div className={styles.fileContainer}>
        {/* loop over the fileData */}
        {lastFile.map((f) => {
          return (
              <ol key={f.lastModified}>
                <li className={styles.fileList}>
                  {/* display the filename and type */}
                  <div key={f.name} className={styles.fileName}>
                    {f.name}
                  </div>
                </li>
              </ol>
          );
        })}
      </div>
    </div>
  );
};

export default FilePreview;