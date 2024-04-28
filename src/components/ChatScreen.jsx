import React, { useCallback, useEffect, useState } from 'react';
import { MessagesCard } from './MessagesCard';
import useOpenAI from '../hooks/useOpenAI';
import {RingLoader} from 'react-spinners';
import { useLocation, useHistory } from 'react-router-dom';
import useConfig from '../hooks/useConfig';

import './ChatScreen.css';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function ChatScreen() {
  const [prompt, setPrompt] = useState('');
  const {sending, history, sendMessage, restart} = useOpenAI();
  const query = useQuery();
  const navigate = useHistory();
  
  const {config: {apiKey, startPrompt, topicsPrompt, elaboratePrompt}} = useConfig();

  useEffect(() => {
    if(!apiKey) {
      navigate.replace('settings');
    }
  });

  useEffect(() => {
    setPrompt(query.get('q'));
  }, [query]);

  useEffect(() => {
    if (prompt !== null && prompt !== '') {
      console.log(`Search query: ${prompt}`);
      if(history.length === 0) {
        sendMessage(`${startPrompt} ${prompt}`, true);
      } else {
        sendMessage(prompt, true);
      }
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [prompt]);

  const onAction = useCallback(async (direction) => {
    switch (direction) {
      case 'topics':
        await sendMessage(topicsPrompt);
        break;
      case 'elaborate':
        await sendMessage(elaboratePrompt);
        break;
      case 'drop':
        restart();
        break;
      default:
        break;
    }

    window.scrollTo(0, document.body.scrollHeight);
  }, [sendMessage, topicsPrompt, elaboratePrompt, restart]);

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
    </div>
  );
}
