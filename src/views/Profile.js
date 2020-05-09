import React, { useContext, useState, useEffect } from 'react';
import { MediaContext } from '../contexts/MediaContext';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import { getAvatarImage } from '../hooks/ApiHooks';
import ProfileForm from '../components/ProfileForm';
import Nav from '../components/Nav';
import {createMuiTheme} from '@material-ui/core/styles';


const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

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
  root: {
    flexGrow: 1,
    padding:0,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '50%',
    marginTop: '3rem',
  },

}));


const Profile = () => {
  const classes = useStyles();
  const [user] = useContext(MediaContext);
  const [avatar, setAvatar] = useState([]);
  useEffect(() => {
    (async () => {
      if (user !== null) {
        setAvatar(await getAvatarImage(user.user_id));
      }
    })();
  }, [user]);

  return (
    <>
      <Nav />
      <MuiThemeProvider theme={theme}>
        <Typography
          component="h1"
          variant="h2"
          gutterBottom>Profiili</Typography>
        {user !== null &&
          <Card style={{ backgroundColor: '#ECDFC8' }}>
            {avatar.length > 0 &&
              <CardMedia
              className={classes.img}
                component="img"
                image={mediaUrl + avatar.pop().filename}
                alt="Avatar image"
                title="Avatar image"
              />
            }

            <CardContent>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <AccountBoxIcon />
                  </ListItemIcon>
                  <ListItemText primary= {user.username}/>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.email} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary={user.full_name} />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        }
        <ProfileForm />
      </MuiThemeProvider>
    </>
  );
};

export default Profile;