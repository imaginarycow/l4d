import React, { Component } from 'react';
import Login from './login.js';
import '../css/App.css';

export default class Header extends Component {

  render() {
    return (
      <div id="header">
        <h1>{this.props.title}</h1>
        <Login title="Login/Sign Up"/>
      </div>
    );
  }
}
