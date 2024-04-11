import React, { useCallback, useContext, useEffect, useState } from 'react';
import { MessagesCard } from './MessagesCard';
import TopicInput from './TopicInput';
import useOpenAI from '../hooks/useOpenAI';
import ConfigForm from './ConfigForm';
import { AppContext } from '../App';
import {RingLoader} from 'react-spinners';

import './Main.css';
import { useLocation } from 'react-router-dom';

function ChatScreen() {
  const {sending, history, sendMessage, restart, stats} = useOpenAI();
  const [openSettings, setOpenSettings] = useState(false);
  let location = useLocation();
  
  const {topicsPrompt, elaboratePrompt, morePrompt} = useContext(AppContext);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const q = urlParams.get('q');
    if (q !== null && q !== '') {
      console.log(`Search query: ${q}`);
      sendMessage(q, true);
      window.scrollTo(0, 0);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const prompt = e.target.message.value.trim();
    if (prompt !== '') {
      await sendMessage(`Lets start from a simple topic about ${prompt} and continue to learn with small pieces.`, true);
      e.target.reset();
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
      case 'more':
        await sendMessage(
          morePrompt,
        );
        break;
      case 'drop':
        restart();
    }

    window.scrollTo(0, 0);
  });

  return (
    <div>
      {(history.length > 0) && (
        <div>
          <MessagesCard
            history={history}
            stats={stats}
            onAction={onAction} />
        </div>
      )}
      
      {sending && <div className='ring-wrapper'>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <RingLoader
            color="rgb(105, 105, 232)"
            loading={sending}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"/>
        </div>
      </div>}
      
      {(history.length === 0) && (
        <div>
          <button onClick={() => setOpenSettings(true)} 
            className="settings-button">
              Settings
          </button>
          <TopicInput handleSubmit={handleSubmit} />
        </div>
      )}

      {openSettings && <ConfigForm onClose={() => setOpenSettings(false)} />}
    </div>
  );
}

export default ChatScreen;
