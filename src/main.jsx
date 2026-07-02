import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/tokens.css';
import './styles/global.css';

// eslint-disable-next-line no-console
console.log(
  '%c|curious⟩ %cYou opened the console — that\'s the spirit. '
  + 'Come build with us: qee@usc.edu',
  'color:#50d8af;font-family:monospace;font-size:14px;',
  'color:#5ec1e5;font-family:monospace;font-size:12px;',
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
