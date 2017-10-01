import React, { Component } from 'react';
import Comment from './comment';

var Comments = [];

export default class CommentList extends Component {

getComments() {
  Comments = this.props.comments.map((comm) => {
    return <Comment key={comm.comment} text={comm.comment} user={comm.user} replies={comm.replies} />
  })

}

  render() {
    this.getComments();
    return (
      <ul>
        {Comments}
      </ul>
    );
  }
}
