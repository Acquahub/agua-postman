import styles from "./paramsTab.module.css";
import { useState } from "react";

export default function ParamsTab() {
  const [rows, setRows] = useState([
    {
      key: "",
      value: "",
      description: "",
    },
  ]);

  function handleInputChange(index, event, field) {
    const newRows = [...rows];
    newRows[index][field] = event.target.value;

    // confirmo ingreso de valor en inputs
    const hasValue = Object.values(newRows[index]).some((value) => value !== "");

    // Valido el agregar fila
    if (hasValue && index === newRows.length - 1) {
      newRows.push({ key: "", value: "", description: "" });
    }

    setRows(newRows);
  }

  function handleBulkEdit(index) {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  }

  return (

    <div className={styles["paramsTab"]}>
      <p>Query Params</p>
      <div className={styles['divTable']}>
        <table className={styles['tabla']}>
          <thead>
            <tr>
              <th></th>
              <th style={{ color: "var(--testing)" }}>Key</th>
              <th> Value</th>
              <th>Description</th>
              <th> Bulk Edit</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>
                  <div className={styles['input-wrapper']}>
                    <input
                      className={styles['editable-input']}
                      placeholder="Key"
                      value={row.key}
                      onInput={(e) => handleInputChange(index, e, "key")}
                    />
                  </div>
                </td>
                <td>
                  <div className={styles['input-wrapper']}>
                    <input
                      className={styles['editable-input']}
                      placeholder="Value"
                      value={row.value}
                      onInput={(e) => handleInputChange(index, e, "value")}
                    />
                  </div>
                </td>
                <td>
                  <div className={styles['input-wrapper']}>
                    <input
                      className={styles['editable-input']}
                      placeholder="Description"
                      value={row.description}
                      onInput={(e) => handleInputChange(index, e, "description")}
                    />
                  </div>
                </td>
                <td><button onClick={() => handleBulkEdit(index)}>X</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
