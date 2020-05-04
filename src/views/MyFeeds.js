import React from 'react';
import {Typography} from '@material-ui/core';
import MyNaapurustoFeeds from '../components/MyNaapurustoFeeds';
import Nav from '../components/Nav';
import BackButton from '../components/BackButton';

const MyFeeds = () => {
    return (
        <>
        <Nav/>
            <BackButton/>
            <Typography
                component="h1"
                variant="h2"
                gutterBottom>Omat feedit
            </Typography>
            <Typography
                component="p"
                variant="p"
                gutterBottom>Lorem impus knvnwinvqiwnopn nqwnjqen neqöjbjeb jqfjqbejbö bqöjbq bqnö jbjöqb be qöbjevbrkrenbinir.
            </Typography>
            <MyNaapurustoFeeds/>
        </>
    );
};

export default MyFeeds;