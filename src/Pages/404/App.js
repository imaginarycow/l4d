import React from 'react';
import notFound from './notFound.png';
import './notFound.css';

const App = () => {
  return (
    <div id="notFound">
      <img src={notFound} alt="404 - Not Found"/>
    </div>

  );
}

export default App;
