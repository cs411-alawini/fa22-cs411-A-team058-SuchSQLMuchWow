import './App.css';
// import {Header} from './components/Header/Header'
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Outlet, useLocation, useNavigate} from 'react-router-dom'

function App() {

  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    if(location.pathname == "/")
      navigate("/home")
  })

  return (
      <div className="App">
        {/* <Header jwtToken={localStorage.getItem("jwtToken")}/> */}

        <Outlet />
      </div>
  );
}

export default App;
