import React, { Component } from 'react';
import { getCommentDate } from '../../utils/dates.js';
import './comment.css';

var replies = [];


export default class Comment extends Component {

  render() {

    const stamp = new Date (this.props.timestamp);
    const formattedDate = getCommentDate(stamp);

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
