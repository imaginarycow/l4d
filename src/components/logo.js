import React, { Component } from 'react';
import img from '../logo2.png';
import '../css/logo.css';

export default class Logo extends Component {

  render() {
    return (
      <div id="logo">
        {/* <img src={img} alt="Logo"/> */}
        <h2>Left<span id="red">4</span>Dev</h2>
      </div>
    );
  }
}
