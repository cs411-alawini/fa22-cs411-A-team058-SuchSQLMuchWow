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


export class AddNewInsurance extends React.Component {

    constructor(props) {
        super(props)
        this.state = {values:{'policyType': '1'}, errors: {}}

        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }


    validate(fieldName, value) {
        switch (fieldName) {
            case 'name':
                if(value.length === 0) {
                    this.setState((oldState, props) => (
                        {errors: {...oldState.errors, [fieldName]: 'This field is required'}}
                    ))
                    return false
                } else if(!new RegExp('^[a-z0-9]+$').test(value)) {
                    this.setState((oldState, props) => (
                        {errors: {...oldState.errors, [fieldName]: 'The value should be alphanumeric'}}
                    ))
                    return false
                } else {
                    this.setState((oldState, props) => (
                        {errors: {...oldState.errors, [fieldName]: undefined}}
                    )) 
                    return true            
                }
                break;
        
            case 'coverAmt':
                if(String(value).length === 0) {
                    this.setState((oldState, props) => (
                        {errors: {...oldState.errors, [fieldName]: 'This field is required'}}
                    ))
                    return false
                } else {
                    this.setState((oldState, props) => (
                        {errors: {...oldState.errors, [fieldName]: undefined}}
                    )) 
                    return true
                }
                break;
            case 'premiumPA':
                if(String(value).length === 0) {
                    this.setState((oldState, props) => (
                        {errors: {...oldState.errors, [fieldName]: 'This field is required'}}
                    ))
                    return false
                } else {
                    this.setState((oldState, props) => (
                        {errors: {...oldState.errors, [fieldName]: undefined}}
                    )) 
                    return true
                }
                break;
            case 'premiumPM':
                if(String(value).length === 0) {
                    this.setState((oldState, props) => (
                        {errors: {...oldState.errors, [fieldName]: 'This field is required'}}
                    ))
                    return false
                } else {
                    this.setState((oldState, props) => (
                        {errors: {...oldState.errors, [fieldName]: undefined}}
                    )) 
                    return true
                }
                break;
            case 'policyType':
                return true
            default:
                break;
        }

    }

    onChangeHandler(event) {
        const fieldName = event.target.name
        const value = event.target.value

        if(this.validate(fieldName, value)) {
            this.setState((oldState, props) => ({
                values : {...oldState.values, [fieldName]: value}
            }))
        }

    }

    onSubmit(event) {
        console.log(this.state.values)
    }


    render() {

        return (

            <div className="AddNewInsurance">

                <Typography variant='h3'>Add New Insurance</Typography>

                <Container> 
                    <Box component="form" sx = {{flexGrow: 1, marginTop: '30px' }}> 

                    <Grid container spacing={2}>
                        <Grid xs={12} md={6}>
                            <TextField error={this.state.errors.name !== undefined} helperText={this.state.errors.name} fullWidth id="name" label="Policy Name" name="name" variant="outlined" onChange={this.onChangeHandler}/>
                        </Grid>

                        <Grid xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="policyType">Policy Type</InputLabel>
                                <Select
                                    labelId="policyType"
                                    id="demo-simple-select"
                                    name="policyType"
                                    label="Policy Type"
                                    value={this.state.values.policyType}
                                    onChange={this.onChangeHandler}
                                    >
                                    <MenuItem value={1}>Auto</MenuItem>
                                    <MenuItem value={2}>Home</MenuItem>
                                    <MenuItem value={3}>Medical</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>


                        <Grid xs={12} md={6}>
                            <TextField error={this.state.errors.coverAmt !== undefined} helperText={this.state.errors.coverAmt} fullWidth id="coverAmt" type="number" label="Cover Amount ($)" name="coverAmt" variant="outlined" onChange={this.onChangeHandler}/>
                        </Grid>

                        <Grid xs={12} md={6}>
                            <TextField error={this.state.errors.premiumPM !== undefined} helperText={this.state.errors.premiumPM} fullWidth id="premiumPM" type="number" label="Premium Per Month ($)" name="premiumPM" variant="outlined" onChange={this.onChangeHandler}/>
                        </Grid>

                        <Grid xs={12} md={6}>
                            <TextField error={this.state.errors.premiumPA !== undefined} helperText={this.state.errors.premiumPA} fullWidth id="premiumPA" type="number" label="Premium Per Annum ($)" name="premiumPA" variant="outlined" onChange={this.onChangeHandler}/>
                        </Grid>

                        <Grid xs={12}>
                            <Button variant="contained" onClick={this.onSubmit}> Submit </Button>
                        </Grid>

                    </Grid>


                    </Box>


                </Container>
                
            </div>





        )




    }


}