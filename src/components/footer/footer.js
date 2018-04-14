import React, { Component } from 'react';
import Logo from '../logo/logo';
import './footer.css';

export default class Footer extends Component {
  render() {
    return (
      <div id="footer">
        <Logo subtitle={this.props.subtitle}/>  
      </div>
    );
  }
}
