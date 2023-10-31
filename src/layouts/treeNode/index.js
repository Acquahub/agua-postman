import { useState } from "react";
import CollectionsTree from '../collectionsTree';

export default function TreeNode({ node }) {
    const { info, item } = node;
    const [showItem, setShowItem] = useState(false);

    const handleClick = () => {
        setShowItem(!showItem);
    }

    return (
        <div>
          <div onClick={handleClick} style={{ marginBottom: "10px" }}>
            <span>{info.name}</span>
          </div>
          <ul style={{ paddingLeft: "10px", borderLeft: "1px solid black" }}>
            {showItem && node.item && node.item.length > 0 && <CollectionsTree treeData={item} />}
          </ul>
        </div>
    );

}