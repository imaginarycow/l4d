import React, { Component } from 'react';

export default class Footer extends Component {

  render() {


    return (
      <div id="footer">
        <h3 id="footer">{this.props.title}</h3>
      </div>
    );
  }
}
