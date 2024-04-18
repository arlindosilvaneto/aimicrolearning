import {AppContext} from '../App';
import { useContext } from 'react';

import './ConfigForm.css';
import { Field, Form, Formik } from 'formik';
import prompts from '../config/prompts';

export default function ConfigForm({onClose}) {
  const {
    model,
    apiKey,
    startPrompt,
    topicsPrompt,
    elaboratePrompt,
    setModel,
    setApiKey,
    setStartPrompt,
    setTopicsPrompt,
    setElaboratePrompt,
  } = useContext(AppContext);

  const handleSubmit = (values) => {
    setModel(values.model);
    setApiKey(values.apiKey);
    setStartPrompt(values.startPrompt);
    setTopicsPrompt(values.topicsPrompt);
    setElaboratePrompt(values.elaboratePrompt);

    onClose();
  }

  const resetField = (fieldName) => {
    if(fieldName === 'model') {
      setModel('gpt-3.5-turbo');
    } else if(fieldName === 'apiKey') {
      setApiKey('');
    } else if(fieldName === 'startPrompt') {
      setStartPrompt(prompts.startPrompt);
    } else if(fieldName === 'topicsPrompt') {
      setTopicsPrompt(prompts.topicsPrompt);
    } else if(fieldName === 'elaboratePrompt') {
      setElaboratePrompt(prompts.elaboratePrompt);
    }

    onClose();
  }

  return (
    <div className='form-wrapper'>
      <div>
        <h2>Settings</h2>
        <Formik
          initialValues={{model, apiKey, startPrompt, topicsPrompt, elaboratePrompt}}
          onSubmit={handleSubmit}>
            <Form className='form-container'>
              <label>GPT Model:</label>
              <div className='field-wrapper'>
                <Field name='model' placeholder='Enter your api key...' className='form-input' />
                <a className='reset-button' onClick={() => resetField('model')}>🔁</a>
              </div>
              <label>API Key:</label>
              <div className='field-wrapper'>
                <Field type="password" name='apiKey' placeholder='Enter your api key...' className='form-input' />
                <a className='reset-button' onClick={() => resetField('apiKey')}>🔁</a>
              </div>
              <label>Start Prompt:</label>
              <div className='field-wrapper'>
                <Field name='startPrompt' placeholder='Enter your start prompt...' className='form-input' as="textarea" />
                <a className='reset-button' onClick={() => resetField('startPrompt')}>🔁</a>
              </div>
              <label>Topics Prompt:</label>
              <div className='field-wrapper'>
                <Field name='topicsPrompt' placeholder='Enter your topics prompt...' className='form-input' as="textarea" />
                <a className='reset-button' onClick={() => resetField('topicsPrompt')}>🔁</a>
              </div>
              <label>Elaborate Prompt:</label>
              <div className='field-wrapper'>
                <Field name='elaboratePrompt' placeholder='Enter your elaborate prompt...' className='form-input' as="textarea" />
                <a className='reset-button' onClick={() => resetField('elaboratePrompt')}>🔁</a>
              </div>

              <button
                className='submit-button send-button'
                type='submit'>
                  Save Settings
              </button>
            </Form>
          </Formik>
      </div>
    </div>
  );
}