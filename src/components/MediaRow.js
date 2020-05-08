import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  Paper,
  Grid,
  ButtonBase,
  GridListTileBar,
  IconButton,
  makeStyles,
  MuiThemeProvider,
  Typography,
} from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteFile } from '../hooks/ApiHooks';
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
}));


/*actionIcon={
  <>
    <IconButton
      aria-label={`info about ${file.title}`}
      component={RouterLink}
      to={'/single/' + file.file_id}
      className={classes.icon}
    >
      <PageviewIcon fontSize="large" />
    </IconButton>
    {myfiles &&
      <>
        <IconButton
          aria-label={`Modify file`}
          component={RouterLink}
          to={'/modify/' + file.file_id}
          className={classes.icon}
        >
          <CreateIcon fontSize="large" />
        </IconButton>
        <IconButton
          aria-label={`Delete file`}
          onClick={() => {
            const delOK = window.confirm('Do you reallu want to delete?');
            if (delOK) {
              deleteFile(file.file_id);
            }
          }}
          className={classes.icon}
        >
          <DeleteIcon fontSize="large" />
        </IconButton>
      </>
    }
  </>
}
>
*/



const MediaRow = ({ file, myfiles }) => {
  const description = file.description;
  const classes = useStyles();
  let thumb = 'http://placekitten.com/200/300';
  if (file.thumbnails) {
    thumb = mediaUrl + file.thumbnails.w320;
  }
  console.log("FILUUUU MediaRow", file);
  return (
    <>

      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid item>
              <Grid item>
                <ButtonBase className={classes.image}>
                  <img
                    className={classes.img}
                    src={thumb}
                    alt={file.title}
                  />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs >
                    <Typography gutterBottom variant="subtitle1">
                      {file.title}
                    </Typography>
                  </Grid>
                  <Grid item xs >
                    <Typography gutterBottom variant="subtitle1">
                      {description}
                    </Typography>
                  </Grid>
                  <Grid item xs >
                    <IconButton
                      aria-label={`info about ${file.title}`}
                      component={RouterLink}
                      to={'/single/' + file.file_id}
                      className={classes.icon}
                    >
                      <PageviewIcon fontSize="large" />
                    </IconButton>
                    {myfiles &&
                    <>
                    <IconButton
                      aria-label={`Modify file`}
                      component={RouterLink}
                      to={'/modify/' + file.file_id}
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
                          window.location.href="myfiles/";
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

MediaRow.propTypes = {
  file: PropTypes.object,
  myfiles: PropTypes.bool,
};

export default MediaRow;