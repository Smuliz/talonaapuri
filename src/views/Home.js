import React from 'react';
import Nav from '../components/Nav';
import { Typography } from '@material-ui/core';
import IlmoitusTable from '../components/Ilmoitukset';

const Home = () => {
  return (
      <>
      <Nav />
        <Typography
          component="h1"
          vvariant="h2"
          gutterBottom>Ilmoitukset
        </Typography>
        <IlmoitusTable />
      </>
  );
};

export default Home;