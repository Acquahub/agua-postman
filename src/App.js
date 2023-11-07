import './App.css';
import RequestMaker from './layouts/requestMaker';
import Nav from './layouts/nav';
import Response from './layouts/response';
import Sidebar from './layouts/sidebar';
import { useState } from "react";
import ContextMenu from './layouts/contextMenu';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`${isOpen ? 'containerLayout-packed' : 'containerLayout-expanded'}`}>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="containerMainView">
          <Nav />
          {/* <RequestMaker />
          <Response /> */}
      </div>
      
    </div>
  );
}

export default App;
