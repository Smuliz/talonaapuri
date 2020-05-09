import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {upload, useSingleMedia, modifyFile} from '../hooks/ApiHooks';
import {
  Button,
  Grid,
  CircularProgress,
  Typography,
  MuiThemeProvider,
} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import BackButton from '../components/BackButton';
import useModifyForm from '../hooks/ModifyHooks';
import Nav from '../components/Nav';
import {createMuiTheme} from '@material-ui/core/styles';
import {makeStyles} from '@material-ui/core';


const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const theme = createMuiTheme({
  palette:{
    primary: {
      main: '#DF7861'
    },
  },
  overrides: {

    MuiGrid:{
      root:{
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
        marginBottom:'1rem',
      }

    }
  }
});

const useStyles = makeStyles((theme) => ({
    regButton: {
      marginTop:'1rem',
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: '#ECB390',
    },
    filu:{
      marginTop:'2rem',
      marginBottom:'2rem',
    },
  }));

const ModifyNaapurusto = ({history, match}) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const file = useSingleMedia(match.params.id);

  const doModify = async () => {
    setLoading(true);
    try {
      const modifyObject = {
        title: inputs.title,
        description: inputs.description,

      };
      const result = await modifyFile(modifyObject, match.params.id);
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

  const {inputs,setInputs,handleInputChange,handleSubmit} = useModifyForm(doModify);
 
  useEffect(() => {
    (async () => {
      if (file !== null) {
        const description = file.description;
        setInputs((inputs) => {
          return {
            title: file.title,
            description: description,
            filename: file.filename,
          };
        });
      }
    })();
  }, [file, setInputs]);
  
  console.log('inputs', inputs);

  return (
    <>
    <Nav/>
    <MuiThemeProvider theme={theme}>
      <BackButton />
      <Grid container>
        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="h2"
            gutterBottom>Muokkaa</Typography>
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
                  ]}
                  errorMessages={[
                    'this field is required',
                  ]}
                />
              </Grid>
              <Grid container item>
                <TextValidator
                  id="standard-multiline-static"
                  multiline
                  rows={4}
                  fullWidth
                  label="Kuvaus"
                  name="description"
                  value={inputs.description}
                  onChange={handleInputChange}
                  validators={
                    ['matchRegexp:^[a-öA-Ö]+(([\',. -][a-öA-Ö ])?[a-öA-Ö]*)*$']
                  }
                  errorMessages={['Vain tekstiä']}
                />
              </Grid>
              <Grid container item>
                <Button
                style={{marginTop:'2rem',marginBottom:'2rem'}}
                  fullWidth
                  color="primary"
                  type="submit"
                  variant="contained"
                >
                  Tallenna
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
          
        </Grid>
        
      </Grid>
      {loading &&
            <Grid item>
              <CircularProgress />
            </Grid>
          }
          {inputs.filename.length > 0 &&
            <Grid item>
              <img
                style={
                  {
                    width: '70%',
                  }
                }
                src={mediaUrl + inputs.filename}
                alt="preview" />
              
            </Grid>
          }
      </MuiThemeProvider>
    </>
  );
};

ModifyNaapurusto.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default ModifyNaapurusto;