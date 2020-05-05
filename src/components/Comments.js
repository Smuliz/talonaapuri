import React, {useContext, useState, useEffect} from 'react';
import CommentRow from '../components/CommentRow';
import {getComments, getUser} from '../hooks/ApiHooks';
import {
  GridList,
  GridListTile,
  ListSubheader,
  makeStyles,
  useMediaQuery,
  Grid,
  TextField,
  Container,
} from '@material-ui/core';
import {MediaContext} from '../contexts/MediaContext';




// seuraava funktio ei toimi asynccisenä.
const Comment = (id) => {
  const [kommentit, setKommentit] = useState([]);

useEffect(() => {
  const haeKommentit = async (id) => {
    try {
        const comments = await getComments(id);
        setKommentit(comments);
    } catch (e) {
        throw new Error(e.message);
    }
  };

  haeKommentit(id);

}, []);

   
    // <CommentRow comments={kommentit[0]}/>
    const pituus = kommentit.length;
    console.log("aiushfdkusdfh",pituus);
    return(
        <>
        {pituus > 0 &&
                        <Grid item>
                      {
                      kommentit.map((comment) =>
                        <Container key={comment.comment_id}>
                          <CommentRow comment={comment}  />
                        </Container>)
                      }
                      </Grid>
        }
        </>
    )
}

export default Comment;
    