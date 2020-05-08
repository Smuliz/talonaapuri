import React, {useContext, useEffect} from 'react';
import {Link as RouterLink} from 'react-router-dom';
import {checkToken} from '../hooks/ApiHooks';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import {MediaContext} from '../contexts/MediaContext';
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Typography,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import FaceIcon from '@material-ui/icons/Face';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ApartmentIcon from '@material-ui/icons/Apartment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import { red } from '@material-ui/core/colors';
import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette:{
    primary: {
      main: '#DF7861'
    },
  },
  overrides: {
    MuiDrawer:{
      paper:{
        backgroundColor: '#ECDFC8',
      },
    },
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
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  palette:{
    primary: red,
  },
  
}));

const Nav = ({history}) => {
  const classes = useStyles();
  const [user, setUser] = useContext(MediaContext);
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (opener) => () => {
    setOpen(opener);
  };

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userdata = await checkToken(localStorage.getItem('token'));
        console.log(userdata);
        setUser(userdata);
      } catch (e) {
        // send to login
        history.push('/');
      }
    };

    checkUser();
  }, [history, setUser]);

  
console.log("USER",user);
  return (
    <>
    <MuiThemeProvider theme={theme}>
      <AppBar color="primary">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon/>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Naapurusto
          </Typography>
          {user !== null &&
            <Button
              color="inherit"
              startIcon={<ExitToAppIcon/>}
              component={RouterLink}
              to="/logout"
              >
                Kirjaudu ulos
              </Button>
          }
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <List>
          
          {user !== null &&
          <>
          <ListItem
            button
            component={RouterLink}
            onClick={toggleDrawer(false)}
            to="/home"
          >
            <ListItemIcon>
              <NotificationsIcon/>
            </ListItemIcon>
            <ListItemText primary="Ilmoitukset"/>
          </ListItem>
              <ListItem
            button
            component={RouterLink}
            onClick={toggleDrawer(false)}
            to="/naapurustofeed"
          >
            <ListItemIcon>
              <ApartmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Naapurusto"/>
          </ListItem>
          <ListItem
              button
              component={RouterLink}
              onClick={toggleDrawer(false)}
              to="/myfiles"
              >
                <ListItemIcon>
                <NewReleasesIcon/>
                </ListItemIcon>
                <ListItemText primary="Vikailmoitukset"/>
              </ListItem>
            <ListItem
              button
              component={RouterLink}
              onClick={toggleDrawer(false)}
              to="/profile"
              >
                <ListItemIcon>
                <FaceIcon/>
                </ListItemIcon>
                <ListItemText primary="Profiili" />
            </ListItem>
            {user.user_id === 574 &&
            <ListItem
            button
            component={RouterLink}
            onClick={toggleDrawer(false)}
            to="/admin"
            >
              <ListItemIcon>
                <SupervisorAccountIcon/>
              </ListItemIcon>
              <ListItemText primary="Järjestelmänvalvoja" />
            </ListItem>
            }
              </>
          }
        </List>
      </Drawer>
      </MuiThemeProvider>
    </>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
};



export default withRouter(Nav);