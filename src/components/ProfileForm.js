import React, { useContext, useState, useEffect } from 'react';
import useProfileForm from '../hooks/ProfileHooks';
import { updateProfile, checkUserAvailable, checkToken, uploadAvatar } from '../hooks/ApiHooks';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MediaContext } from '../contexts/MediaContext';
import { Button, Grid, MuiThemeProvider } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {createMuiTheme} from '@material-ui/core/styles';

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

const ProfileForm = ({ history }) => {
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useContext(MediaContext);
    const [toggle, setToggle] = useState(false);
    const showHide = () => {
        setToggle(!toggle);
    };

    const doProfile = async () => {
        try {
            //await checkUserAvailable(inputs.username);
            const token = localStorage.getItem('token');
            if (inputs.file !== undefined) {
                console.log("Yritetäänv avatar uploadia");
            await uploadAvatar(inputs, token, user.user_id);
            }
            await updateProfile(inputs, token);
            const userdata = await checkToken(token);
            console.log('ProfileForm doProfile', userdata);
            setUser(userdata);
        } catch (e) {
            console.log("register form", e.message)
        }
    };

    const { inputs, setInputs, handleInputChange, handleSubmit, handleFileChange } = useProfileForm(doProfile);

    useEffect(() => {
        setInputs(user);
        ValidatorForm.addValidationRule('isAvailable', async (value) => {
            console.log(value);
            try {
                if (value !== user.username) {
                    const response = await checkUserAvailable(value);
                    console.log(response);
                    return response.available;
                } else {
                    return true;
                }
            } catch (e) {
                console.log(e.message);
                return true;
            }
        });
    }, [user, setInputs]);
// console.log("rivi 55", user);
    return (
        <MuiThemeProvider theme={theme}>
        <Grid container>
            <Grid item>
                <Button
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={showHide}
                >
                    Päivitä profiili
                </Button>
            </Grid>

            {toggle &&
                <>
                
                    <Grid item>
                        <ValidatorForm
                            onSubmit={handleSubmit}
                            instantValidate={false}
                            noValidate
                        >
                            <Grid container>
                                <Grid container item>
                                    <TextValidator
                                        fullWidth
                                        type="text"
                                        name="username"
                                        label="Username"
                                        onChange={handleInputChange}
                                        value={inputs.username}
                                        validators={[
                                            'required',
                                            'minStringLength:3',
                                            'isAvailable',
                                        ]}
                                        errorMessages={[
                                            'this field is required',
                                            'minimum 3 charaters',
                                            inputs.username + ' is not available',
                                        ]}
                                    />
                                </Grid>

                                <Grid container item>
                                    <TextValidator
                                        fullWidth
                                        type="email"
                                        name="email"
                                        label="Email"
                                        onChange={handleInputChange}
                                        value={inputs.email}
                                        validators={['required', 'isEmail']}
                                        errorMessages={[
                                            'this field is required',
                                            'email is not valid']}
                                    />
                                </Grid>

                                <Grid container item>
                                    <TextValidator
                                        fullWidth
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
                                    <TextValidator
                                        fullWidth
                                        type="file"
                                        name="profileImage"
                                        errorMessages={['images only']}
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </Grid>

                                <Grid container item>
                                    <Button
                                        fullWidth
                                        color="primary"
                                        type="submit"
                                        variant="contained">
                                        Tallenna 
                                    </Button>
                                </Grid>
                            </Grid>
                        </ValidatorForm>
                    </Grid>
                </>
            }
        </Grid>
        </MuiThemeProvider>
    );
};


ProfileForm.propTypes = {
    history: PropTypes.object,
};

export default withRouter(ProfileForm);