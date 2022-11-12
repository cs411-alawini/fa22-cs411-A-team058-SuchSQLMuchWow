import React, {useEffect, useState} from 'react'
import './Dashboard.css'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {DashboardService} from "../../services/dashboard.service";

const Dashboard = () => {
    const [maxRatingsPolicies, setMaxRatingPolicies] = useState([])
    const [usersList, setUsersList] = useState([])
    const dashboardService = new DashboardService()

    const populateDashboardData = async () => {
        const insuranceBody = await dashboardService.getMaxRatingPolicies().catch(console.error)
        const usersBody = await dashboardService.getUsersInCoverAmountRange().catch(console.error)
        setMaxRatingPolicies(insuranceBody.data)
        setUsersList(usersBody.data)
    }

    useEffect(() => {
        populateDashboardData().catch(console.error)
    }, [])

    return(
        <div className="dashboardPage">
            <Typography variant="h3" marginTop={2}>Dashboard</Typography>
            <Grid container spacing={2} marginTop={2}>
                <Grid xs={6} padding={5}>
                    <Typography>Top 15 Insurance Policies by MAX Rating recieved</Typography>
                    <List dense={false}>
                        {maxRatingsPolicies.map(({ id, name, count }) => (
                            <ListItem key={id}>
                                <ListItemText
                                    primary={name}
                                    secondary={`Max Rating Recieved Count: ${count}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid xs={6} padding={5}>
                    <Typography>{"Users searched for Policies having Cover Amount < 1000"}</Typography>
                    <List dense={false}>
                        {usersList.map(({first_name, email}) => (
                            <ListItem>
                                <ListItemText
                                    primary={first_name}
                                    secondary={email}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;