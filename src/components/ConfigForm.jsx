import {AppContext} from '../App';
import { useContext, useState } from 'react';

import './ConfigForm.css';

export default function ConfigForm({onClose}) {
  const context = useContext(AppContext);

  const [apiKey, setApiKey] = useState(context.apiKey);
  const [topicsPrompt, setTopicsPrompt] = useState(context.topicsPrompt);
  const [elaboratePrompt, setElaboratePrompt] = useState(context.elaboratePrompt);
  const [morePrompt, setMorePrompt] = useState(context.morePrompt);

  const handleSubmit = (e) => {
    e.preventDefault();
    context.setApiKey(apiKey);
    context.setTopicsPrompt(topicsPrompt);
    context.setElaboratePrompt(elaboratePrompt);
    context.setMorePrompt(morePrompt);

    onClose();
  }

  return (
    <div className='form-wrapper'>
      <div>
        <h2>Settings</h2>
        <form autoComplete='off' onSubmit={handleSubmit} className='form-container'>
          <label>API Key:</label>
          <input value={apiKey} autoComplete="false" onChange={(e) => setApiKey(e.target.value)}
            className='form-input' type="text" name="apiKey" placeholder="Enter your api key..." />
          <label>Topics Prompt:</label>
          <textarea value={topicsPrompt} rows={4} className='form-input' name='topicsPrompt' 
            placeholder='Enter your topics prompt...'
            onChange={(e) => setTopicsPrompt(e.target.value)}>{topicsPrompt}</textarea>
          <label>Elaborate Prompt:</label>
          <textarea value={elaboratePrompt} rows={4} className='form-input' name='elaboratePrompt' 
            placeholder='Enter your elaborate prompt...'
            onChange={(e) => setElaboratePrompt(e.target.value)}>{elaboratePrompt}</textarea>
          <label>More Prompt:</label>
          <textarea value={morePrompt} rows={4} className='form-input' name='morePrompt' 
            placeholder='Enter your more prompt...'
            onChange={(e) => setMorePrompt(e.target.value)}>{morePrompt}</textarea>
            
          <button 
            className='submit-button send-button' 
            type="submit">
              Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}