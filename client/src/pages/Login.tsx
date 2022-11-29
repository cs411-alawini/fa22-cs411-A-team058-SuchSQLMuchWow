import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { ValidationGroup, Validate, AutoDisabler } from 'mui-validate';
import {LoginService } from '../services/login.service'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'


export function Login() {

    const [formState, setstate] = useState({email: "", password: ""})
    const loginService = new LoginService()
    const navigate = useNavigate();

    function onChangeHandler(event) {
        const fieldName = event.target.name
        const value = event.target.value

        setstate({...formState, [fieldName]: value})
    }

    async function onSubmit() {
        try {
            await loginService.login(formState)
            navigate('/')
            console.log("should navigate")
        } catch(e: any) {
            alert(e.message)
        }
    }



    return (
        <div className="Login">

            <Typography variant='h3'>Login User</Typography>

            <Container maxWidth='sm'>
                <Box component="form" sx = {{flexGrow: 1, marginTop: '30px' }}>

                    <ValidationGroup>
                        <Grid container spacing={2}>
                            <Grid xs={12}>
                                <Validate name="email" required={[true, 'This field is required']} regex={[/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'The email should be of the type name@example.com']}>
                                    <TextField fullWidth id="email" label="Email" name="email" variant="outlined" onChange={onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12}>
                                <Validate name="password" required={[true, 'This field is required']}>
                                    <TextField fullWidth id="password" label="Password" name="password" variant="outlined" type="password" onChange={onChangeHandler}/>
                                </Validate>
                            </Grid>

                            <Grid xs={12}>
                                <AutoDisabler>
                                    <Button variant="contained" onClick={onSubmit}> Submit </Button>
                                </AutoDisabler>
                            </Grid>

                        </Grid>
                    </ValidationGroup>

                </Box>
            </Container> 



        </div>

    )


}
