import React, { useState } from "react";
import styles from "./requestTitle.module.css";
import Select from "react-select";

export default function RequestTitle({ userInput }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  }

  const options = [
    { value: "HTTP",      label: "HTTP" },
    { value: "GraphQL",   label: "GraphQL" },
    { value: "gRPC",      label: "gRPC" },
    { value: "WebSocket", label: "WebSocket" },
    { value: "Socket.IO", label: "Socket.IO" },
    { value: "MQTT",      label: "MQTT" }
  ];

  const customStyles = {
    option: (provided, state) => ({
      ...provided,  
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
    <div className={styles['title']}>
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
        <div className={styles['titulo']}>
         {userInput ? userInput : "Untitled Request"}
        </div>
      </label>
    </div>
  );
}