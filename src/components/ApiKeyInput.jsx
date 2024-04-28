import React from 'react';
import { Field, Form, Formik } from 'formik';
import './Main.css';

function ApiKeyInput({ onSubmit }) {
  const handleSubmit = ({apiKey}) => {
    onSubmit(apiKey);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={{apiKey: ''}}>
      <Form className='form-container'>
        <Field
          className='form-input'
          placeholder="Enter your OpenAI API key"
          name='apiKey'
        />

        <button className='submit-button' type="submit">Set your OpenAI Key</button>
      </Form>
    </Formik>
  );
}

export default ApiKeyInput;
