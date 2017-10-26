import React, { Component } from 'react';

var replies = [];

export default class Comment extends Component {
  render() {

    return (
      <li>
          {this.props.username} -- {this.props.text}
      </li>


    );
  }
}
