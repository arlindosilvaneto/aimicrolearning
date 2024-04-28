import { HashRouter as Router } from 'react-router-dom';

import './App.css';
import { AppRouter } from './Router';


function App() {
  return (
    <Router>
      <div className='app-bar'>
        <h2>AI Micro Learning</h2>
      </div>
      <AppRouter />
    </Router>
  );
}

export default App;
