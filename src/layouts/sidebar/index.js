import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import styles from "./sidebar.module.css";
import { useState } from "react";

export default function Sidebar({ isOpen, toggleSidebar }) {
    const [collections, setCollections] = useState([]);

    const handleAdd = () => {
        const newCollection = { id: collections.length + 1, name: 'New Collection', requests: [] };
        setCollections([...collections, newCollection]);
    }

    return (
        <aside className={`vh-100 px-3 ${styles['sidebar']} ${isOpen ? styles['sidebar-open'] : styles['sidebar']}`}>
            <nav className={`h-100 d-flex flex-column border-right shadow-sm`}>
                <div className="pt-4 px-2 pb-2 d-flex justify-between align-content-center">
                    <div className={styles['sidebar-toggle']} onClick={toggleSidebar}>
                        <span className="pe-3"><i className="bi bi-collection"></i></span>
                        <p className={`${isOpen ? '' : 'd-none'}`}>Collections</p>
                    </div>
                    
                </div>

                <div className={`pb-4 px-2 pb-2 d-flex justify-between align-content-center ${isOpen ? '' : 'd-none'}`}>
                    <button className={styles['add-button']} onClick={handleAdd}></button>
                    <input type="text" className={styles['search-bar']} placeholder="search collections" />
                </div>
                

                <div className={`flex-grow-1 overflow-auto ${isOpen ? '' : 'd-none'}`}>
                    <ul className="">
                        {collections.map(collection => (
                            // <li key={collection.id} className={styles['collection']}>
                            //     <a href="#">{collection.name}</a>
                            // </li>

                            <div key={collection.id} className={styles['collection']}>
                                <div className={`accordion accordion-dark ${styles['accordion-custom']}`} id={`accordion-${collection.id}`}>
                                    <div className={`accordion-item `}>
                                        <h2 className="accordion-header">
                                            <button className={`accordion-button ${styles['accordion-button-custom']}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${collection.id}`}>
                                                {collection.name}
                                            </button>
                                        </h2>
                                        <div id={`collapse-${collection.id}`} className="accordion-collapse collapse">
                                            <div className="accordion-body">
                                                Contenido del acordeón aquí...
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                </div>
            </nav>
        </aside>
        
    );
}