import React, { useState, useEffect, useCallback } from 'react';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import _ from 'lodash';
import { PolicyService } from '../../services/policy.service';
import './ViewInsurance.css';

const ViewInsurance = () => {
    const [policyList, updatePolicyList] = useState([])
    const [searchText, updateSearchText] = useState('')
    const policyServer = new PolicyService()

    const delayedAPIFetch = useCallback(_.debounce((query) => fetchAllPolicies(query), 500), []);
    const handleOnChange = (event) => {
        updateSearchText(event.target.value)
        delayedAPIFetch(event.target.value)
    }

    const fetchAllPolicies = async (query) => {
        const response = await policyServer.getAllPolicies(query)
        updatePolicyList(response.data)
    }

    const displayAllPolicies = () => {

        if (policyList.length<=0) return <Typography variant="h5">No Policies Available</Typography>
        else {
            return policyList.map(({ name, cover_amt, premium_per_annum, premium_per_month, isActive, Company }, index) => {
                let companyObject: any
                companyObject = Company
                return (
                    <div className="insuranceContainer" key={index}>
                        <div className="insuranceHeader">
                            <Typography variant="h5">{name}</Typography>
                            <Typography>{companyObject.name}</Typography>
                        </div>
                        <Typography>Premium Per Annum: {premium_per_annum}</Typography>
                        <Typography>Premium Per Month: {premium_per_month}</Typography>
                        <Typography>Cover Amount: {cover_amt}</Typography>
                        <div className="activeContainer">
                            <Typography>Status: </Typography>
                            {isActive ? <div className="green dot"></div> : <div className="red dot"></div>}
                        </div>
                    </div>
                )
            })
        }
    }

    useEffect(() => {
        fetchAllPolicies(searchText).catch(console.error)
    }, [])

    return(
        <div className="InsuranceView">
            <Typography variant='h3'>Insurances</Typography>
            <div className="searchContainer">
                <TextField  id="outlined-basic" label="Search Insurances" variant="outlined" className="searchBox" value={searchText} onChange={handleOnChange}/>
            </div>
            <div className="insuranceList">
                {displayAllPolicies()}
            </div>
        </div>
    )
}

export default ViewInsurance;