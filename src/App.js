import './App.css';
import RequestMaker from './layouts/requestMaker';
import Nav from './layouts/nav';
import Response from './layouts/response';
import Sidebar from './layouts/sidebar';

function App() {
  return (
    <div className="containerLayout">
      <aside className='vh-100 px-3'>
        <Sidebar />
      </aside>

      <div className="containerMainView">
          <Nav />
          {/* <RequestMaker />
          <Response /> */}
      </div>
      
      
    </div>
  );
}

export default App;
