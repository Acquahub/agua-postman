import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

import React, { useState } from "react";
import styles from "./requestBar.module.css";
import Select from "react-select";

export default function RequestBar({ userInputCallback }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    userInputCallback(event.target.value);
  }

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  }

  const options = [
    { value: "GET",    label: "GET",    color: "green" },
    { value: "POST",   label: "POST",   color: "blue" },
    { value: "PUT",    label: "PUT",    color: "red" },
    { value: "DELETE", label: "DELETE", color: "purple" },
    { value: "PATCH",  label: "PATCH",  color: "orange" },
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,  
      color: state.data.color,
      border: "none",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
     
    }),
  };

  const getOptionLabel = (option) => (
    <div style={{ color: option.color }}>{option.label}</div>
  );

  return (
    <div className={styles['container-fluid d-flex']}>

      { /* ¿Por qué todo dentro de una label? */ }
      <label className={styles['label']}>
        <Select
            className={styles['select']}
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
            styles={customStyles}
            getOptionLabel={getOptionLabel}
            placeholder={options[0].label}
          />
        <input
            className={styles['input']}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter or paste URL here"
          />

        <button type="button" className="btn btn-primary px-4">
          Send
        </button>
      </label>
      
    </div>
  );
}
