import React, { useEffect, useState } from 'react';

import ApiKeyInput from './components/ApiKeyInput';
import ChatScreen from './components/ChatScreen';
import LocalStorageService from './lib/LocalStorage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import prompts from './config/prompts';

export const AppContext = React.createContext(null);

function App() {
  const [apiKey, setApiKey] = useState(null);
  const [model, setModel] = useState('gpt-3.5-turbo');
  const [startPrompt, setStartPrompt] = useState(prompts.startPrompt); 
  const [topicsPrompt, setTopicsPrompt] = useState(prompts.topicsPrompt);
  const [elaboratePrompt, setElaboratePrompt] = useState(prompts.elaboratePrompt);

  useEffect(() => {
    const model = LocalStorageService.get('model');
    const apiKey = LocalStorageService.get('apiKey');
    const topicsPrompt = LocalStorageService.get('topicsPrompt');
    const elaboratePrompt = LocalStorageService.get('elaboratePrompt');

    if (apiKey) {
      setApiKey(apiKey);
    }
    if (topicsPrompt) {
      setTopicsPrompt(topicsPrompt);
    }
    if (elaboratePrompt) {
      setElaboratePrompt(elaboratePrompt);
    }
    if (model) {
      setModel(model);
    }
  }, []);

  const handleSubmitApiKey = (key) => {
    setApiKey(key);
    LocalStorageService.save('apiKey', key);
  };

  const context = {
    apiKey,
    setApiKey: handleSubmitApiKey,
    startPrompt,
    setStartPrompt: (startPrompt) => {
      setStartPrompt(startPrompt);
      LocalStorageService.save('startPrompt', startPrompt);
    },
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
    model,
    setModel: (model) => {
      setModel(model);
      LocalStorageService.save('model', model);
    }
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
