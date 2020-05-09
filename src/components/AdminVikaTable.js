import React, {useContext} from 'react';
import MediaRow from './MediaRow';
import {useAllMedia} from '../hooks/ApiHooks';
import {
  GridList,
  GridListTile,
  ListSubheader,
  makeStyles,
  useMediaQuery,
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

const AdminVikaTable = () => {
  const [user] = useContext(MediaContext);
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const picArray = useAllMedia('vikailmoitus');
  console.log(picArray);
  let newPicArray = [];
  if (picArray.length > 0 && user.user_id === 574) {
    newPicArray = picArray;
  }
  

  return (
    <div className={classes.root}>
    <MuiThemeProvider theme={theme}>
        <GridList
          cellHeight={220}
          className={classes.gridList}
          cols={1}>
          <GridListTile key="Subheader" cols={1} style={{height: 'auto'}}>
            <ListSubheader component="div">Kaikki Vikailmoitukset</ListSubheader>
          </GridListTile>
          {
            newPicArray.map((file) =>
              <GridListTile key={file.file_id} className={classes.korkeus}>
                <MediaRow file={file} myfiles={true} />
              </GridListTile>)
          }
        </GridList>
        </MuiThemeProvider>
    </div>
  );
};

export default AdminVikaTable;