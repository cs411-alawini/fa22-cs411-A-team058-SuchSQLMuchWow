import React from 'react'
import './Header.css'

export class Header extends React.Component {

    constructor(props) {
        super(props)
    }


    render() {

        return (
            
            <div className='Header'> 
                <div className='logo'> InsuranceHub </div>
                <div className='links'> 

                    <span>Link 1</span>
                    <span>Link 2</span>
                    <span>Link 3</span> 
                
                </div>
            
            </div>

            

        )



    }



}
