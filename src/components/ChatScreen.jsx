import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MessagesCard } from './MessagesCard';
import TopicInput from './TopicInput';
import useOpenAI from '../hooks/useOpenAI';
import ConfigForm from './ConfigForm';
import { AppContext } from '../App';
import {RingLoader} from 'react-spinners';

import './Main.css';
import { useLocation } from 'react-router-dom';
import prompts from '../config/prompts';

function ChatScreen() {
  const {sending, history, sendMessage, restart, stats} = useOpenAI();
  const [openSettings, setOpenSettings] = useState(false);
  let location = useLocation();
  
  const {topicsPrompt, elaboratePrompt} = useContext(AppContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('q');
    if (history.length > 0 && query !== null && query !== '') {
      console.log(`Search query: ${query}`);
      sendMessage(query, true);
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = e.target.message.value.trim();
    if (prompt && prompt !== '') {
      await sendMessage(`${prompts.startPrompt} ${prompt}`, true);
      e.target.reset();
    } else {
      console.error('Invalid prompt');
    }
  };

  const onAction = useCallback(async (direction) => {
    switch (direction) {
      case 'topics':
        await sendMessage(topicsPrompt, false, message => {
          return message;
        });
        break;
      case 'elaborate':
        await sendMessage(elaboratePrompt);
        break;
      case 'drop':
        restart();
    }

    window.scrollTo(0, document.body.scrollHeight);
  });

  return (
    <div>
      {(history.length > 0) && (
        <div>
          <MessagesCard
            history={history}
            onAction={onAction}/>
        </div>
      )}

      {sending && <div className='ring-wrapper'>
        <RingLoader
          color="rgb(105, 105, 232)"
          loading={sending}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"/>
      </div>}
      
      {(history.length === 0) && (
        <div>
          <TopicInput handleSubmit={handleSubmit} />
          <button onClick={() => setOpenSettings(true)} 
            className="settings-button">
              Settings
          </button>          
        </div>
      )}

      {openSettings && <ConfigForm onClose={() => setOpenSettings(false)} />}
    </div>
  );
}

export default ChatScreen;
