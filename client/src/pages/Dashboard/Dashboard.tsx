import React, {useEffect, useState} from 'react'
import './Dashboard.css'
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import {DashboardService} from "../../services/dashboard.service";
import {Header} from '../../components/Header/Header'
import MapChart from '../../components/DashboardComponents/MapComponent/MapChart'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
  } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import Slider from '@mui/material/Slider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

ChartJS.register(ArcElement, CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend);

const Dashboard = () => {
    const [userCountByState, setUserCountByState] = useState<any>([])
    const [policyTypeCounts, setPolicyTypeCounts] = useState<any>("")
    const [sliderValue, setSliderValue] = useState<number>(3)
    const [policyRatingList, setPolicyRatingList] = useState<any>([])
    const [lineChartData, setLineChartData] = useState<any>({})
    const dashboardService = new DashboardService()


    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
        },
      };

    const populateDashboardData = async () => {
        // const insuranceBody = await dashboardService.getMaxRatingPolicies().catch(console.error)
        const resBody = await dashboardService.getUserCountByState().catch(console.error)
        const data = await dashboardService.getPolicyTypeCount().catch(console.error)
        const policyList = await dashboardService.policyRatingList(sliderValue).catch(console.error)
        const lineData = await dashboardService.getLineChartData().catch(console.error)
        console.log(lineData)

        setUserCountByState(resBody.data)
        setPolicyTypeCounts(data)
        setPolicyRatingList(policyList.data)
        setLineChartData(lineData)
    }

    async function handleSliderChange(e, value) {
        setSliderValue(value as number)
        await populateDashboardData()
    }

    useEffect(() => {
        populateDashboardData().catch(console.error)
    }, [sliderValue])

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
                        <Typography>Count of policies for each type</Typography>
                        <div className="doughnutContainer">
                            {policyTypeCounts === "" ? null : <Doughnut data={policyTypeCounts} width={300} />}
                        </div>
                    </Grid>
                    <Grid sm={6} padding={5}>
                        <Typography>Search count by month</Typography>
                        <Line options={options} data={lineChartData} />
                    </Grid>
                    <Grid sm={6} padding={5}>
                        <Typography>Policies having ratings greater than equal to value</Typography>
                        <div className="slidercontainer">
                            <Slider
                                aria-label="Temperature"
                                defaultValue={sliderValue}
                                valueLabelDisplay="auto"
                                step={1}
                                marks
                                min={0}
                                max={5}
                                onChange={handleSliderChange}
                            />
                        </div>

                        <div className="listContainer">
                            <List>
                                {
                                    policyRatingList.map((policy: string) => {
                                        return (
                                        <ListItem disablePadding>
                                            <ListItemButton>
                                                <ListItemText primary={policy} />
                                            </ListItemButton>
                                        </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default Dashboard;