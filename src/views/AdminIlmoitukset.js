import React, { useContext } from 'react';
import {Typography, Button} from '@material-ui/core';
import AdminTable from '../components/Admin';
import {Link as RouterLink} from 'react-router-dom';
import {MediaContext} from '../contexts/MediaContext';
import Nav from '../components/Nav';

const AdminIlmoitukset = ({history}) => {
    const [user] = useContext(MediaContext);
    if (user !== null) {
    if (user.user_id !== 574) {
        history.push('/home');
    }
};
    return (
        <>
        <Nav/>
            <Typography
                component="h1"
                variant="h2"
                gutterBottom>Taloyhtiön ilmoitukset
            </Typography>
            <Typography
                component="p"
                variant="p"
                gutterBottom>Lorem impus knvnwinvqiwnopn nqwnjqen neqöjbjeb jqfjqbejbö bqöjbq bqnö jbjöqb be qöbjevbrkrenbinir.
            </Typography>
            
            <Button
            color="inherit"
            component={RouterLink}
            to="/uploadilmoitus"
            >
                Tee taloyhtiön ilmoitus.
            </Button>
            <AdminTable />
        </>
    );
};

export default AdminIlmoitukset;