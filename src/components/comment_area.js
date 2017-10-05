import React,{Component} from 'react';
import NewComment from './comment_new';
import CommentList from './comment_list';
import '../css/comments.css';


export default class CommentArea extends Component {

  render () {
    return (
      <div>
        <NewComment className="commentArea"/>
        <CommentList comments={this.props.comments}/>
      </div>
    );
  }
}
