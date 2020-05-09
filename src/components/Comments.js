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
  MuiThemeProvider,
} from '@material-ui/core';
import {MediaContext} from '../contexts/MediaContext';
import {createMuiTheme} from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette:{
    primary: {
      main: '#DF7861'
    },
  },
  overrides: {

    MuiGrid:{
      root:{
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
        marginBottom:'1rem',
      }

    }
  }
});


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
    backgroundColor: '#ECB390',
  },
  gridList: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ECB390',
  },

  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  korkeus: {
    marginBottom: '1rem',
  },
}));

// seuraava funktio ei toimi asynccisenä.
const Comment = (id) => {
  const classes = useStyles();
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
      <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
      <GridList
          cellHeight={200}
          className={classes.gridList}
          cols={1}>
        {pituus > 0 &&
                        
                      
                      kommentit.map((comment) =>
                        <GridListTile key={comment.comment_id}>
                          <CommentRow comment={comment}  />
                        </GridListTile>)
                      
                      
        }
        </GridList>
        </MuiThemeProvider>
    </div>
    )
}

export default Comment;
    