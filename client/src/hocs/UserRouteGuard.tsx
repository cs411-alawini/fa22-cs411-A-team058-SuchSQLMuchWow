import React from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import { LoginService } from '../services/login.service'
import InsuranceList from "../pages/InsuranceList";

const UserRouteGuard = (WrappedComponent) => {
    const userRole = LoginService.getRole()


    if(userRole===2) {
        return () => <Navigate replace to='/insurancelist' />
    } else {
        return WrappedComponent
    }
}

export default UserRouteGuard;