import React, {Component} from 'react';
import './hr.css';

export default class HR extends Component {

  render() {
    return (
      <div id={this.props.id}>
        <div id="div1"></div>
        <div id="text"><em>the worst</em></div>
        <div id="div2"></div>
      </div>
    );
  }

}
