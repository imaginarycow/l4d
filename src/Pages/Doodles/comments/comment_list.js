import React,{Component} from 'react';
import Comment from './comment';

var Comments = [];

export default class CommentList extends Component {

  getComments() {
    console.log(this.props.comments);
    const comments = this.props.comments;
    for (var i in comments) {
      console.log(comments[i]);
      Comments.push(<Comment key={comments[i].timestamp} text={comments[i].text} username={comments[i].username} />);
    }
  }

    render() {
      this.getComments();
      return (
        <ul className="commentListArea">
          {Comments}
        </ul>
      );
    }
}
