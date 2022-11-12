import Typography from '@mui/material/Typography';
import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button'
import { ValidationGroup, Validate } from 'mui-validate';
import { PolicyService } from '../services/policy.service';


export class AddNewInsurance extends React.Component<any, any> {

    policyService = new PolicyService()

    constructor(props: {}) {
        super(props)
        this.state = {values:{'policyType': '1'}}
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentDidMount() {
        if (this.props.id) {
            const policyService = new PolicyService()
            const response = await policyService.getPolicyById(this.props.id)
            const policyData = response.data[0]
            const policyTypeMap = {
                "Auto": 1,
                "Home": 2,
                "Medical": 3,
            }
            this.setState(oldState => ({
                values: {
                    ...oldState['values'],
                    name: policyData.name,
                    policyType: policyTypeMap[policyData.type],
                    coverAmt: policyData.cover_amt,
                    premiumPM: policyData.premium_per_month,
                    premiumPA: policyData.premium_per_annum,
                },
                editablePolicyData: policyData
            }))
        }
    }

    onChangeHandler(event) {
        const fieldName = event.target.name
        const value = event.target.value

        this.setState((oldState, props) => ({
            values : {...oldState['values'], [fieldName]: value},
        }))
        

    }

    async onSubmit(event) {
        if (this.props.id) {
            const values = this.state.values
            const newPolicyObject = {
                ...this.state.editablePolicyData,
                name: values.name,
                cover_amt: values.coverAmt,
                premium_per_month: values.premiumPM,
                premium_per_annum: values.premiumPA,
            }
            const res = await this.policyService.updatePolicyById(newPolicyObject)
            if(res.ok) {
                alert("Policy Updated Successfully")
                this.props.navigate("/insurancelist")
            }
        }
        else {
            try {
                await this.policyService.addPolicy(this.state['values'])
                this.setState({values: {'policyType': '1'}})
                alert('Policy created successfully')
            } catch (e: any) {
                alert(e.message)
            }
        }
    }


    render() {

        return (

            <div className="AddNewInsurance">

                <Typography variant='h3'>Add New Insurance</Typography>

                <Container> 
                    <Box component="form" sx = {{flexGrow: 1, marginTop: '30px' }}> 

                    <ValidationGroup>
                        <Grid container spacing={2}>

                            <Grid xs={12} md={6}>
                                <Validate name="name" required={[true, 'This field is required']} regex={[/^[a-z0-9A-Z ]+$/, 'The value should be alphanumeric']}>
                                    <TextField InputLabelProps={{
                                        shrink: true,
                                    }} value={this.state['values'].name} fullWidth id="name" label="Policy Name" name="name" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="policyType">Policy Type</InputLabel>
                                    <Select
                                        disabled={!!this.props.id}
                                        labelId="policyType"
                                        id="demo-simple-select"
                                        name="policyType"
                                        label="Policy Type"
                                        value={this.state['values'].policyType}
                                        onChange={this.onChangeHandler}
                                        >
                                        <MenuItem value={1}>Auto</MenuItem>
                                        <MenuItem value={2}>Home</MenuItem>
                                        <MenuItem value={3}>Medical</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid xs={12} md={6}>
                                <Validate name="coverAmt" required={[true, 'This field is required']}>
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={this.state['values'].coverAmt}
                                        fullWidth id="coverAmt" type="number" label="Cover Amount ($)" name="coverAmt" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Validate name="premiumPA" required={[true, 'This field is required']}>  
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={this.state['values'].premiumPM}
                                        fullWidth id="premiumPM" type="number" label="Premium Per Month ($)" name="premiumPM" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Validate name="premiumPM" required={[true, 'This field is required']}>
                                    <TextField
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={this.state['values'].premiumPA}
                                        fullWidth id="premiumPA" type="number" label="Premium Per Annum ($)" name="premiumPA" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12}>
                                <Button variant="contained" onClick={this.onSubmit}> Submit </Button>
                            </Grid>
                        </Grid>
                    </ValidationGroup>


                    </Box>


                </Container>
                
            </div>





        )




    }


}