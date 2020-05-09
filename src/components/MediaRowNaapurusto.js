import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import {
  GridListTileBar,
  IconButton,
  makeStyles,
  MuiThemeProvider,
  Grid,
  Typography,
  ButtonBase,
  Paper,
} from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import {deleteFile} from '../hooks/ApiHooks';
import { MediaContext } from '../contexts/MediaContext';
import { createMuiTheme } from '@material-ui/core/styles';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

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
      }

    }
  }
});

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: '100%',
    backgroundColor: '#ECDFC8',
  },
  icon: {
    color: '#DF7861',
    marginBottom: '2rem',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '75%',
    minWidth: '60%',
  },
  image: {
    display: 'block',
    width: '100%',
    marginBottom: '1rem',
    minWidth: '60%',
    maxHeight:'220px',
  },
  desc: {
    maxWidth: '15rem',
    overflow:'hidden',
    maxHeight:'3rem'
  },
  ecli: {
    maxWidth: '15rem',
    maxHeight:'5rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

const MediaRowNaapurusto = ({file, myfiles}) => {
    const kommentinpoisto = useContext(MediaContext);

const description = file.description;
  const classes = useStyles();
  let thumb = 'http://placekitten.com/200/300';
  if (file.thumbnails) {
    thumb = mediaUrl + file.thumbnails.w320;
  }
  console.log("FILUUUU", file);
  return (
    <>
    <MuiThemeProvider theme={theme}>
    <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid item>
              <Grid item>
                <ButtonBase className={classes.image} xs={6}>
                  <img
                    className={classes.img}
                    src={thumb}
                    alt={file.title}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs sm container>
                <Grid item  container direction="column" spacing={2} xs>
                  <Grid item xs >
                    <Typography gutterBottom variant="subtitle1" className={classes.desc}>
                      {file.title}
                    </Typography>
                  </Grid>
                  <Grid item xs >
                    <Typography gutterBottom variant="subtitle1" className={classes.ecli}>
                      {description}
                    </Typography>
                  </Grid>
                  <Grid item xs >
                    <IconButton
                      aria-label={`info about ${file.title}`}
                      component={RouterLink}
                      to={'/singlenaapurusto/' + file.file_id}
                      className={classes.icon}
                    >
                      <PageviewIcon fontSize="large" />
                    </IconButton>
                    {myfiles && kommentinpoisto[0].user_id === file.user_id && kommentinpoisto[0].user_id !== 574 &&
                    <>
                    <IconButton
                      aria-label={`Modify file`}
                      component={RouterLink}
                      to={'/modifynaapurusto/' + file.file_id}
                      className={classes.icon}
                    >
                      <CreateIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      aria-label={`Delete file`}
                      onClick={() => {
                        const delOK = window.confirm('Do you really want to delete?');
                        if (delOK) {
                          deleteFile(file.file_id);
                          window.location.href="naapurustofeed/";
                        }
                      }}
                      className={classes.icon}
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                    </>
                    }
                    {myfiles && kommentinpoisto[0].user_id === 574 &&
                    <>
                    <IconButton
                      aria-label={`Modify file`}
                      component={RouterLink}
                      to={'/modifynaapurusto/' + file.file_id}
                      className={classes.icon}
                    >
                      <CreateIcon fontSize="large" />
                    </IconButton>
                    <IconButton
                      aria-label={`Delete file`}
                      onClick={() => {
                        const delOK = window.confirm('Do you really want to delete?');
                        if (delOK) {
                          deleteFile(file.file_id);
                          window.location.href="naapurustofeed/";
                        }
                      }}
                      className={classes.icon}
                    >
                      <DeleteIcon fontSize="large" />
                    </IconButton>
                    </>
                    }
                  </Grid>
                  
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      </MuiThemeProvider>
    </>);
};

MediaRowNaapurusto.propTypes = {
  file: PropTypes.object,
  myfiles: PropTypes.bool,
};

export default MediaRowNaapurusto;