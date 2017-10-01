import React, { Component } from 'react';
import Navbar from './navbar';
import Logo from './logo';

export default class Header extends Component {
  render() {
    return (
      <div>
        <Logo />
        <Navbar />
      </div>
    );
  }
}
