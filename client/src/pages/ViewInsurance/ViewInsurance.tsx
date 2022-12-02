import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import {Grid} from "@mui/material";
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Typography from "@mui/material/Typography";
import {Header} from '../../components/Header/Header';
import {PolicyService} from "../../services/policy.service";
import './ViewInsurance.css'


const populatePolicy = async (id, setPolicy) => {
    const policyService = new PolicyService()
    const response = await policyService.getPolicyById(id)
    const policyData = response.data
    setPolicy(policyData)
}

const ViewInsurance = () => {
    const { id } = useParams()
    const [policy, setPolicy] = useState({})
    const [rating, setRating] = React.useState<number | null>(2);

    useEffect(() => {
        populatePolicy(id, setPolicy).catch(console.error)
    }, [])

    const renderPolicy = (policy) => (
        <div className="full-width">
            <Typography variant='h3' marginTop={2}>{policy.name}</Typography>
            <Grid container spacing={2} marginTop={2}>
                <Grid sm={6} padding={1} className="align-left">
                    <Typography variant='h6' className='heavy' display='inline'>Company: </Typography>
                    <Typography variant='h6' display='inline'>{policy?.Company?.name}</Typography>
                </Grid>
                <Grid sm={6} padding={1} className="align-left">
                    <Typography variant='h6' className='heavy' display='inline'>Cover Amount: </Typography>
                    <Typography variant='h6' display='inline'>{policy.cover_amt}</Typography>
                </Grid>
                <Grid sm={6} padding={1} className="align-left">
                    <Typography variant='h6' className='heavy' display='inline'>Premium per annum: </Typography>
                    <Typography variant='h6' display='inline'>{policy.premium_per_annum}</Typography>
                </Grid>
                <Grid sm={6} padding={1} className="align-left">
                    <Typography variant='h6' className='heavy' display='inline'>Premium per month: </Typography>
                    <Typography variant='h6' display='inline'>{policy.premium_per_month}</Typography>
                </Grid>
                <Grid sm={6} padding={1} className="align-left">
                    <Typography variant='h6' className='heavy' display='inline'>Type: </Typography>
                    <Typography variant='h6' display='inline'>{policy.type}</Typography>
                </Grid>
                <Grid sm={12} padding={1} className="align-left">
                    <Typography variant='h6' className='heavy' display='inline'>Tags: </Typography>
                    {policy.tags?.map((tag, index) => <Chip label={tag.name} sx={{marginRight: '5px', background: '#bfffa6', marginBottom: '5px'}} key={index}></Chip>)}
                </Grid>
                <Grid sm={12} padding={1} className="align-left">
                    <Typography component="legend">Rate this policy: </Typography>
                    <Rating
                        name="simple-controlled"
                        value={rating}
                        onChange={(event, newValue) => {
                            setRating(newValue);
                        }}
                        size='large'
                    />
                </Grid>
            </Grid>
        </div>
    )

    return (
        <div>
            <Header />
            <div className="insuranceViewBody">
                {policy ? renderPolicy(policy) : ''}
            </div>
        </div>
    )
}

export default ViewInsurance