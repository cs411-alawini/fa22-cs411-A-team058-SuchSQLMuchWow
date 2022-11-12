import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import _ from 'lodash';
import { PolicyService } from '../../services/policy.service';
import './InsuranceList.css';

const InsuranceList = () => {
    const [policyList, updatePolicyList] = useState([])
    const [searchText, updateSearchText] = useState('')
    const [deleteId, setDeleteId] = useState('')
    const [isPopupVisible, setPopupVisibility] = useState(false)
    const navigate = useNavigate();
    const policyService = new PolicyService()

    const delayedAPIFetch = useCallback(_.debounce((query) => fetchAllPolicies(query), 500), []);
    const handleOnChange = (event) => {
        updateSearchText(event.target.value)
        delayedAPIFetch(event.target.value)
    }

    const fetchAllPolicies = async (query) => {
        const response = await policyService.getAllPolicies(query)
        updatePolicyList(response.data)
    }

    const handleOnEditInsuranceClick = (id) => {
        navigate(`/editInsurance/${id}`);
    }

    const handleOnDeleteInsuranceClick = (id) => {
        setDeleteId(id)
        setPopupVisibility(true)
    }

    const handleDeleteId = async () => {
        await policyService.deletePolicy(deleteId).catch(console.error)
        setPopupVisibility(false)
        fetchAllPolicies(searchText).catch(console.error)
    }

    const handleClearId = () => {
        setDeleteId('')
        setPopupVisibility(false)
    }

    const displayAllPolicies = () => {

        if (policyList.length<=0) return <Typography variant="h5">No Policies Available</Typography>
        else {
            return policyList.map(({ id,name, cover_amt, premium_per_annum, premium_per_month, isActive, Company, type }, index) => {
                let companyObject: any
                companyObject = Company
                return (
                    <div className="insuranceContainer" key={id}>
                        <div className="insuranceHeader">
                            <Typography variant="h5">{name}</Typography>
                            <Typography>{companyObject.name}</Typography>
                        </div>
                        <Typography>Policy Type: {type}</Typography>
                        <Typography>Premium Per Annum: {premium_per_annum}</Typography>
                        <Typography>Premium Per Month: {premium_per_month}</Typography>
                        <Typography>Cover Amount: {cover_amt}</Typography>
                        <div className="activeContainer">
                            <Typography>Status: </Typography>
                            {isActive ? <div className="green dot"></div> : <div className="red dot"></div>}
                        </div>
                        <div className="actionContainer">
                            <button onClick={() => handleOnEditInsuranceClick(id)}><img src="./edit.png" alt="Edit Button" className="editBtn" /></button>
                            <button onClick={() => handleOnDeleteInsuranceClick(id)}><img src="./delete.png" alt="Edit Button" /></button>
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
            {
                isPopupVisible ? <div className="deletePopup">
                    <div className="popupContainer">
                        <Typography variant="h5">Are you sure you want to delete this policy ?</Typography>
                        <div>
                            <Button variant="outlined" color="error" onClick={handleDeleteId}>
                                Delete
                            </Button>
                            <Button color="secondary" onClick={handleClearId}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div> : ''
            }
        </div>
    )
}

export default InsuranceList;