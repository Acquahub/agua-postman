import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

import React, {useEffect, useState} from "react";
import styles from "./requestBar.module.css";
import Select from "react-select";

export default function RequestBar({ setUserInput, selectedOption, setSelectedOption, selectedRequest }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setUserInput(event.target.value);
  }

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  }

  const options = [
    { value: "GET",    label: "GET",    color: "var(--content-color-success)" },
    { value: "POST",   label: "POST",   color: "var(--content-color-warning)" },
    { value: "PUT",    label: "PUT",    color: "var(--content-color-info)" },
    { value: "PATCH",  label: "PATCH",  color: "var(--content-color-patch-method)" },
    { value: "DELETE", label: "DELETE", color: "var(--content-color-error)" },
  ];

  const customStyles = {
    control: provided => ({
      ...provided, 
      background: 'var(--bg-color)', 
      border: 'none',
      outline: 'none',
      cursor: 'pointer',
      borderColor: 'var(--border-color)'}),
    option: (provided, state) => ({
      ...provided,  
      color: state.data.color,
      backgroundColor: state.isFocused ? 'var(--secondary-button-color)' : 'var(--bg-color)',
      border: "none",
      cursor: 'pointer'
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      background: 'transparent',
      outline: 'none'
    }),
    menu: (provided) => ({
      ...provided,
      background: 'var(--bg-color)'
    })
  };

  const getOptionLabel = (option) => (
    <div style={{ color: option.color }}>{option.label}</div>
  );


  useEffect(() => {
    if (!selectedOption) {
      setSelectedOption(options[0]);
    }
  }, []);


  useEffect(() => {
    // Actualizar el estado local con la información del request seleccionado
    if (selectedRequest && selectedRequest.request) {
      setInputValue(selectedRequest.request.url.raw);

      // Buscar la opción correspondiente al método y obtener su color
      const selectedMethod = selectedRequest.request.method;
      const selectedOptionWithColor = options.find(option => option.value === selectedMethod);

      if(!selectedOption || selectedOption.value !== selectedMethod) {
        setSelectedOption(selectedOptionWithColor || null);
      }
    }
  }, [selectedRequest]);

  return (
    <div className="container-fluid d-flex align-items-center">

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

      </label>
      <span>
        <button type="button" className={`btn btn-primary ${styles.button}`}>
            Send
        </button>
      </span>
      
      
    </div>
  );
}
