import { Field, Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import useConfig from '../hooks/useConfig';
import { useEffect } from 'react';

import './TopicScreen.css';
import '../App.css';

export default function TopicScreen() {
  const history = useHistory();
  const {config: {apiKey}} = useConfig();

  const handleSubmit = ({topic}) => {
    console.log('Starting learning on topic:', topic);
    history.push(`/chat?q=${topic}`);
  }

  useEffect(() => {
    if(!apiKey) {
      history.replace('settings');
    }
  });

  return (
    <>
      <Formik initialValues={{topic: ''}} onSubmit={handleSubmit}>
        <Form className='form-container'>
          <Field className='form-input' name="topic" placeholder="Enter your initial topic..." />
          
          <button
            className='submit-button send-button' 
            type="submit">
              Start Learning
          </button>
        </Form>
      </Formik>

      <div className='button-bar'>
        <button onClick={() => history.push('settings')}>⚙️<br/><span>Settings</span></button>
      </div>
    </>
  );
}