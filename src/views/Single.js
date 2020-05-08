import React from 'react';
import PropTypes from 'prop-types';
import { useSingleMedia } from '../hooks/ApiHooks';
import { Typography, Paper, Button, makeStyles } from '@material-ui/core';
import BackButton from '../components/BackButton';
import Media from '../components/Media';
import Comment from '../components/Comments';
import CommentForm from '../components/CommentForm';
import Nav from '../components/Nav';
import { TextValidator } from 'react-material-ui-form-validator';


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
 



const Single = ({ match }) => {
  const classes = useStyles();
  console.log('matchjustsingle', match.params.id);
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

  return (
    <div className={classes.root}>
      {file !== null &&
        <>
          <Nav />
          <BackButton />
          <Typography
            variant="h3"
            align="center"
            gutterBottom>{file.title}
          </Typography>

          <Typography
            variant="h5"
            align="left"
            gutterBottom
            style={{width:'70%',margin: 'auto'}}
            >
            Ilmoituksen tiedot:
              <Typography align="left"variant="h6" style={{margin: 'auto',marginBottom: '1rem'}}>
              {description}
                </Typography>
            
          </Typography>
            {description &&
              <img src={thumb} className={classes.img} />
            }
          {file.user.username !== 'tjnadmin' &&
            <Typography
              component="h5"
              variant="h5"
              align="center"
              gutterBottom>
              Tekijä: {file.user.username}
            </Typography>
          }



        </>
      }
    </div>
  );
};

Single.propTypes = {
  match: PropTypes.object,
};


export default Single;