import React from 'react';
import PropTypes from 'prop-types';
import { useSingleMedia } from '../hooks/ApiHooks';
import { Typography, Paper, Button, makeStyles, MuiThemeProvider } from '@material-ui/core';
import BackButton from '../components/BackButton';
import Media from '../components/Media';
import Comment from '../components/Comments';
import CommentForm from '../components/CommentForm';
import Nav from '../components/Nav';
import { TextValidator } from 'react-material-ui-form-validator';
import { createMuiTheme } from '@material-ui/core/styles';


const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

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
        flexGrow: 1,
        padding: 0,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '80%',
        maxHeight: '70%',
    }
}));




const SingleVikailmoitus = ({ match }) => {
    const classes = useStyles();
    console.log('matchjustsingle', match.params.id);
    const file = useSingleMedia(match.params.id);
    console.log('file', file);
    let description = undefined;
    if (file !== null) {
        description = file.description;
    }
    let thumb = 'http://placekitten.com/200/300';
    if (file !== null) {
        thumb = mediaUrl + file.thumbnails.w640;
    }

    return (
        <div className={classes.root}>
            {file !== null &&
                <>
                    <Nav />
                    <MuiThemeProvider theme={theme}>
                        <BackButton />
                        <Typography
                            variant="h3"
                            align="center"
                            gutterBottom>{file.title}
                        </Typography>

                        <Typography
                            variant="h5"
                            align="left"
                            gutterBottom
                            style={{ width: '70%', margin: 'auto' }}
                        >
                            Ilmoituksen tiedot:
              <Typography align="left" variant="h6" style={{ margin: 'auto', marginBottom: '1rem' }}>
                                {description}
                            </Typography>

                        </Typography>
                        {description &&
                            <img src={thumb} className={classes.img} />
                        }
                        {file.user.username !== 'tjnadmin' &&
                            <Typography
                                component="h5"
                                variant="h5"
                                align="center"
                                gutterBottom>
                                Tekijä: {file.user.username}
                            </Typography>
                        }
                        <Comment id={file.file_id} />
                        <CommentForm id={file.file_id} />
                    </MuiThemeProvider>

                </>
            }
        </div>
    );
};

SingleVikailmoitus.propTypes = {
    match: PropTypes.object,
};


export default SingleVikailmoitus;