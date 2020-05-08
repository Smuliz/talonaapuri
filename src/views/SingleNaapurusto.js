import React from 'react';
import PropTypes from 'prop-types';
import {useSingleMedia} from '../hooks/ApiHooks';
import {Typography, Paper, Button, makeStyles} from '@material-ui/core';
import BackButton from '../components/BackButton';
import Media from '../components/Media';
import Comment from '../components/Comments';
import CommentForm from '../components/CommentForm';
import Nav from '../components/Nav';
import { TextValidator} from 'react-material-ui-form-validator';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

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
          <BackButton />
          <Typography
            component="h1"
            variant="h2"
            gutterBottom>{file.title}</Typography>
            {file.user.username !== 'tjnadmin' &&
          <Typography
            component="h5"
            variant="h5"
            gutterBottom>
            {file.user.username}
          </Typography>
          }
          <Typography
            component="p"
            variant="caption"
            gutterBottom>
            {description}
          </Typography>
          {description &&
              <img src={thumb} className={classes.img} />
            }

          <>
          <Comment id={file.file_id} />
          <CommentForm id={file.file_id} />
          </>
   
          
    
        </>
      }
    </>
  );
};

SingleNaapurusto.propTypes = {
  match: PropTypes.object,
};


export default SingleNaapurusto;