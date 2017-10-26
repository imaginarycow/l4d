import React, { Component } from 'react';
import './comment.css';

var replies = [];

var dt = new Date();
var utcDate = dt.toString();

export default class Comment extends Component {
  render() {
    const stamp = new Date (this.props.timestamp);
    const formattedDate = stamp.toString();



    return (
      <li>
        <div id="comment">
          <img id="img" src={this.props.imgUrl} alt="user"/>
          <p id="user">{this.props.username}</p>
          <p id="date">{formattedDate}</p>
          <p id="text">{this.props.text}</p>
        </div>
      </li>


    );
  }
}
