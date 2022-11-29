import React from 'react';
import { Login } from "../pages/Login";
import { Navigate } from 'react-router-dom';
import { LoginService } from '../services/login.service'

const AuthenticationHOC = (WrappedComponent) => {
    const userjwtToken = LoginService.getToken()

    if(userjwtToken) {
        return <WrappedComponent />
    } else {
        return <Navigate replace to='/login' />;
    }
}

export default AuthenticationHOC;