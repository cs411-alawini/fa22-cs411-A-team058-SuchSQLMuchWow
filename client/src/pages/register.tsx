import React  from 'react'
import Typography from '@mui/material/Typography';
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
import {LoginService } from '../services/login.service'



export class RegisterUser extends React.Component {

    loginService: LoginService
    constructor(props) {
        super(props)
        this.loginService = new LoginService()
        this.state = {values: {securityQuestion: 1, middlename: ''}, securityQuestions: []}

        this.onChangeHandler = this.onChangeHandler.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    async componentDidMount() {
        let securityQuestions = await this.loginService.fetchSecurityQuestions()

        this.setState({securityQuestions: [...securityQuestions]})
    }


    onChangeHandler(event) {
        const fieldName = event.target.name
        const value = event.target.value

        this.setState((oldState, props) => ({
            values : {...oldState['values'], [fieldName]: value},
        }))
    }

    onSubmit() {
        console.log(this.state['values'])
        this.loginService.registerUser(this.state['values'])
    }

    render() {
        return (

            <div className="RegisterUser">
                <Typography variant='h3'>Register User</Typography>

                <Container>

                    <Box component="form" sx = {{flexGrow: 1, marginTop: '30px' }}> 

                    <ValidationGroup>
                        <Grid container spacing={2}>

                            <Grid xs={12} md={6}>
                                <Validate name="firstname" required={[true, 'This field is required']} regex={[/^[a-zA-Z]+$/, 'The value should be alphabetical']}>
                                    <TextField fullWidth id="firstname" label="First Name" name="firstname" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Validate name="middlename" regex={[/^[a-zA-Z]*$/, 'The value should be alphabetical']}>
                                    <TextField fullWidth id="middlename" label="Middle Name" name="middlename" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Validate name="lastname" required={[true, 'This field is required']} regex={[/^[a-zA-Z]+$/, 'The value should be alphabetical']}>
                                    <TextField fullWidth id="lastname" label="Last Name" name="lastname" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Validate name="email" required={[true, 'This field is required']} regex={[/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'The email should be of the type name@example.com']}>
                                    <TextField fullWidth id="email" label="Email" name="email" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Validate name="city" required={[true, 'This field is required']} regex={[/^[a-zA-Z ]+$/, 'The value should be alphabetical']}>
                                    <TextField fullWidth id="city" label="City" name="city" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Validate name="state" required={[true, 'This field is required']} regex={[/^[a-zA-Z ]+$/, 'The value should be alphabetical']}>
                                    <TextField fullWidth id="state" label="State" name="state" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Validate name="country" required={[true, 'This field is required']} regex={[/^[a-zA-Z ]+$/, 'The value should be alphabetical']}>
                                    <TextField fullWidth id="country" label="Country" name="country" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Validate name="zip" required={[true, 'This field is required']} regex={[/^[1-9\-]+$/, 'Not a valid Zip format']}>
                                    <TextField fullWidth id="zip" label="Postal Code" name="zip" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <FormControl fullWidth>
                                    <InputLabel id="securityQuestion"> Security Question</InputLabel>
                                    <Select
                                        labelId="securityQuestion"
                                        id="demo-simple-select"
                                        name="securityQuestion"
                                        label="Policy Type"
                                        value={this.state['values'].securityQuestion}
                                        onChange={this.onChangeHandler}
                                        >
                                        {this.state['securityQuestions'].map((question) => 
                                            <MenuItem key={question.id} value={question.id}>{question.question}</MenuItem>
                                        )}

                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Validate name="securityAns" required={[true, 'This field is required']} regex={[/^[a-zA-Z ]+$/, 'The value should be alphabetical']}>
                                    <TextField fullWidth id="securityAns" label="Security Answer" name="securityAns" variant="outlined" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Validate name="password" required={[true, 'This field is required']}>
                                    <TextField fullWidth id="password" label="Password" name="password" variant="outlined" type="password" onChange={this.onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Validate name="reconfirmPassword" required={[true, 'This field is required']} custom={[(value) => value === this.state['values']['password'], "The passwords don't match"]}>
                                    <TextField fullWidth id="reconfirmPassword" label="Reconfirm Password" name="reconfirmPassword" variant="outlined" type="password" onChange={this.onChangeHandler}/>
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