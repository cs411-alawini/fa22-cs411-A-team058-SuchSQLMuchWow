import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import _ from 'lodash';
import { PolicyService } from '../../services/policy.service';
import {UserActivityService} from "../../services/userActivity.service";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';
import './InsuranceList.css';
import {Header} from '../../components/Header/Header'
import Chip from '@mui/material/Chip';
import {LoginService} from "../../services/login.service";

const InsuranceList = () => {
    const isUserRole = LoginService.getRole()
    const [policyList, updatePolicyList] = useState<any[]>([])
    const [searchText, updateSearchText] = useState('')
    const [deleteId, setDeleteId] = useState('')
    const [isPopupVisible, setPopupVisibility] = useState(false)
    const navigate = useNavigate();
    const policyService = new PolicyService()
    const userActivityService = new UserActivityService()

    let page = 1
    const [totalCount, setTotalCount] = useState(0)
    const pageCount = 20

    const delayedAPIFetch = useCallback(_.debounce((query) => fetchAllPolicies(query), 500), []);
    const handleOnChange = (event) => {
        page = 1
        updateSearchText(event.target.value)
        delayedAPIFetch(event.target.value)
    }

    const fetchAllPolicies = async (query) => {
        const response = await policyService.getAllPolicies(query, page, pageCount)
        updatePolicyList(response.data)
        setTotalCount(Math.ceil(response.count/pageCount))
    }

    const handleOnEditInsuranceClick = (event, id) => {
        event.stopPropagation()
        navigate(`/editInsurance/${id}`);
    }

    const handleOnDeleteInsuranceClick = (event, id) => {
        event.stopPropagation()
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

    const handlePageChange = (event, value) => {
        page = value
        fetchAllPolicies(searchText).catch(console.error)
    }

    const trackInsuranceClick = (policyId) => {
        userActivityService.reportUserActivity(searchText, policyId).catch(console.error)
    }

    const displayAllPolicies = () => {

        if (policyList.length<=0) return <Typography variant="h5">No Policies Available</Typography>
        else {
            return policyList.map(({ id,name, cover_amt, premium_per_annum, premium_per_month, Company, type, tags }, index) => {
                let companyObject: any
                companyObject = Company
                return (
                    <Card sx= {{marginTop: "50px", width: "90%"}} key={id}>
                        <CardActionArea component={Link} to={`/viewInsurance/${id}`}>
                            <CardContent>
                            <div className="insuranceContainer" onClick={() => trackInsuranceClick(id)}>
                                <div className="insuranceHeader">
                                    <Typography variant="h5">{name}</Typography>
                                    <Typography>{companyObject.name}</Typography>
                                </div>

                                <div className="tagContainer">
                                    {tags.map(tag => <Chip label={tag.name} sx={{marginRight: '5px', background: '#bfffa6', marginBottom: '5px'}}></Chip>)}
                                </div>

                                <hr />
                                <div className="featureContainer">
                                    <div className="subContainer">
                                        <div className="header"><Typography sx={{fontWeight: 'bold'}}>Policy Type</Typography></div>
                                        <div className="data">{type}</div>
                                    </div>

                                    <div className="subContainer">
                                        <div className="header"><Typography sx={{fontWeight: 'bold'}}>Premium Per Annum</Typography></div>
                                        <div className="data">{premium_per_annum}</div>
                                    </div>

                                    <div className="subContainer">
                                        <div className="header"><Typography sx={{fontWeight: 'bold'}}>Premium Per Month</Typography></div>
                                        <div className="data">{premium_per_month}</div>
                                    </div>

                                    <div className="subContainer">
                                        <div className="header"><Typography sx={{fontWeight: 'bold'}}>Cover Amount</Typography></div>
                                        <div className="data">{cover_amt}</div>
                                    </div>
                                </div>
                                {/* <div className="activeContainer">
                                    <Typography>Status: </Typography>
                                    {isActive ? <div className="green dot"></div> : <div className="red dot"></div>}
                                </div> */}
                                
                            </div>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>

                            {isUserRole == 3 && <button onClick={(event) => handleOnEditInsuranceClick(event, id)}><img src="./edit.png" alt="Edit Button" className="editBtn" /></button>}
                            {isUserRole == 3 && <button onClick={(event) => handleOnDeleteInsuranceClick(event, id)}><img src="./delete.png" alt="Edit Button" /></button>}
                            
                        </CardActions>
                    </Card>



                    
                )
            })
        }
    }

    useEffect(() => {
        fetchAllPolicies(searchText).catch(console.error)
    }, [])

    return(
        <div>
        <Header />

        <div className="InsuranceView">
            <Typography variant='h3'>Insurances</Typography>
            <div className="searchContainer">
                <TextField  id="outlined-basic" label="Search Insurances" variant="outlined" className="searchBox" value={searchText} onChange={handleOnChange}/>
            </div>
            <div className="insuranceList">
                {displayAllPolicies()}
            </div>

            <Pagination sx={{marginTop: "30px"}} count={totalCount} showFirstButton showLastButton onChange={handlePageChange} />



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
        </div>
    )
}

export default InsuranceList;