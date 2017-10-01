import React, { Component } from 'react';


export default class Question extends Component {
  render() {
    return (
      <div className="Question">
        <h3>
          {this.props.text}
        </h3>
      </div>
    );
  }
}
