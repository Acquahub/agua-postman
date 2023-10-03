import './App.css';
import RequestMaker from './layouts/requestMaker';
import Folders from './layouts/folders';
import Nav from './layouts/nav';
import Response from './layouts/response';

function App() {
  return (
    <div className="containerLayout">
      <Folders />
      <div className="containerMainView">
        <Nav />
        <RequestMaker />
        <Response />
      </div>
    </div>
  );
}

export default App;
