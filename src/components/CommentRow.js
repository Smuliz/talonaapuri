import React from 'react';
import PropTypes from 'prop-types';
import {Link as RouterLink} from 'react-router-dom';
import {
  GridListTileBar,
  IconButton,
  makeStyles,
} from '@material-ui/core';
import PageviewIcon from '@material-ui/icons/Pageview';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import {deleteFile} from '../hooks/ApiHooks';
import {getUser} from '../hooks/ApiHooks';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const CommentRow = async ({comments}) => {
    const user = await getUser(comments.user_id);
    console.log("COMMENT ROW",user.username, comments.comment);
    
  return (
    <>
      <GridListTileBar
        username={user.username}
        comment={comments.comment}
      />
    </>);
};

CommentRow.propTypes = {
};

export default CommentRow;