import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import styles from "./sidebar.module.css";
import { useState, useEffect } from "react";
import ContextMenu from "../contextMenu";

export default function Sidebar({ isOpen, toggleSidebar }) {
    const [collections, setCollections] = useState([]);

    // States for context menu
    const [showContextMenu, setShowContextMenu] = useState(false);
    const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });

    // States to rename a collection
    const [isEditing, setIsEditing] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);

    const startEditing = (index) => {
        setIsEditing(true);
        setEditingIndex(index);
        setNewCollectionName(collections[index].info.name);
    }

    const finishEditing = (index) => {
        const updatedCollections = [...collections];
        updatedCollections[index].info.name = newCollectionName;
        setCollections(updatedCollections);

        setIsEditing(false);
        setEditingIndex(null);
    }

    const handleAddCollection = () => {
        const newCollection = { 
            info: {
                id: collections.length + 1, 
                name: 'New Collection'
            },

            item: []
        };

        setCollections([...collections, newCollection]);
    }

    const addCollectionItem = (index, newItem) => {
        collections[index].item = [...collections[index].item, newItem];
    }

    // Handlers for each menu  option -------------------------------------------------------
    const handleRunCollection = (index) => {
        alert('Run collection ' + index);
    }
    
    const handleEdit = (index) => {
        alert('Edit collection ' + index);
    }
    
    const handleAddRequest = (index) => {
        alert('Add request to collection ' + index);

        const newRequest = {
            method: '',
            header: '',
            url: {
                raw: '',
                host: '',
                port: '',
                path: []
            }
        };

        const newItem = {
            name: '',
            request: newRequest,
            response: []
        };

        addCollectionItem(index, newItem);
    } 

    const handleAddFolder = (index) => {
        alert('Add folder to collection ' + index);

        const newItem = {
            name: '',
            item: []
        };

        addCollectionItem(index, newItem);
    } 

    const handleRename = (index) => {
        startEditing(index);

        alert('Rename collection ' + index);
    }

    const handleDuplicate = (index) => {
        const newCollection = structuredClone(collections[index]);
        const newCollections = [...collections, newCollection];
        setCollections(newCollections);
    }

    const handleExport = (index) => {
        alert('Export collection ' + index);
    }

    const handleDelete = (index) => {
        const newCollections = [...collections];
        newCollections.splice(index, 1);
        setCollections(newCollections);

        alert('Delete collection ' + index);
    }

    // ----------------------------------------------------------------------------------------

    const menuOptions = [
        { name: 'Run collection', action: collectionIndex => {handleRunCollection(collectionIndex)} },
        { name: 'Edit',           action: collectionIndex => {handleEdit(collectionIndex)} },
        { name: 'Add request',    action: collectionIndex => {handleAddRequest(collectionIndex)} },
        { name: 'Add folder',     action: collectionIndex => {handleAddFolder(collectionIndex)} },
        { name: 'Rename',         action: collectionIndex => {handleRename(collectionIndex)} },
        { name: 'Duplicate',      action: collectionIndex => {handleDuplicate(collectionIndex)} },
        { name: 'Export',         action: collectionIndex => {handleExport(collectionIndex)} },
        { name: 'Delete',         action: collectionIndex => {handleDelete(collectionIndex)} }
    ];
    
    const handleRightClick = (e) => {
        e.preventDefault();

        setContextMenuPosition({ x: e.clientX, y: e.clientY });
        setShowContextMenu(true);
    }

    const handleContextMenuClose = () => {
        setShowContextMenu(false);
    }

    const toggleContextMenu = (e) => {
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
        setShowContextMenu(true);
        alert('show context menu');
    }

    const handleOptionClick = (option, collectionIndex) => {
        option.action(collectionIndex);
        setShowContextMenu(false);
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (showContextMenu && !e.target.closest('.wrapper')) {
                setShowContextMenu(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    }, [showContextMenu]);


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
                    <button className={styles['add-button']} onClick={handleAddCollection}></button>
                    <input type="text" className={styles['search-bar']} placeholder="search collections" />
                </div>
                
                <div className={`flex-grow-1 overflow-auto ${isOpen ? '' : 'd-none'}`}>
                    <ul>
                        {collections.map((collection, index) => (
                            <div key={collection.info.id} className={styles['collection']} data-bs-theme="dark" onContextMenu={(e) => handleRightClick(e)}>
                                {showContextMenu && (
                                    <ContextMenu
                                        options={menuOptions}
                                        position={contextMenuPosition}
                                        onClose={handleContextMenuClose}
                                        onOptionClick={handleOptionClick}
                                        collectionIndex={index}
                                    />
                                )}
                                <div className={`accordion ${styles['accordion-custom']}`} id={`accordion-${collection.id}`}>
                                    <div className={`accordion-item `}>
                                        <h2 className="accordion-header">
                                            <button className={`accordion-button ${styles['accordion-button-custom']}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${collection.id}`}>
                                                <button className={`${styles['options-button']}`} onClick={(e) => toggleContextMenu(e)}>
                                                    <i className="bi bi-three-dots"></i>
                                                </button>

                                                {isEditing && index === editingIndex ? (
                                                    <input
                                                        type="text"
                                                        value={newCollectionName}
                                                        onChange={(e) => setNewCollectionName(e.target.value)}
                                                        onBlur={() => finishEditing(editingIndex)}
                                                    />
                                                ) : (
                                                    <span onDoubleClick={() => startEditing(index)}>{collection.info.name}</span>
                                                )}
                                            </button>
                                        </h2>
                                        <div id={`collapse-${collection.id}`} className="accordion-collapse collapse">
                                            <div className={`accordion-body ${styles['accordion-body-custom']}`}>
                                                <p>
                                                    This collection is empty <br />
                                                    <a href="#">Add a request</a> to start working.
                                                </p>
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