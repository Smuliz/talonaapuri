import React, {useContext} from 'react';
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
import MediaRowIlmoitukset from '../components/MediaRowIlmoitukset';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#DF7861'
    },
  },
  overrides: {

      


    MuiGrid: {
      root: {
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
        marginBottom: '1rem',
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
      backgroundColor: '#ECB390',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    korkeus: {
      backgroundColor: "yellow",
    },
  }));

const IlmoitusTable = () => {
    const [user] = useContext(MediaContext);
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:697px)');
  
    const picArray = useAllMedia('ilmoitukset');
    console.log('Ilmoitustable', picArray);


return (
    <>
    <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
            <GridList
            cellHeight={"400"}
            className={classes.gridList}
            cols={1}
            spacing={2}>

                {
                    picArray.map((file) => 
                        <GridListTile key={file.file_id}>
                        <MediaRowIlmoitukset file={file} style={{height:'400px'}}/>
                        
                        </GridListTile>
                    )
                }
            </GridList>
        </div>
        </MuiThemeProvider>
    </>
    );
};

// <Typography file.description /> <-- Miten tän saa toimimaan?

export default IlmoitusTable;


