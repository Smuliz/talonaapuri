import React from 'react';
import {Typography, Button, MuiThemeProvider,Grid} from '@material-ui/core';
import MyTable from '../components/MyTable';
import {Link as RouterLink} from 'react-router-dom';
import Nav from '../components/Nav';
import {createMuiTheme} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core';

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
        marginBottom:'1rem',
      }

    }
  }
});

const useStyles = makeStyles((theme) => ({
    regButton: {
      marginTop:'1rem',
    },
  }));



const MyFiles = () => {
    return (
        <>
        <MuiThemeProvider theme={theme}>
        <Nav/>
            <Typography
                component="h1"
                variant="h2"
                gutterBottom>Vikailmoituket
            </Typography>
            <Typography
                component="p"
                variant="p"
                gutterBottom>Lorem impus knvnwinvqiwnopn nqwnjqen neqöjbjeb jqfjqbejbö bqöjbq bqnö jbjöqb be qöbjevbrkrenbinir.
            </Typography>
            <Grid item>
            <Button
            variant="contained"
            color="primary"
            component={RouterLink}
            to="/upload"
            >
                Tee vikailmoitus.
            </Button>
            </Grid>
            <MyTable />
            </MuiThemeProvider>
        </>
    );
};

export default MyFiles;