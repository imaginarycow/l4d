import React, { Component } from 'react';
import NewComment from './new_comment';
import '../css/comment_area.css';
import CommentList from './comment_list.js';


export default class CommentArea extends Component {

  render() {
    return (
      <div className="commentArea">
        <NewComment />
        <CommentList comments={this.props.comments}/>
      </div>
    );
  }
}
