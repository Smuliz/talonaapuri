import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import {
  GridListTileBar,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import { CreateIcon, classes } from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { MediaContext } from '../contexts/MediaContext';
import { deleteFile, deleteComment, getComments, getUser, getAvatarImage, useSingleMedia } from '../hooks/ApiHooks';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const CommentRow = ({ comment }) => {
  const kommentinpoisto = useContext(MediaContext);
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
        <p>
          {avatar !== null &&
            <img
              src={mediaUrl + avatar.thumbnails.w160}
            />
          }
          {user.username}
         :
        {comment.comment}
        </p>
        {kommentinpoisto[0].user_id === comment.user_id && kommentinpoisto[0].user_id !== 574 &&
          <IconButton
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
        {kommentinpoisto[0].user_id === 574 &&
          <IconButton
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

      </div>
    </>);
};

CommentRow.propTypes = {
};

export default CommentRow;