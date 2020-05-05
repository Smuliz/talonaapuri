import React, { useContext } from 'react';
import useLoginForm from '../hooks/LoginHooks';
import { login } from '../hooks/ApiHooks';
import { MediaContext } from '../contexts/MediaContext';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {Button, TextField, Grid} from '@material-ui/core';

const LoginForm = ({ history }) => {
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useContext(MediaContext)
    const doLogin = async () => {
        try {
            const userdata = await login(inputs);
            setUser(userdata.user);
            localStorage.setItem('token', userdata.token);
            history.push('/home');
        } catch (e) {
            console.log("login form",e.message);
        }
    };

    const { inputs, handleInputChange, handleSubmit } = useLoginForm(doLogin);
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <h1>Naapurusto</h1>
            </Grid>
            <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid container item xs={12}>
                <TextField
                    
                    type="text"
                    name="username"
                    label="Username"
                    onChange={handleInputChange}
                    value={inputs.username}
                />
                </Grid>
                <Grid container item xs={12}>
                <TextField
                    
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleInputChange}
                    value={inputs.password}
                />
                </Grid>
                <Grid container item xs={12}>
                <Button color="primary" type="submit" variant="contained">Login</Button>
                </Grid>
                </Grid>
            </form>
            </Grid>
        </Grid>
    );
};
LoginForm.propTypes = {
    history: PropTypes.object,
};

export default withRouter(LoginForm);