import React from 'react';
import MediaRowNaapurusto from './MediaRowNaapurusto';
import {useAllMedia} from '../hooks/ApiHooks';
import {
  GridList,
  GridListTile,
  ListSubheader,
  makeStyles,
  useMediaQuery,
  MuiThemeProvider,
} from '@material-ui/core';
import {createMuiTheme} from '@material-ui/core/styles';
//import {MediaContext} from '../contexts/MediaContext';

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
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: '#ECB390',
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  korkeus: {
    marginBottom: '1rem',
  },
}));

const FeediTable = () => {
  // [user] = useContext(MediaContext);
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const picArray = useAllMedia('NaapurustoFeedi');
  console.log(picArray);

  /*let newPicArray = [];
  if (picArray.length > 0 && user !== null) {
    newPicArray = picArray.filter((pic) => pic.user_id === user.user_id);
  }
  */
  

  return (
    <div className={classes.root}>
    <MuiThemeProvider theme={theme}>
        <GridList
          cellHeight={220}
          className={classes.gridList}
          cols={1}>
          <GridListTile key="Subheader" cols={1} style={{height: 'auto'}}>
            <ListSubheader component="div">Kaikki Päivitykset</ListSubheader>
          </GridListTile>
          {
            picArray.map((file) =>
              <GridListTile key={file.file_id} className={classes.korkeus}>
                <MediaRowNaapurusto file={file} myfiles={true} />
              </GridListTile>)
          }
        </GridList>
        </MuiThemeProvider>
    </div>
  );
};

export default FeediTable;