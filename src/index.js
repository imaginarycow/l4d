import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import Main from './Pages/Main/Main';
import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <Router>
    <Main />
  </Router>
  , document.getElementById('root'));
registerServiceWorker();
