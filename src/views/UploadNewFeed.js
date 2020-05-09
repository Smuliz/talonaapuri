import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';
import {uploadNaapurustoFeed} from '../hooks/ApiHooks';
import {
  Button,
  Grid,
  CircularProgress,
  Typography,
  makeStyles,
  MuiThemeProvider,
} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import BackButton from '../components/BackButton';
import Nav from '../components/Nav';
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
    regButton: {
        marginTop: '1rem',
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: '#ECB390',
    },
    filu: {
        marginTop: '2rem',
        marginBottom: '2rem',
    },
}));

const UploadNewFeed = ({history}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const doUpload = async () => {
    setLoading(true);
    try {
      const uploadObject = {
        title: inputs.title,
        description: inputs.description,
        file: inputs.file,
      };
      const result = await uploadNaapurustoFeed(uploadObject, localStorage.getItem('token'));
      console.log(result);
      setTimeout(() => {
        setLoading(false);
        history.push('/naapurustofeed');
      }, 2000);
    } catch (e) {
      console.log(e.message);
      // TODO: näytä vihe
    }
  };

  const {
    inputs,
    setInputs,
    handleInputChange,
    handleSubmit,
    handleFileChange,
  } = useUploadForm(doUpload);

  useEffect(() => {
    // failriideri tänne
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      // convert image file to base64 string
      setInputs((inputs) => {
        return {
          ...inputs,
          dataUrl: reader.result,
        };
      });
    }, false);

    if (inputs.file !== null) {
      if (inputs.file.type.includes('image')) {
        reader.readAsDataURL(inputs.file);
      } else {
        setInputs((inputs) => {
          return {
            ...inputs,
            dataUrl: 'logo192.png',
          };
        });
      }
    }
  }, [inputs.file, setInputs]);
  console.log('inputs', inputs);

  return (
    <>
    <Nav/>
      <BackButton />
      <MuiThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="h2"
            gutterBottom>Tee uusi päivitys</Typography>
        </Grid>
        <Grid item>
          <ValidatorForm
            onSubmit={handleSubmit}
            instantValidate={false}
            noValidate
          >
            <Grid container>
              <Grid container item>
                <TextValidator
                  fullWidth
                  label="Otsikko"
                  type="text"
                  name="title"
                  value={inputs.title}
                  onChange={handleInputChange}
                  validators={[
                    'required',
                    'matchRegexp:^[a-öA-Ö0-9]+(([\',. -][a-öA-Ö0-9 ])?[a-öA-Ö0-9]*)*$',
                  ]}
                  errorMessages={[
                    'Kiellettyjä merkkejä otsikossa tai se on tyhjä',
                  ]}
                />
              </Grid>
              <Grid container item>
                <TextValidator
                  id="standard-multiline-static"
                  fullWidth
                  multiline
                  rows={4}
                  label="Kuvaus"
                  name="description"
                  value={inputs.description}
                  onChange={handleInputChange}
                  validators={
                    ['matchRegexp:^[a-öA-Ö0-9]+(([\',. -][a-öA-Ö0-9 ])?[a-öA-Ö0-9]*)*$']
                  }
                  errorMessages={['Kuvauksessa kiellettyjä merkkejä, tai lopetit välilyöntiin']}
                />
              </Grid>
              <Grid container item>
                <TextValidator
                className={classes.filu}
                
                  type="file"
                  name="file"
                  accept="image/*,video/*,audio/*"
                  onChange={handleFileChange}
                />
              </Grid>
              <Grid container item>
                <Button
                  fullWidth
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  Lähetä Päivitys
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
          
        </Grid>
      </Grid>
      {loading &&
          <Grid item>
            <CircularProgress/>
          </Grid>
          }
          {inputs.dataUrl.length > 0 &&
          <Grid item>
            <img
              style={
                {
                  width: '100%',
                }
              }
              src={inputs.dataUrl}
              alt="preview"/>
          
          </Grid>
          }
      </MuiThemeProvider>
    </>
  );
};

UploadNewFeed.propTypes = {
  history: PropTypes.object,
};

export default UploadNewFeed;