import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap-icons/font/bootstrap-icons.css"

import styles from "./keyValueTabParams.module.css";
import {useEffect, useState} from "react";

export default function KeyValueTabParams({paramsItem}) {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        if(paramsItem && paramsItem.length > 0){
            setRows([...paramsItem, getEmptyRow()]);
        } else {
            setRows([getEmptyRow()])
        }

    } , [paramsItem])

    function getEmptyRow() {
        return {
            key: "",
            value: "",
            description: "",
            type: ""
        };
    }

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
        <div className={styles['divTable']}>
            <table className={styles['tabla']}>
                <thead>
                <tr>
                    <th></th>
                    <th>Key</th>
                    <th>Value</th>
                    <th>Description</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        <td><input className="form-check-input" type="checkbox" value=""/></td>
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
                        <td data-bs-theme="dark">
                            <button type="button" className="btn btn-close" aria-label="Close" onClick={() => handleBulkEdit(index)} ></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
