import React, {useEffect, useState} from 'react'
import './Dashboard.css'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import {DashboardService} from "../../services/dashboard.service";
import {Header} from '../../components/Header/Header'
import MapChart from '../../components/DashboardComponents/MapComponent/MapChart'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const [userCountByState, setUserCountByState] = useState<any>([])
    const [policyTypeCounts, setPolicyTypeCounts] = useState<any>("")
    const dashboardService = new DashboardService()

    const populateDashboardData = async () => {
        // const insuranceBody = await dashboardService.getMaxRatingPolicies().catch(console.error)
        const resBody = await dashboardService.getUserCountByState().catch(console.error)
        const data = await dashboardService.getPolicyTypeCount().catch(console.error)
        
        setUserCountByState(resBody.data)
        setPolicyTypeCounts(data)
    }

    useEffect(() => {
        populateDashboardData().catch(console.error)
    }, [])

    return(
        <div>
            <Header />
            <div className="dashboardPage">
                <Typography variant="h3" marginTop={2}>Dashboard</Typography>
                <Grid container spacing={2} marginTop={2}>
                    <Grid sm={6} padding={5}>
                        <Typography>Users who searched for policy by state</Typography>

                        <MapChart data={userCountByState}/>
                    </Grid>
                    <Grid xs={6} padding={5} sx={{height: 400}}>
                        <Typography>{"Count of policies for each type"}</Typography>
                        <div className="doughnutContainer">
                            {policyTypeCounts === "" ? null : <Doughnut data={policyTypeCounts} width={300} />}
                        </div>
                        
                        {/* <List dense={false}>
                            {usersList.map(({first_name, email}) => (
                                <ListItem>
                                    <ListItemText
                                        primary={first_name}
                                        secondary={email}
                                    />
                                </ListItem>
                            ))}
                        </List> */}
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Dashboard;