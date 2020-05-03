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
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
            Talo Ja Naapuri
          </Typography>
          {user !== null &&
            <Button
              color="inherit"
              startIcon={<ExitToAppIcon/>}
              component={RouterLink}
              to="/logout"
              >
                Logout
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
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Home"/>
          </ListItem>
            <ListItem
              button
              component={RouterLink}
              onClick={toggleDrawer(false)}
              to="/myfiles"
              >
                <ListItemIcon>
                <AccountBoxIcon/>
                </ListItemIcon>
                <ListItemText primary="Vikailmoitus"/>
              </ListItem>
            <ListItem
              button
              component={RouterLink}
              onClick={toggleDrawer(false)}
              to="/profile"
              >
                <ListItemIcon>
                <AccountBoxIcon />
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
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Taloyhtiön ilmoitukset" />
            </ListItem>
            }
              </>
          }
        </List>
      </Drawer>
    </>
  );
};

Nav.propTypes = {
  history: PropTypes.object,
};



export default withRouter(Nav);