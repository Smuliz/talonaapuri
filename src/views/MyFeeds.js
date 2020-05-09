import React from 'react';
import {Typography, MuiThemeProvider} from '@material-ui/core';
import MyNaapurustoFeeds from '../components/MyNaapurustoFeeds';
import Nav from '../components/Nav';
import BackButton from '../components/BackButton';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#DF7861'
      },
    },
    overrides: {
  
      MuiGrid: {
        root: {
          marginTop: '2rem',
          display: 'flex',
          textAlign: 'left',
        }
      },
  
      MuiButton: {
        containedPrimary: {
          marginTop: '1rem',
          backgroundColor: "#DF7861",
          width: '60%',
          maxWidth: '12rem',
          marginBottom: '1rem',
        }
  
      }
    }
  });

const MyFeeds = () => {
    return (
        <>
        <Nav/>
        <MuiThemeProvider theme={theme}>
            <BackButton/>
            <Typography
                component="h1"
                variant="h2"
                gutterBottom>Omat Päivitykset
            </Typography>
            <Typography
                component="p"
                variant="p"
                gutterBottom>Tarkastele, Muokkaa tai Poista Päivityksiäsi
            </Typography>
            <MyNaapurustoFeeds/>
            </MuiThemeProvider>
        </>
    );
};

export default MyFeeds;