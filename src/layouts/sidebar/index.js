import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import styles from "./sidebar.module.css";
import { useState, useEffect, useRef } from "react";
import ContextMenu from "../contextMenu";

import Box from '@mui/material/Box';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { TreeView } from '@mui/x-tree-view/TreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';


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
                name: 'New Collection',
            },
            isEmpty: true,
            item: [],
        };

        const updatedCollections = [...collections, newCollection];
        setCollections(updatedCollections);
        console.log(collections);
    };

    const addCollectionItem = (index, newItem) => {
        collections[index].item = [...collections[index].item, newItem];
    }

    const handleImport = () => {
        fileInputRef.current.click();
        console.log(collections);
    }

    // Upload file ----------------------------------------------------------------------------
    const fileInputRef = useRef();

    const handleFileUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                try {
                    const importedCollection = JSON.parse(content);
                    setCollections([...collections, importedCollection]);

                } catch (error) {
                    console.error('Error trying to parse JSON file: ', error);
                }
            };

            reader.readAsText(file);
        }
    };


    // Handlers for each menu  option ---------------------------------------------------------
    const handleRunCollection = (index) => {
        alert('Run collection ' + index);
    }

    const handleAddRequest = (collectionIndex) => {
        const updatedCollection = { ...collections[collectionIndex] };

        if (!updatedCollection.item || updatedCollection.item.length === 0) {
            updatedCollection.item = [];
        }

        const newRequest = {
            method: '',
            header: '',
            url: {
                raw: '',
                host: '',
                port: '',
                path: [],
            },
        };

        const newItem = {
            name: 'New Request',
            request: newRequest,
            response: [],
        };

        updatedCollection.item.push(newItem);

        updatedCollection.isEmpty = false;

        const updatedCollections = [...collections];
        updatedCollections[collectionIndex] = updatedCollection;

        setCollections(updatedCollections);
    };


    const handleAddFolder = (collectionIndex) => {
        const updatedCollection = { ...collections[collectionIndex] };

        if (!updatedCollection.item || updatedCollection.item.length === 0) {
            updatedCollection.item = [];
        }

        const newFolder = {
            name: 'New Folder',
            isEmpty: true,
            item: [
                {
                    name: 'This folder is empty',
                }
            ],
            description: '',
        };

        updatedCollection.item.push(newFolder);

        updatedCollection.isEmpty = false;

        const updatedCollections = [...collections];
        updatedCollections[collectionIndex] = updatedCollection;

        setCollections(updatedCollections);
    };



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
        const collectionString = JSON.stringify(collections[index], null, 2);

        const blob = new Blob([collectionString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${collections[index].info.name}.agua_collection.json`;
        a.click();
    }

    const handleDelete = (index) => {
        const newCollections = [...collections];
        newCollections.splice(index, 1);
        setCollections(newCollections);
    }

    // ----------------------------------------------------------------------------------------

    const menuOptions = [
        { name: 'Run collection', action: collectionIndex => {handleRunCollection(collectionIndex)} },
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
        handleRightClick(e);
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

    const renderTreeItems = (items, parentIndex) => {
        return items.map((collection, index) => (
            <TreeItem nodeId={`${parentIndex}-${index}`}
                      label={collection.info ? collection.info.name : collection.name}
                      key={`${parentIndex}-${index}`} onContextMenu={(e) => handleRightClick(e)}
            >
                {collection.item && collection.item.length > 0 && renderTreeItems(collection.item, `${parentIndex}-${index}`)}
            </TreeItem>
        ));
    };

    console.log(collections)


    return (
        <aside className={`vh-100 px-3 ${styles['sidebar']} ${isOpen ? styles['sidebar-open'] : styles['sidebar']}`}>
            <nav className={`h-100 d-flex flex-column border-right shadow-sm`}>
                <div className="pt-4 px-2 pb-2 d-flex justify-between align-content-center align-items-center">
                    <div className={styles['sidebar-toggle']} onClick={toggleSidebar}>
                        <div className={isOpen ? "pe-3" : ""}>
                            <span className=""><i className="bi bi-collection"></i></span>
                        </div>
                        <div>
                            <p className={`${isOpen ? '' : 'd-none'}`}>Collections</p>
                        </div>
                    </div>

                    <span className={`${isOpen ? '' : 'd-none'}`}>
                    <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} ref={fileInputRef} />
                        <button className={styles['import-button']} onClick={handleImport}>Import</button>
                    </span>

                </div>

                <div className={`pb-4 px-2 pb-2 d-flex justify-between align-content-center ${isOpen ? '' : 'd-none'}`}>
                    <button className={styles['add-button']} onClick={handleAddCollection}></button>
                    <input type="text" className={styles['search-bar']} placeholder="search collections" />
                </div>

                <div className={`flex-grow-1 overflow-auto ${isOpen ? '' : 'd-none'}`}>

                        <Box sx={{ minHeight: 180, flexGrow: 1, maxWidth: 300 }}>
                            <TreeView
                                aria-label="file system navigator"
                                defaultCollapseIcon={<ExpandMoreIcon />}
                                defaultExpandIcon={<ChevronRightIcon />}
                            >
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
                                        <TreeItem nodeId={`collection-${index}`} label={collection.info ? collection.info.name : collection.name} key={`collection-${index}`}>
                                            {collection.isEmpty ? (
                                                <TreeItem
                                                    nodeId={`empty-${index}`}
                                                    label="This collection is empty"
                                                />
                                            ) : null}
                                            {collection.item && collection.item.length > 0 && renderTreeItems(collection.item, `collection-${index}`)}
                                        </TreeItem>
                                    </div>
                                ))}
                            </TreeView>
                        </Box>

                </div>

            </nav>
        </aside>

    );
}