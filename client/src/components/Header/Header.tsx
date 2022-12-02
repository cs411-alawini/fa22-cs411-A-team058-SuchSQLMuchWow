import React from 'react'
import './Header.css'
import { Link, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { LoginService } from '../../services/login.service'


export class Header extends React.Component<any> {

    constructor(p) {
        super(p)
        this.logout = this.logout.bind(this)
    }

    jwtToken = LoginService.getToken()
    isUser = LoginService.getRole() === 2
    state = {loggedOut: this.jwtToken ? false : true}

    logout() {
        LoginService.logout()
        this.setState({loggedOut: true})
    }

    render() {
        return (
            
            <div className='Header'> 
                <div className='logo'> InsuranceHub </div>
                <div className='links'>
                    {
                        this.jwtToken ? (
                            <div className="navContainer">
                                <Link to={"/insurancelist"}><Button variant='text'>Insurance List</Button></Link>
                                {!this.isUser && <Link to={"/addInsurance"}><Button variant='text'>Add Insurance</Button></Link>}
                                {!this.isUser && <Link to={"/dashboard"}><Button variant='text'>Dashboard</Button></Link>}
                                <Button onClick={this.logout} variant="contained">Logout</Button>
                                {this.state.loggedOut ? <Navigate to="/" replace={true} /> : ""}
                            </div>
                        ) : (
                            <div className="navContainer">
                                <Link to={"/login"}><Button>Login</Button></Link>
                                <Link to={"/register"}><Button>Register</Button></Link>
                            </div>
                        )
                    }
                </div>
            
            </div>
        )
    }
}
