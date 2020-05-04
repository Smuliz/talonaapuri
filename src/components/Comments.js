import React, {useContext} from 'react';
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
} from '@material-ui/core';
import {MediaContext} from '../contexts/MediaContext';




// seuraava funktio ei toimi asynccisenä.
const Comment = async (id) => {
    const funktio = async () => {
    try {
        const comments = await getComments(id);
        return comments;
    } catch (e) {
        throw new Error(e.message);
    }
};
const comments = await getComments(id);
    // const classes = useStyles();
    // const matches = useMediaQuery('(min-width:697px)');
    console.log("OLEN KOMMENTTEJA",comments);
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0MzAsInVzZXJuYW1lIjoic2FtdWxpIiwiZW1haWwiOiJzYW11bGkubGluZHJvb3NAbWV0cm9wb2xpYS5maSIsImZ1bGxfbmFtZSI6bnVsbCwiaXNfYWRtaW4iOm51bGwsInRpbWVfY3JlYXRlZCI6IjIwMjAtMDMtMThUMTM6NTc6MjcuMDAwWiIsImlhdCI6MTU4NzQwMDIyMCwiZXhwIjoxNTg5NDczODIwfQ.MdG-NKWDOxSP3Pgi_EV10PclxWmvy8e7xWvEOPfDzoE";

    // const commentLoop = async (comments, token) => {
    //     let i = 0;
    //     let user = [];
    //     while (comments.length > i) {
    //        const user = await getUser(comments[i].user_id, token);
    //        console.log("TÄÄLLÄT",user.username);
    //        i++;
    //     }
    // }
    // commentLoop(comments, token);
    const pituus = comments.length;
    console.log("aiushfdkusdfh",pituus);
    return(
        <>
        {pituus > 0 &&
            <Grid item>
              <TextField>
            {
            comments.map((comment) =>
              <GridListTile key={comment.comment_id}>
                <CommentRow comment={comment}  />
              </GridListTile>)
            }
              </TextField>
            </Grid>
          }
        </>
    )
}

export default Comment;
    