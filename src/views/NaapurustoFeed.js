import React from 'react';
import {Typography, Button} from '@material-ui/core';
import FeediTable from '../components/FeediTable';
import {Link as RouterLink} from 'react-router-dom';
import Nav from '../components/Nav';


const NaapurustoFeed = () => {

    return (
        <>
        <Nav/>
            <Typography
                component="h1"
                variant="h2"
                gutterBottom>NaapurustoFeed
            </Typography>
            <Typography
                component="p"
                variant="p"
                gutterBottom>Lorem impus knvnwinvqiwnopn nqwnjqen neqöjbjeb jqfjqbejbö bqöjbq bqnö jbjöqb be qöbjevbrkrenbinir.
            </Typography>
            <Button
            color="inherit"
            component={RouterLink}
            to="/uploadnewfeed"
            >
                Tee feedi
            </Button>
            <Button
            color="inherit"
            component={RouterLink}
            to="/myfeeds"
            >
                Omat feedit
            </Button>
            <FeediTable />

        </>
    );
};

export default NaapurustoFeed;