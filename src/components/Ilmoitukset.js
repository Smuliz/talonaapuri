import React, {useContext} from 'react';
import {useAllMedia} from '../hooks/ApiHooks';
import {
  GridList,
  GridListTile,
  ListSubheader,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import {MediaContext} from '../contexts/MediaContext';
import MediaRow from '../components/MediaRow';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
      height: '100%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
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
        <div className={classes.root}>
            <GridList
            cellHeight={180}
            className={classes.gridList}
            cols={matches ? 3 : 2}>
                <GridListTile key="Subheader" cols={3} style={{height: 'auto'}}>
                    <ListSubheader component="div">Ilmoitukset</ListSubheader>
                </GridListTile>
                {
                    picArray.map((file) => 
                        <GridListTile key={file.file_id}>
                        <MediaRow file={file} />
                        
                        </GridListTile>
                    )
                }
            </GridList>
        </div>
    </>
    );
};

// <Typography file.description /> <-- Miten tän saa toimimaan?

export default IlmoitusTable;


