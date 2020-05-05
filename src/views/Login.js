import React, {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { Button, MuiThemeProvider, Grid } from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette:{
    primary: {
      main: '#ff4400'
    },
  },
  overrides: {

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

const Login = () => {
  
  const [toggle, setToggle] = useState(true);
  const showHide = () => {
    setToggle(!toggle);
  }
  return (
    <MuiThemeProvider theme={theme}>
    <>
    {toggle?
      <LoginForm/> :
      <RegisterForm/>
    }
    <Grid>
    <Button onClick={showHide}>{toggle ? 'or register' : 'or login'}</Button>
    </Grid>
    </>
    </MuiThemeProvider>
  );
};

export default Login;