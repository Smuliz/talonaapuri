import React from 'react';
import PropTypes from 'prop-types';
import {useSingleMedia} from '../hooks/ApiHooks';
import {Typography, Paper, Button} from '@material-ui/core';
import BackButton from '../components/BackButton';
import Media from '../components/Media';
import Comment from '../components/Comments';
import CommentForm from '../components/CommentForm';
import Nav from '../components/Nav';
import { TextValidator} from 'react-material-ui-form-validator';



const Single = ({match}) => {
  console.log('match', match.params.id);
  const file = useSingleMedia(match.params.id);
  console.log('file', file);
  let description = undefined;
  if (file !== null) {
    description = (JSON.parse(file.description));
  }

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
            {description.desc}
          </Typography>
          <Paper>
            {description &&
              <Media file={file} description={description} />
            }
          </Paper>

          
    
        </>
      }
    </>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};


export default Single;