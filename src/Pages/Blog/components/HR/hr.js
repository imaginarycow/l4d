import React, {Component} from 'react';
import './hr.css';

const HR = props => {

  return (
    <div id="hrContainer">
      <div id="div1"></div>
      <div id="hrtext"><em>{props.text}</em></div>
      <div id="div2"></div>
    </div>
  );
}

export default HR;
