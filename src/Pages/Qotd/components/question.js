import React, { Component } from 'react';


export default class Question extends Component {
  render() {
    return (
      <div id="question">
        <h3>
          {this.props.text}
        </h3>
      </div>
    );
  }
}
