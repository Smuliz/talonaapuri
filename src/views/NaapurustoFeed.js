import React from 'react';
import { Typography, Button, MuiThemeProvider } from '@material-ui/core';
import FeediTable from '../components/FeediTable';
import { Link as RouterLink } from 'react-router-dom';
import Nav from '../components/Nav';
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
                marginBottom: '1rem',
                marginLeft: '1rem',
            }

        }
    }
});


const NaapurustoFeed = () => {

    return (
        <>
            <Nav />
            <MuiThemeProvider theme={theme}>
                <Typography
                    component="h1"
                    variant="h2"
                    gutterBottom>Naapurusto
            </Typography>
                <Typography
                    component="p"
                    variant="p"
                    gutterBottom>Ole yhteydessä naapureihisi, asiassa kuin asiassa!
            </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/uploadnewfeed"
                >
                    Tee Päivitys
            </Button>
                <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/myfeeds"
                >
                    Omat Päivitykset
            </Button>
                <FeediTable />
            </MuiThemeProvider>
        </>
    );
};

export default NaapurustoFeed;