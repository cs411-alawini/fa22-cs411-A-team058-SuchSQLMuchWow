import React from 'react'
import './Header.css'
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export class Header extends React.Component {

    constructor(props: {}) {
        super(props)
    }

    jwtToken = localStorage.getItem("jwtToken")




    render() {

        return (
            
            <div className='Header'> 
                <div className='logo'> InsuranceHub </div>
                <div className='links'>
                    {
                        this.jwtToken ? (
                            <div className="navContainer">
                                <Link to={"insurancelist"}><Button>Insurance List</Button></Link>
                                <Link to={"addInsurance"}><Button>Add Insurance</Button></Link>
                                <Link to={"dashboard"}><Button>Dashboard</Button></Link>
                            </div>
                        ) : (
                            <div className="navContainer">
                                <Link to={"login"}><Button>Login</Button></Link>
                                <Link to={"register"}><Button>Register</Button></Link>
                            </div>
                        )
                    }
                </div>
            
            </div>

            

        )



    }



}
