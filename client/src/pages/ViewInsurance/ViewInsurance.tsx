import React, { useState, useEffect } from 'react';
import Typography from "@mui/material/Typography";
import { PolicyService } from '../../services/policy.service';
import './ViewInsurance.css';

const ViewInsurance = () => {
    const [policyList, updatePolicyList] = useState([])
    const policyServer = new PolicyService()

    const fetchAllPolicies = async () => {
        const response = await policyServer.getAllPolicies()
        updatePolicyList(response.data)
    }

    const displayAllPolicies = () => {

        if (policyList.length<=0) return <Typography variant="h5">No Policies Available</Typography>
        else {
            return policyList.map(({ name, cover_amt, premium_per_annum, premium_per_month, isActive, company_id }) => (
                <div className="insuranceContainer">
                    <div className="insuranceHeader">
                        <Typography>{name}</Typography>
                        <Typography>{company_id}</Typography>
                    </div>
                </div>
            ))
        }
    }

    useEffect(() => {
        fetchAllPolicies().catch(console.error)
    }, [])

    return(
        <div className="InsuranceView">
            <Typography variant='h3'>Insurances</Typography>
            <div className="insuranceList">
                {displayAllPolicies()}
            </div>
        </div>
    )
}

export default ViewInsurance;