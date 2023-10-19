import React, { useState } from "react";
import styles from "./requestTitle.module.css";

export default function RequestTitle({ userInput }) {

  return (
    <div className={styles['title']}>
      <label className={styles['label']}> 
        <span className="pe-2">
          <img alt="http" src="img/http.png" className={styles['http-icon']}></img>
        </span>
        <div className={styles['titulo']}>
         {userInput ? userInput : "Untitled Request"}
        </div>
      </label>
    </div>
  );
}