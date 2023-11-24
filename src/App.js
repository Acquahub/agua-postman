import './App.css';
import RequestMaker from './layouts/requestMaker';
import Nav from './layouts/nav';
import Response from './layouts/response';
import Sidebar from './layouts/sidebar';
import { useState } from "react";
import ContextMenu from './layouts/contextMenu';

function App() {
    const [collections, setCollections] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState([]);
    const [idItem, setIdItem] = useState('');
    const [isOpen, setIsOpen] = useState(true);

    console.log(selectedRequest)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }


    const getClonedItemToPerformAction = (action, id) => {
        const cloneCollections = [...collections];
        const idParts = id.split('-');
        const l = idParts.length;
        let myObject = cloneCollections[idParts[0]];
        let lastFolder = myObject;

        let item;
        let wasFoundInside = false;

        for (let i = 1; i < l; i++) {
            item = myObject.item[idParts[i]];

            if (action === 'duplicate' && i === l - 1) {
                const duplicatedItemCopy = JSON.parse(JSON.stringify(item));
                duplicatedItemCopy.name = duplicatedItemCopy.name + '-copy';
                lastFolder.item.push(duplicatedItemCopy);
                break;
            }

            if ((action === 'rename' || action === 'delete' || action === 'update') && i === l - 1) {
                wasFoundInside = true;
                break;
            }

            if (item.request) break;

            myObject = myObject.item[idParts[i]];
            lastFolder = myObject;
        }

        if (wasFoundInside && item) return item;

        if(l <= 1 && action === 'duplicate') {
            const duplicatedCollectionCopy = JSON.parse(JSON.stringify(myObject));
            duplicatedCollectionCopy.info.name = duplicatedCollectionCopy.info.name + '-copy';
            duplicatedCollectionCopy.info.id = collections.length + 1;
            setCollections([...collections, duplicatedCollectionCopy]);
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

  return (
    <div className={`${isOpen ? 'containerLayout-packed' : 'containerLayout-expanded'}`}>
      <Sidebar collections={collections}
               setCollections={setCollections}
               isOpen={isOpen}
               toggleSidebar={toggleSidebar}
               getClonedItemToPerformAction={getClonedItemToPerformAction}
               selectedRequest={selectedRequest}
               setSelectedRequest={setSelectedRequest}
               setIdItem={setIdItem}/>

      <div className="containerMainView">
          {/*<Nav />*/}
           <RequestMaker selectedRequest={selectedRequest}
                         setSelectedRequest={setSelectedRequest}
                         getClonedItemToPerformAction={getClonedItemToPerformAction}
                         idItem={idItem}
           />
          <Response />
      </div>
      
    </div>
  );
}

export default App;
