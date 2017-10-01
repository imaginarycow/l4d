import React, { Component } from 'react';
import img from '../logo2.png';
import '../css/logo.css';

export default class Logo extends Component {

  render() {
    return (
      <img src={img} alt="Logo"/>
    );
  }
}
