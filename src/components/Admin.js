import React, {useContext} from 'react';
import MediaRowIlmoitukset from './MediaRowIlmoitukset';
import {useAllMedia} from '../hooks/ApiHooks';
import {
  GridList,
  GridListTile,
  ListSubheader,
  makeStyles,
  useMediaQuery,
} from '@material-ui/core';
import {MediaContext} from '../contexts/MediaContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "#ECB390",
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const AdminTable = () => {
  const [user] = useContext(MediaContext);
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:697px)');

  const picArray = useAllMedia('ilmoitukset');
  console.log(picArray);
  let newPicArray = [];
  if (picArray.length > 0 && user !== null) {
    newPicArray = picArray.filter((pic) => pic.user_id === user.user_id);
  }
  

  return (
    <div className={classes.root}>
    
        <GridList
          cellHeight={180}
          className={classes.gridList}
          cols={1}>
          <GridListTile key="Subheader" cols={1} style={{height: 'auto'}}>
            <ListSubheader component="div">Kaikki Taloyhtiön ilmoitukset</ListSubheader>
          </GridListTile>
          {
            newPicArray.map((file) =>
              <GridListTile key={file.file_id}>
                <MediaRowIlmoitukset file={file} myfiles={true} />
              </GridListTile>)
          }
        </GridList>
      
    </div>
  );
};

export default AdminTable;