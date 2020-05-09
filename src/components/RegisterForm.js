import React, { useContext, useState, useEffect } from 'react';
import useSignUpForm from '../hooks/RegisterHooks';
import { register, login, checkUserAvailable } from '../hooks/ApiHooks';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MediaContext } from '../contexts/MediaContext';
import { Button, Grid, MuiThemeProvider } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {createMuiTheme} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core';

const theme = createMuiTheme({
    palette:{
      primary: {
        main: '#DF7861'
      },
    },
    overrides: {
        MuiContainer:{
            root:{
              padding:'0',
            },
        },
  
      MuiGrid:{
        root:{
          marginTop: '5rem',
          display: 'flex',
          justifyContent: 'center',
        }
    },
  
      MuiButton: {
        containedPrimary: {
          marginTop: '1rem',
          backgroundColor: "#DF7861",
          width: '60%',
          maxWidth: '12rem',
        }
  
      }
    }
  });
  
  
  const useStyles = makeStyles((theme) => ({
      containeri:{
          padding:0,
      },
      image: {
        borderRadius: '50%',
        width: '50%',
      },
      gridKuva:{
          marginTop:'1rem',
          marginBottom:'-3rem',
  
      },
      person:{
          height:0,
          marginTop:'1.3rem',
      },
      lock:{
          marginBottom:'.3rem',
      },
      margini:{
          margin:'1rem',
      }
  
    }));



const RegisterForm = ({ history }) => {
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useContext(MediaContext);
    const classes = useStyles();
    const alkuarvot = {
        username: undefined,
        password: undefined,
        email: undefined,
        full_name: undefined,
    };
    const [errorMessage, setErrorMessage] = useState(alkuarvot);



    const doRegister = async () => {
        try {
            //await checkUserAvailable(inputs.username);
            await register(inputs);
            const userdata = await login(inputs);
            setUser(userdata.user);
            localStorage.setItem('token', userdata.token);
            history.push('/home');
        } catch (e) {
            console.log("register form", e.message)
        }
    };



    const { inputs, handleInputChange, handleSubmit } = useSignUpForm(doRegister);


    useEffect(() => {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            console.log(value);
            if (value !== inputs.password) {
                return false;
            }
            return true;
        });

        ValidatorForm.addValidationRule('isAvailable', async (value) => {
            console.log(value);
            try {
                const response = await checkUserAvailable(value);
                console.log(response);
                return response.available;
            } catch (e) {
                console.log(e.message);
                return true;
            }
        });
    }, [inputs]);

    return (
        <MuiThemeProvider theme={theme}>
        <Grid container>
            <Grid item xs={12}>
                <h1>Register</h1>
            </Grid>
            <Grid item xs={12}>
                <ValidatorForm
                    onSubmit={handleSubmit}
                    instantValidate={false}
                    noValidate>
                    <Grid container>
                        <Grid container item>
                            <TextValidator
                                fullWidth
                                type="text"
                                name="username"
                                label="Username*"
                                className={classes.margini}
                                onChange={handleInputChange}
                                value={inputs.username}
                                helperText={errorMessage.username}
                                error={errorMessage.username ? true : false}
                                validators={[
                                    'required',
                                    'minStringLength:3',
                                    'isAvailable',
                                ]}
                                errorMessages={[
                                    'this field is required',
                                    'minimum 3 characters',
                                    inputs.username + ' is not available',
                                ]}
                            />
                        </Grid>
                        <Grid container item>
                            <TextValidator
                                fullWidth
                                className={classes.margini}
                                type="password"
                                name="password"
                                label="Password*"
                                onChange={handleInputChange}
                                value={inputs.password}
                                validators={[
                                    'required',
                                    'minStringLength:5'
                                ]}
                                errorMessages={[
                                    'this field is required',
                                    'minimum 5 characters',
                                ]}
                            />
                        </Grid>
                        <Grid container item>
                            <TextValidator
                                fullWidth
                                className={classes.margini}
                                type="password"
                                name="confirm"
                                label="Confirm password*"
                                onChange={handleInputChange}
                                value={inputs.confirm}
                                validators={['isPasswordMatch', 'required']}
                                errorMessages={['password mismatch', 'this field is required']}
                            />
                        </Grid>
                        <Grid container item>
                            <TextValidator
                                fullWidth
                                className={classes.margini}
                                type="email"
                                name="email"
                                label="Email*"
                                onChange={handleInputChange}
                                value={inputs.email}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                            />
                        </Grid>
                        <Grid container item>
                            <TextValidator
                                fullWidth
                                className={classes.margini}
                                type="text"
                                name="full_name"
                                label="Full name"
                                onChange={handleInputChange}
                                value={inputs.full_name}
                                validators={
                                    ['matchRegexp:^[a-zA-Z]+(([\',. -][a-zA-Z ])?[a-zA-Z]*)*$']
                                }
                                errorMessages={['text only']}
                            />
                        </Grid>
                        <Grid container item>
                            <Button 
                            fullWidth 
                            color="primary" 
                            type="submit" 
                            variant="contained"
                            className={classes.margini}
                            >Register</Button>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </Grid>
        </Grid>
        </MuiThemeProvider>
    );
};

RegisterForm.propTypes = {
    history: PropTypes.object,
};

export default withRouter(RegisterForm);