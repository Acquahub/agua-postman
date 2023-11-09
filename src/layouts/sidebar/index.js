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

    const [lastContextMenuId, setLastContextMenuId] = useState('');

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
        const editedCollection = updatedCollections[index];

        if (editedCollection.info) {
            editedCollection.info.name = newCollectionName;
        } else {
            editedCollection.name = newCollectionName;
        }

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

    console.log(collections);

    const getClonedItemToPerformAction = (action, id) => {
        // TODO: Es necesario chequear el action
        // Si action es addRequest y el elemento al que se le dio click es
        // un request, entonces el nuevo request debe ser agregado en el padre, es decir,
        // no se debe retornar el elemento al que se le dio click, sino su padre.
        // Por otro lado, si es un rename, si se debe retornar siempre el elemento
        // al que se le dio click.
        const cloneCollections = [...collections];
        const idParts = id.split('-');
        const l = idParts.length;
        let myObject = cloneCollections[idParts[0]];
        let lastFolder = myObject;
        for (let i = 1; i < l; i++) {
            let item = myObject.item[idParts[i]];
            console.log('item: ', item)

            if (action === 'duplicate' && i === l - 1) {
                // TODO: Change name
                const duplicatedItemCopy = JSON.parse(JSON.stringify(item));
                lastFolder.item.push(duplicatedItemCopy);
                break;
            }

            if (action === 'rename' || (action === 'delete' && i === l - 1)) {
                return item;
            }

            if (item.request) break;
            myObject = myObject.item[idParts[i]];
            lastFolder = myObject;
        }

        switch (action) {
            case 'addRequest': {
                return lastFolder
            }
            case 'addFolder': {
                return lastFolder
            }
            case 'duplicate': {
                return lastFolder
            }
            default: {
                return myObject;
            }
        }
    }

    const setItemOnClonedCollections = (id, item) => {

    }

    const getIndexFromContextMenuId = (contextMenuId) => {
        const idParts = contextMenuId.split('-');
        return parseInt(idParts[idParts.length - 1]);
    };


    // Handlers for each menu  option ---------------------------------------------------------
    const handleAddRequest = () => {
        const updatedCollection = getClonedItemToPerformAction('addRequest', lastContextMenuId);

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

        console.log('updatedCollection: ', updatedCollection)

        updatedCollection.item.push(newItem);
        updatedCollection.isEmpty = false;
    };

    console.log('collections: ', collections)

    const handleAddFolder = () => {

        const updatedCollection = getClonedItemToPerformAction('addFolder', lastContextMenuId);

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
    };



    const handleRename = () => {

        const updatedElement = getClonedItemToPerformAction('rename', lastContextMenuId);


        const isRequest = updatedElement.hasOwnProperty('request');


        const newName = prompt(`Enter a new name for the ${isRequest ? 'request' : 'folder'}`, updatedElement.name);

        if (newName !== null) {

            if (isRequest) {
                updatedElement.name = newName;
            } else {
                updatedElement.info ? updatedElement.info.name = newName : updatedElement.name = newName;
            }


            setCollections([...collections]);
        }
    };


    const handleDuplicate = () => {

        const parentCollection = getClonedItemToPerformAction('duplicate', lastContextMenuId);


    }

    const handleExport = () => {
        const index = getIndexFromContextMenuId(lastContextMenuId);

        const collectionString = JSON.stringify(collections[index], null, 2);

        const blob = new Blob([collectionString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${collections[index].info.name}.agua_collection.json`;
        a.click();
    }

    const handleDelete = () => {
        const index = getIndexFromContextMenuId(lastContextMenuId);

        const newCollections = [...collections];
        newCollections.splice(index, 1);
        setCollections(newCollections);
    }

    // ----------------------------------------------------------------------------------------

    const menuOptions = [
        { name: 'Add request', action: collectionIndex => { handleAddRequest(collectionIndex) } },
        { name: 'Add folder', action: collectionIndex => { handleAddFolder(collectionIndex) } },
        { name: 'Rename', action: collectionIndex => { handleRename(collectionIndex) } },
        { name: 'Duplicate', action: collectionIndex => { handleDuplicate(collectionIndex) } },
        { name: 'Export', action: collectionIndex => { handleExport(collectionIndex) } },
        { name: 'Delete', action: collectionIndex => { handleDelete(collectionIndex) } }
    ];

    const handleRightClick = (e, id) => {
        e.preventDefault();
        e.stopPropagation();

        setLastContextMenuId(id);

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
                label={isEditing ? (
                    <input
                        type="text"
                        value={newCollectionName}
                        onChange={(e) => setNewCollectionName(e.target.value)}
                        onBlur={() => finishEditing(`${parentIndex}-${index}`)}
                        autoFocus
                    />
                ) :
                    (
                        <span onDoubleClick={() => startEditing(`${parentIndex}-${index}`)}
                        >
                            {collection.info ? collection.info.name : collection.name}
                        </span>
                    )}
                key={`${parentIndex}-${index}`} onContextMenu={(e) => handleRightClick(e, `${parentIndex}-${index}`)}
            >
                {collection.item && collection.item.length > 0 && renderTreeItems(collection.item, `${parentIndex}-${index}`)}
            </TreeItem>
        ));
    };

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
                                <div key={collection.info.id} className={styles['collection']} data-bs-theme="dark" onContextMenu={(e) => handleRightClick(e, `${index}`)}>
                                    {showContextMenu && (
                                        <ContextMenu
                                            options={menuOptions}
                                            position={contextMenuPosition}
                                            onClose={handleContextMenuClose}
                                            onOptionClick={handleOptionClick}
                                            collectionIndex={index}
                                        />
                                    )}
                                    <TreeItem
                                        nodeId={`collection-${index}`}
                                        label={isEditing ? (
                                            <input
                                                type="text"
                                                value={newCollectionName}
                                                onChange={(e) => setNewCollectionName(e.target.value)}
                                                onBlur={() => finishEditing(`${index}`)}
                                                autoFocus
                                            />
                                        ) :
                                            (
                                                <div
                                                    onDoubleClick={() => startEditing(`${index}`)}
                                                >
                                                    {collection.info ? collection.info.name : collection.name}
                                                </div>
                                            )}

                                        key={`${index}`}>
                                        {collection.isEmpty ? (
                                            <TreeItem
                                                nodeId={`empty-${index}`}
                                                label="This collection is empty"
                                            />
                                        ) : null}
                                        {collection.item && collection.item.length > 0 && renderTreeItems(collection.item, `${index}`)}
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