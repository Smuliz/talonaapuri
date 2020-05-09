import React, { useContext } from 'react';
import {Typography, Button, makeStyles, MuiThemeProvider, Grid} from '@material-ui/core';
import AdminTable from '../components/Admin';
import {Link as RouterLink} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import Nav from '../components/Nav';
import {createMuiTheme} from '@material-ui/core/styles';


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
          maxWidth: '15rem',
          marginBottom:'1rem',
          marginLeft: '1rem',
        }
  
      }
    }
  });

const AdminIlmoitukset = ({history}) => {
    const [user] = useContext(MediaContext);
    if (user !== null) {
    if (user.user_id !== 574) {
        history.push('/home');
    }
};
    return (
        <>
        <MuiThemeProvider theme={theme}>
        <Nav/>
            <Typography
                component="h1"
                variant="h2"
                gutterBottom>Taloyhtiön ilmoitukset
            </Typography>
            <Typography
                component="p"
                variant="p"
                gutterBottom>Voit luoda ilmoituksia kaikkien käyttäjien nähtäville kotisivulle.
            </Typography>
            <Grid item>
            <Button
            align="center"
            color="primary"
            component={RouterLink}
            to="/uploadilmoitus"
            variant="contained"
            >
            Tee taloyhtiön ilmoitus
            </Button>
            <Button
            align="center"
            color="primary"
            component={RouterLink}
            to="/adminvika"
            variant="contained"
            >
            Kaikki Vikailmoitukset
            </Button>
            </Grid>
            <AdminTable />
            </MuiThemeProvider>
        </>
    );
};

export default AdminIlmoitukset;