import React from 'react';
import {Typography, Button, MuiThemeProvider,Grid} from '@material-ui/core';
import MyTable from '../components/MyTable';
import {Link as RouterLink} from 'react-router-dom';
import Nav from '../components/Nav';
import {createMuiTheme} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core';
import AdminVikaTable from '../components/AdminVikaTable';

const theme = createMuiTheme({
  palette:{
    primary: {
      main: '#DF7861'
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
        marginBottom:'1rem',
      }

    }
  }
});

const useStyles = makeStyles((theme) => ({
    regButton: {
      marginTop:'1rem',
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: '#ECB390',
    },
  }));



const AdminVika = () => {
    const classes = useStyles();
    return (
        <>
        <MuiThemeProvider theme={theme}>
        <Nav/>
            <Typography
                variant="h2"
                gutterBottom>Vikailmoitukset
            </Typography>

            <AdminVikaTable />
            </MuiThemeProvider>
        </>
    );
};

export default AdminVika;