import './App.css';
import {Header} from './components/Header/Header.js'
import {BrowserRouter as Router, Outlet} from 'react-router-dom'

function App() {
  return (
      <div className="App">
        <Header/>

        <Outlet />
      </div>
  );
}

export default App;
