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
import { ValidationGroup, Validate, AutoDisabler } from 'mui-validate';


export class AddNewInsurance extends React.Component {

    constructor(props: {}) {
        super(props)
        this.state = {values:{'policyType': '1'}}
        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    onChangeHandler(event) {
        const fieldName = event.target.name
        const value = event.target.value

        this.setState((oldState, props) => ({
            values : {...oldState['values'], [fieldName]: value},
        }))
        

    }

    async onSubmit(event) {

        alert("sending command")
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
                                <Validate name="name" required={[true, 'This field is required']} regex={[/^[a-z0-9A-Z]+$/, 'The value should be alphanumeric']}>
                                    <TextField fullWidth id="name" label="Policy Name" name="name" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="policyType">Policy Type</InputLabel>
                                    <Select
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
                                    <TextField fullWidth id="coverAmt" type="number" label="Cover Amount ($)" name="coverAmt" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Validate name="premiumPA" required={[true, 'This field is required']}>  
                                    <TextField fullWidth id="premiumPM" type="number" label="Premium Per Month ($)" name="premiumPM" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Validate name="premiumPM" required={[true, 'This field is required']}>
                                    <TextField fullWidth id="premiumPA" type="number" label="Premium Per Annum ($)" name="premiumPA" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12}>
                                <AutoDisabler>
                                    <Button variant="contained" onClick={this.onSubmit}> Submit </Button>
                                </AutoDisabler>
                            </Grid>
                        </Grid>
                    </ValidationGroup>


                    </Box>


                </Container>
                
            </div>





        )




    }


}