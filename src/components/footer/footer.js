import React, { Component } from 'react';
import Logo from '../logo';
import './footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div id="footercontainer">
          <Logo />
          Copyright 2018.
        </div>
      </div>
    );
  }
}
