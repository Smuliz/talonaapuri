import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  GridListTileBar,
  IconButton,
  makeStyles,
  MuiThemeProvider,
  Grid,
} from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import { CreateIcon, classes } from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { MediaContext } from '../contexts/MediaContext';
import { createMuiTheme } from '@material-ui/core/styles';
import { deleteFile, deleteComment, getComments, getUser, getAvatarImage, useSingleMedia } from '../hooks/ApiHooks';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/';
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 0,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
  },
  poisto: {
  marginBottom: '2rem',
  },
  wrap: {
  overflowWrap: "anywhere",
  },
}));

const CommentRow = ({ comment }) => {
  const kommentinpoisto = useContext(MediaContext);
  const classes = useStyles();
  const [user, setUser] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const token = localStorage.getItem('token');
  useEffect(() => {
    const haeKommentit = async (comment) => {
      try {
        const kayttaja = await getUser(comment.user_id, token);
        console.log("useriii", kayttaja);
        setUser(kayttaja);
        const avatari = await getAvatarImage(comment.user_id);
        console.log("AVATARI123123", avatari)
        const response = await fetch(baseUrl + 'media/' + avatari.pop().file_id);
        const kuva = await response.json();
        setAvatar(kuva);

      } catch (e) {
        throw new Error(e.message);
      }
    }


    haeKommentit(comment);
  }, []);
  console.log("commentrow USER", user)
  console.log("COMMENT ROW", comment);
  console.log("kommentinpoisto", kommentinpoisto[0].user_id)
  // console.log("AVATAAAR",avatar);








  return (
    <>
      <div>
        <MuiThemeProvider theme={theme}>
          <Grid container >
            <Grid item>
              <p>
               
                <Grid item xs={2} md={4} >
                  {avatar !== null &&
                    <img
                      className={classes.img}
                      src={mediaUrl + avatar.thumbnails.w160}
                    />
                  }
                </Grid>
                <Grid item>
                  {user.username}
                </Grid>
              </p>
            </Grid>
            
              <Grid item xs={9} md={7}  >
                <div className={classes.wrap}>
                kommentti: {<br/>} {comment.comment}
                </div>
              </Grid>
              
              {kommentinpoisto[0].user_id === comment.user_id && kommentinpoisto[0].user_id !== 574 &&
                <Grid item xs={1} md={1}  >
                  <IconButton
                  className={classes.poisto}
                    aria-label={`Delete file`}
                    onClick={() => {
                      const delOK = window.confirm('Do you really want to delete?');
                      if (delOK) {
                        deleteComment(comment.comment_id);
                      }
                    }}

                  >
                    <DeleteIcon fontSize="large" />
                  </IconButton>
                </Grid>
              }
            
            {kommentinpoisto[0].user_id === 574 &&
              <IconButton
              className={classes.poisto}
                aria-label={`Delete file`}
                onClick={() => {
                  const delOK = window.confirm('Do you really want to delete?');
                  if (delOK) {
                    deleteComment(comment.comment_id);
                  }
                }}

              >
                <DeleteIcon fontSize="large" />
              </IconButton>
            }
            
          </Grid>
        </MuiThemeProvider>
      </div>
    </>);
};

CommentRow.propTypes = {
};

export default CommentRow;