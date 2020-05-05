import React, {useContext} from 'react';
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
import { MediaContext } from '../contexts/MediaContext';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const MediaRowNaapurusto = ({file, myfiles}) => {
    const kommentinpoisto = useContext(MediaContext);

const description = "hei";
  const classes = useStyles();
  let thumb = 'http://placekitten.com/200/300';
  if (file.thumbnails) {
    thumb = mediaUrl + file.thumbnails.w320;
  }
  console.log("FILUUUU", file);
  return (
    <>
      <img
        src={thumb}
        alt={file.title}
      />
      <GridListTileBar
        title={file.title}
        subtitle={myfiles ? '' : description.desc}
        actionIcon={
          <>
            <IconButton
              aria-label={`info about ${file.title}`}
              component={RouterLink}
              to={'/singlenaapurusto/' + file.file_id}
              className={classes.icon}
            >
              <PageviewIcon fontSize="large" />
            </IconButton>
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
      />
    </>);
};

MediaRowNaapurusto.propTypes = {
  file: PropTypes.object,
  myfiles: PropTypes.bool,
};

export default MediaRowNaapurusto;