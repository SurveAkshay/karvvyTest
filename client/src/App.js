import React from 'react';
import { Home } from './components/Home';
import './App.css';

import { GlobalProvider } from './contexts/GlobalState';

function App() {
  return (
    <div className="App">
      <GlobalProvider>
        <Home />
      </GlobalProvider>
    </div>
  );
}

export default App;
