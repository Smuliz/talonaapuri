import React, { useContext, useState, useEffect } from 'react';
import {postComment} from '../hooks/ApiHooks';
import {Typography, Button, } from '@material-ui/core';
import useCommentForm from '../hooks/CommentHooks';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';



const CommentForm = (id) => {

    const doComment= async () => {
        try {
            const token = localStorage.getItem('token');
            await postComment(inputs.comment, id, token);
        } catch (e) {
            console.log("Comment form", e.message)
        }
    };

    const { inputs, setInputs, handleInputChange, handleSubmit } = useCommentForm(doComment);

    useEffect(() => {
    }, [setInputs]);
 
    console.log('Komment FORM', id);
    return (
        <>
        <ValidatorForm
            onSubmit={handleSubmit}
            instantValidate={false}
            noValidate
        >
 
        <TextValidator
            id="standard-multiline-static"
            multiline
            rows={4}
            fullWidth
            label="Comment"
            name="comment"
            value={inputs.comment}
            onChange={handleInputChange}
            validators={
                ['matchRegexp:^[a-öA-Ö]+(([\',. -][a-öA-Ö ])?[a-öA-Ö]*)*$']
            }
                errorMessages={['text only']}
        >
        </TextValidator>
        <Button
          type="submit"
          fullWidth
          color="primary"
          type="submit"
          variant="contained"
          >
            Lisää Kommentti

          </Button>
          </ValidatorForm>
        </>
        
    );
    
};



    export default CommentForm;