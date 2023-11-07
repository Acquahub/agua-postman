/*
import TreeNode from '../treeNode';
import styles from "../sidebar/sidebar.module.css";

export default function CollectionsTree({ collections, handleRightClick }) {

    return (
        <ul>
            {collections.map((collection, index) => (
                <div key={collection.info.id} className={styles['collection']} data-bs-theme="dark" onContextMenu={(e) => handleRightClick(e)}>
                    <TreeNode node={collection} key={index} />

                    {showContextMenu && (
                        <ContextMenu
                            options={menuOptions}
                            position={contextMenuPosition}
                            onClose={handleContextMenuClose}
                            onOptionClick={handleOptionClick}
                            collectionIndex={index}
                        />
                    )}
                </div>
            ))}


        </ul>


    );
}*/
