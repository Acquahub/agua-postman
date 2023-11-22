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
    const [isOpen, setIsOpen] = useState(true);

    console.log(selectedRequest)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`${isOpen ? 'containerLayout-packed' : 'containerLayout-expanded'}`}>
      <Sidebar collections={collections} setCollections={setCollections} isOpen={isOpen} toggleSidebar={toggleSidebar} setSelectedRequest={setSelectedRequest} />

      <div className="containerMainView">
          {/*<Nav />*/}
           <RequestMaker  selectedRequest={selectedRequest}/>
          <Response />
      </div>
      
    </div>
  );
}

export default App;
