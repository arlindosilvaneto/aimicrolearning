import React, { useEffect, useState } from 'react';

import ApiKeyInput from './components/ApiKeyInput';
import ChatScreen from './components/ChatScreen';
import LocalStorageService from './lib/LocalStorage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import prompts from './config/prompts.json';

export const AppContext = React.createContext(null);

function App() {
  const [apiKey, setApiKey] = useState(null);
  const [topicsPrompt, setTopicsPrompt] = useState(prompts.topicsPrompt);
  const [elaboratePrompt, setElaboratePrompt] = useState(prompts.elaboratePrompt);
  const [morePrompt, setMorePrompt] = useState(prompts.morePrompt);

  useEffect(() => {
    const apiKey = LocalStorageService.get('apiKey');
    const topicsPrompt = LocalStorageService.get('topicsPrompt');
    const elaboratePrompt = LocalStorageService.get('elaboratePrompt');
    const morePrompt = LocalStorageService.get('morePrompt');

    if (apiKey) {
      setApiKey(apiKey);
    }
    if (topicsPrompt) {
      setTopicsPrompt(topicsPrompt);
    }
    if (elaboratePrompt) {
      setElaboratePrompt(elaboratePrompt);
    }
    if (morePrompt) {
      setMorePrompt(morePrompt);
    }
  }, []);

  const handleSubmitApiKey = (key) => {
    setApiKey(key);
    LocalStorageService.save('apiKey', key);
  };

  const context = {
    apiKey,
    setApiKey: handleSubmitApiKey,
    topicsPrompt,
    setTopicsPrompt: (topicsPrompt) => {
      setTopicsPrompt(topicsPrompt);
      LocalStorageService.save('topicsPrompt', topicsPrompt);
    },
    elaboratePrompt,
    setElaboratePrompt: (elaboratePrompt) => {
      setElaboratePrompt(elaboratePrompt);
      LocalStorageService.save('elaboratePrompt', elaboratePrompt);
    },
    morePrompt,
    setMorePrompt: (morePrompt) => {
      setMorePrompt(morePrompt);
      LocalStorageService.save('morePrompt', morePrompt);
    },
  };

  return (
    <AppContext.Provider value={context}>
      <Router>
        <Switch>
          <Route path="/">
            {!apiKey ? (
              <ApiKeyInput onSubmit={handleSubmitApiKey} />
            ) : (
              <ChatScreen />
            )}
          </Route>
        </Switch>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
