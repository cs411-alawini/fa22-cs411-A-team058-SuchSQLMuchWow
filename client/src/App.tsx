import './App.css';
// import {Header} from './components/Header/Header'
import {BrowserRouter as Router, Outlet} from 'react-router-dom'

function App() {



  return (
      <div className="App">
        {/* <Header jwtToken={localStorage.getItem("jwtToken")}/> */}

        <Outlet />
      </div>
  );
}

export default App;
