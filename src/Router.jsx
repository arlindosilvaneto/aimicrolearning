import { useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';

import TopicScreen from './components/TopicScreen';
import ChatScreen from './components/ChatScreen';
import ConfigForm from './components/ConfigForm';

export function AppRouter() {
  const history = useHistory();
  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      if (action === 'POP') {
        history.replace('');
      }
    });

    return () => {
      // Clean up the listener when the component unmounts
      unlisten();
    };
  }, [history]);

  return (
    <>
      <div style={{marginTop: 50}} />
      <Switch>
        <Route exact path="/" component={TopicScreen} />
        <Route path="/chat" component={ChatScreen} />
        <Route path="/settings" component={ConfigForm} />
      </Switch>
    </>
  );
}