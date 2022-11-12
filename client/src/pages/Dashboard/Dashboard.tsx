import React from 'react'
import './Dashboard.css'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

const Dashboard = () => {

    return(
        <div className="dashboardPage">
            <Typography variant="h3" marginTop={2}>Dashboard</Typography>
            <Grid container spacing={2} marginTop={2}>
                <Grid xs={6}>
                    <Typography>Top Insurance Policies</Typography>
                </Grid>
                <Grid xs={6}>
                    <Typography>User Activity</Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Dashboard;