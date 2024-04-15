import {AppContext} from '../App';
import { useContext } from 'react';

import './ConfigForm.css';
import { Field, Form, Formik } from 'formik';

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

  const handleReset = (values, _) => {
    setApiKey('');
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
              <Field name='model' placeholder='Enter your api key...' className='form-input' />
              <label>API Key:</label>
              <Field type="password" name='apiKey' placeholder='Enter your api key...' className='form-input' />
              <label>Start Prompt:</label>
              <Field name='startPrompt' placeholder='Enter your start prompt...' className='form-input' as="textarea" />
              <label>Topics Prompt:</label>
              <Field name='topicsPrompt' placeholder='Enter your topics prompt...' className='form-input' as="textarea" />
              <label>Elaborate Prompt:</label>
              <Field name='elaboratePrompt' placeholder='Enter your elaborate prompt...' className='form-input' as="textarea" />

              <button
                className='submit-button send-button'
                type='submit'>
                  Save Settings
              </button>

              {/* <hr/>
              <button
                className='submit-button reset-button'
                onClick={handleReset}>
                  Reset
              </button> */}
            </Form>
          </Formik>
      </div>
    </div>
  );
}