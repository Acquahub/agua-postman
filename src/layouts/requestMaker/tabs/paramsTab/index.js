import styles from "./paramsTab.module.css";
import { useState} from "react";

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
      <table>
        <thead>
          <tr>
            <th className={styles['tabla']}></th>
            <th className={styles['tabla']}>Key</th>
            <th className={styles['tabla']}> Value</th>
            <th className={styles['tabla']}>Description</th>
            <th className={styles['tabla']}> Bulk Edit</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td><input type="checkbox" /></td>
              <td><input placeholder="Key" value={row.key} onChange={(e) => handleInputChange(index, e, "key")} /></td>
              <td><input placeholder="Value" value={row.value} onChange={(e) => handleInputChange(index, e, "value")} /></td>
              <td><input placeholder="Description" value={row.description} onChange={(e) => handleInputChange(index, e, "description")} /></td>
              <td><button onClick={() => handleBulkEdit(index)}>X</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
