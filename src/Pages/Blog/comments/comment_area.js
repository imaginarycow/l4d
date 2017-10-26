import React,{Component} from 'react';
import NewComment from './comment_new';
import CommentList from './comment_list';
import HR from './horizontal_rule';
import './comments.css';


export default class CommentArea extends Component {

  render () {

    return (
      <div id="comment-area">
        <HR />
        <NewComment id="newCommentArea" app={this.props.app} commentGroupId={this.props.commentGroupId} />
        <CommentList comments={this.props.comments}/>
      </div>
    );
  }
}
