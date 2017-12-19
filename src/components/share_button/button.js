import React, { Component } from 'react';
import './button.css';


export default class ShareButton extends Component {

  render() {

    return(
      <button>{this.props.text}</button>
    );
  }
}
