import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import styles from "./sidebar.module.css";
import { useState } from "react";

export default function Sidebar() {
    const [collections, setCollections] = useState([
        { id: 1, name: 'Collection 1' },
        { id: 2, name: 'Collection 2' },
        { id: 3, name: 'Collection 3' }
    ])

    const handleAdd = () => {
        const newCollection = { id: collections.length + 1, name: 'New Collection' };
        setCollections([...collections, newCollection]);
    }

    return (
        <nav className="h-100 d-flex flex-column border-right shadow-sm">
            <div className="pt-4 px-2 pb-2 d-flex justify-between align-content-center">
                <span className="pe-3"><i className="bi bi-collection"></i></span>
                <p>Collections</p>
                
            </div>

            <div className="pb-4 px-2 pb-2 d-flex justify-between align-content-center">
                <button className={styles['add-button']} onClick={handleAdd}></button>
                <input type="text" className={styles['search-bar']} placeholder="search collections" />
            </div>
            

            <div className="flex-grow-1 overflow-auto">
                <ul className="">
                    {collections.map(collection => (
                        <li key={collection.id} className={styles['collection']}>
                            <a href="#">{collection.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}