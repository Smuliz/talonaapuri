import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import useUploadForm from '../hooks/UploadHooks';
import {upload} from '../hooks/ApiHooks';
import {
  Button,
  Grid,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import BackButton from '../components/BackButton';
import Nav from '../components/Nav';

const Upload = ({history}) => {
  const [loading, setLoading] = useState(false);
  const doUpload = async () => {
    setLoading(true);
    try {
      const uploadObject = {
        title: inputs.title,
        description: JSON.stringify({
          desc: inputs.description,
        }),
        file: inputs.file,
      };
      const result = await upload(uploadObject, localStorage.getItem('token'));
      console.log(result);
      setTimeout(() => {
        setLoading(false);
        history.push('/home');
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
      <Grid container>
        <Grid item xs={12}>
          <Typography
            component="h1"
            variant="h2"
            gutterBottom>Tee vikailmoitus</Typography>
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
                  label="Title"
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
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={inputs.description}
                  onChange={handleInputChange}
                  validators={
                    ['matchRegexp:^[a-öA-Ö]+(([\',. -][a-öA-Ö ])?[a-öA-Ö]*)*$']
                  }
                  errorMessages={['text only']}
                />
              </Grid>
              <Grid container item>
                <TextValidator
                  fullWidth
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
                  Lähetä vikailmoitus.
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
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
        </Grid>
      </Grid>
    </>
  );
};

Upload.propTypes = {
  history: PropTypes.object,
};

export default Upload;