import React, { useContext } from 'react';
import useLoginForm from '../hooks/LoginHooks';
import { login } from '../hooks/ApiHooks';
import { MediaContext } from '../contexts/MediaContext';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {Button, TextField, Grid, MuiThemeProvider} from '@material-ui/core';
import logoKuva from '../Kuvat/SmartBuilding.png';
import {makeStyles} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
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

  }));
const LoginForm = ({ history }) => {
    // eslint-disable-next-line no-unused-vars
     
    const classes = useStyles();
    const [user, setUser] = useContext(MediaContext)
    const doLogin = async () => {
        try {
            const userdata = await login(inputs);
            setUser(userdata.user);
            localStorage.setItem('token', userdata.token);
            history.push('/home');
        } catch (e) {
            console.log("login form",e.message);
            alert('Wrong Username or Password... try again.');
        }
    };
    const { inputs, handleInputChange, handleSubmit } = useLoginForm(doLogin);
    return (
        <Grid container spacing={3} >
            <Grid item xs={12}>
                <h1>Naapurusto</h1>
            </Grid>
            <Grid className={classes.gridKuva}>
                <img
                className={classes.image}
                src={logoKuva}
                />
            </Grid>
            <Grid item xs={12}>
            <form onSubmit={handleSubmit}>
                <Grid container>
                    <Grid container item xs={12}>
                    <Grid item className={classes.person}>
                        <PersonIcon/>
                    </Grid>
                    <Grid item>
                        <TextField
                            
                            type="text"
                            name="username"
                            label="Username"
                            onChange={handleInputChange}
                            value={inputs.username}
                        />
                    </Grid>
                </Grid>
                <Grid container item xs={12} alignItems="flex-end">
                    <Grid item className={classes.lock}>
                        <LockIcon/>
                    </Grid>
                    <Grid item>
                <TextField
                    
                    type="password"
                    name="password"
                    label="Password"
                    onChange={handleInputChange}
                    value={inputs.password}
                />
                </Grid>
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