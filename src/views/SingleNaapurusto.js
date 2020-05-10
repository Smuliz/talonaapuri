import React from 'react';
import PropTypes from 'prop-types';
import {useSingleMedia} from '../hooks/ApiHooks';
import {Typography, Paper, Button, makeStyles, MuiThemeProvider,} from '@material-ui/core';
import BackButton from '../components/BackButton';
import Media from '../components/Media';
import Comment from '../components/Comments';
import CommentForm from '../components/CommentForm';
import Nav from '../components/Nav';
import { TextValidator} from 'react-material-ui-form-validator';
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
    padding:0,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '80%',
  }
}));

const SingleNaapurusto = ({ match }) => {
  const classes = useStyles();
  console.log('matchsinglenaapurusto', match.params.id);
  const file = useSingleMedia(match.params.id);
  console.log('file', file);
  let description = undefined;
  if (file !== null) {
    description = file.description;
  }
  let thumb = 'http://placekitten.com/200/300';
  if (file !== null) {
    thumb = mediaUrl + file.thumbnails.w640;
  }
  console.log("singlenaaapurustofile",file);

  return (
    <>
      {file !== null &&
        <>
        <Nav/>
        <MuiThemeProvider theme={theme}>
          <BackButton />
          <Typography
            component="h1"
            variant="h2"
            gutterBottom>{file.title}</Typography>
            
          {description &&
              <img src={thumb} className={classes.img} />
            }
            <Typography
            variant="subtitle1"
            gutterBottom>
            {description}
          </Typography>
            {file.user.username !== 'tjnadmin' &&
          <Typography
            component="h5"
            variant="h5"
            gutterBottom>
            Tekijä: {file.user.username}
          </Typography>
          }

          <>
          <Comment id={file.file_id} />
          <CommentForm id={file.file_id} />
          </>
   
          
          </MuiThemeProvider>
        </>
      }
    </>
  );
};

SingleNaapurusto.propTypes = {
  match: PropTypes.object,
};


export default SingleNaapurusto;