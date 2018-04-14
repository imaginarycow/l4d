import React from 'react';
import notFound from './notFound.png';
import './notFound.css';

const NotFound = () => {
  return (
    <div id="notFound">
      <h3>Channel unavailable or does not exist</h3>
      <img src="https://media.giphy.com/media/lCkumTggV53xe/giphy.gif" alt="404 - Not Found"/>
    </div>

  );
}

export default NotFound;
