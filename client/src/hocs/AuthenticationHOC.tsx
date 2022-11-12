import React from 'react';
import { Login } from "../pages/Login";
import { Navigate } from 'react-router-dom';

const AuthenticationHOC = (WrappedComponent) => {
    const userjwtToken = localStorage.getItem('jwtToken')

    if(userjwtToken) {
        return <WrappedComponent />
    } else {
        return <Navigate replace to='/login' />;
    }
}

export default AuthenticationHOC;