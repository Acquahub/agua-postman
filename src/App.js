import './App.css';
import RequestMaker from './layouts/requestMaker';
import Nav from './layouts/nav';
import Response from './layouts/response';
import Sidebar from './layouts/sidebar';
import { useState } from "react";
import ContextMenu from './layouts/contextMenu';

function App() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  const menuOptions = [
    {name: 'Edit'},
    {name: 'Add request'},
    {name: 'Rename'},
    {name: 'Duplicate'},
    {name: 'Export'},
    {name: 'Delete'}
  ];

  return (
    <div className={`${isOpen ? 'containerLayout-packed' : 'containerLayout-expanded'}`}>
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      <div className="containerMainView">
          <Nav />
          {/* <RequestMaker />
          <Response /> */}
      </div>

      <ContextMenu options={menuOptions} />
      
    </div>
  );
}

export default App;
