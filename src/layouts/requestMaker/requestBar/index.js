import React, { useState } from "react";
import styles from "./requestBar.module.css";

export default function RequestBar({userInputCallback}) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    userInputCallback(event.target.value);
  }

  return (
    <div className={styles['container']}>
      <label className={styles['label']}>
        <div>
          <select className={styles['select']}>
            <option>Get</option>
            <option>Send</option>
            <option>Push</option>
            <option>Delete</option>
          </select>
        </div>
        <div>
          <input
            className={styles['input']}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ingresa la URL aqui">
          </input>
        </div>
      </label>
    </div>
  );
}