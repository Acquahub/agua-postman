import React, { useState } from "react";
import styles from "./bodyTab.module.css";
import KeyValueTable from "../keyValueTable"

export default function BodyTab() {
  const [selectedOption, setSelectedOption] = useState(null);

  // const handleSelection = () => {
  //   selectedOption
  // }
  
  return (
    <div className="container-fluid m-3 d-flex gap-4">
      <span className="d-flex gap-2">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
        <label className="form-check-label" for="flexRadioDefault1">
          none
        </label>
      </span>

      <span className="d-flex gap-2">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
        <label className="form-check-label" for="flexRadioDefault1">
          form-data
        </label>
      </span>

      <span className="d-flex gap-2">
        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
        <label className="form-check-label" for="flexRadioDefault1">
          raw
        </label>
      </span>

      <div className="container-fluid d-flex">
        {}
      </div>
      
    </div>
  );
}

