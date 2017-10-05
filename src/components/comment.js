import React, { Component } from 'react';

var replies = [];

export default class Comment extends Component {
  render() {
    console.log(this.props.replies[0].reply);
    replies = this.props.replies.map((rep) => {
      return <li key={rep.reply}>{rep.user.username} -- {rep.reply}</li>;
    });

    return (
      <li>
          {this.props.user.username} -- {this.props.text}
        <ul>
          {replies}
        </ul>
      </li>


    );
  }
}
