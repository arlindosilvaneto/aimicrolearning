import { Field, Form, Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import useConfig from '../hooks/useConfig';

import './ConfigForm.css';

export default function ConfigForm() {
  const history = useHistory();
  const config = useConfig();

  const handleSubmit = (values) => {
    config.saveConfig(values);

    history.push('');
  }

  const resetField = (fieldName) => {
    config.resetField(fieldName);
  }

  return (
    <div className='form-wrapper'>
      <h2>Settings</h2>
      <Formik
        initialValues={{
          model: config.getField('model'),
          apiKey: config.getField('apiKey'),
          startPrompt: config.getField('startPrompt'),
          topicsPrompt: config.getField('topicsPrompt'),
          elaboratePrompt: config.getField('elaboratePrompt'),
        }}
        onSubmit={handleSubmit}>
          <Form className='form-container'>
            <label>GPT Model:</label>
            <div className='field-wrapper'>
              <Field name='model' placeholder='Enter your api key...' className='form-input' />
              <a href="#" className='reset-button' onClick={() => resetField('model')}>🔁</a>
            </div>
            <label>API Key:</label>
            <div className='field-wrapper'>
              <Field type="password" name='apiKey' placeholder='Enter your api key...' className='form-input' />
              <a href="#" className='reset-button' onClick={() => resetField('apiKey')}>🔁</a>
            </div>
            <label>Start Prompt:</label>
            <div className='field-wrapper'>
              <Field name='startPrompt' placeholder='Enter your start prompt...' className='form-input' as="textarea" rows="5" />
              <a href="#" className='reset-button' onClick={() => resetField('startPrompt')}>🔁</a>
            </div>
            <label>Topics Prompt:</label>
            <div className='field-wrapper'>
              <Field name='topicsPrompt' placeholder='Enter your topics prompt...' className='form-input' as="textarea" rows="5" />
              <a href="#" className='reset-button' onClick={() => resetField('topicsPrompt')}>🔁</a>
            </div>
            <label>Elaborate Prompt:</label>
            <div className='field-wrapper'>
              <Field name='elaboratePrompt' placeholder='Enter your elaborate prompt...' className='form-input' as="textarea" rows="5" />
              <a href="#" className='reset-button' onClick={() => resetField('elaboratePrompt')}>🔁</a>
            </div>

            <button
              className='submit-button send-button'
              type='submit'>
                Save Settings
            </button>
          </Form>
        </Formik>
    </div>
  );
}