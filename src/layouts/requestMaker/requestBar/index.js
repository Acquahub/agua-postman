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
    { value: "Get", label: "Get", color: "green" },
    { value: "Send", label: "Send", color: "blue" },
    { value: "Push", label: "Push", color: "red" },
    { value: "Delete", label: "Delete", color: "purple" },
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
    <div className={styles['container']}>
      <label className={styles['label']}>
        <div>
          <Select
            className={styles['select']}
            options={options}
            value={selectedOption}
            onChange={handleSelectChange}
            styles={customStyles}
            getOptionLabel={getOptionLabel}
            placeholder="Get"
          />
        </div>
        <div>
          <input
            className={styles['input']}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ingresa la URL aquí"
          />
        </div>
      </label>
    </div>
  );
}
