import React, { useState } from 'react';
import './Main.css';

function ApiKeyInput({ onSubmit }) {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(apiKey);
  };

  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <input
        type="text"
        className='form-input'
        placeholder="Enter your OpenAI API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
      />
      <button className='submit-button' type="submit">Set your OpenAI Key</button>
    </form>
  );
}

export default ApiKeyInput;
