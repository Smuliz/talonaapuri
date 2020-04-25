import React from 'react';
import {Typography, Button} from '@material-ui/core';
import MyTable from '../components/MyTable';
import {Link as RouterLink} from 'react-router-dom';
import Nav from '../components/Nav';

const MyFiles = () => {
    return (
        <>
        <Nav/>
            <Typography
                component="h1"
                variant="h2"
                gutterBottom>My Files
            </Typography>
            <Typography
                component="p"
                variant="p"
                gutterBottom>Lorem impus knvnwinvqiwnopn nqwnjqen neqöjbjeb jqfjqbejbö bqöjbq bqnö jbjöqb be qöbjevbrkrenbinir.
            </Typography>
            <Button
            color="inherit"
            component={RouterLink}
            to="/upload"
            >
                Tee vikailmoitus.
            </Button>
            <MyTable />
        </>
    );
};

export default MyFiles;