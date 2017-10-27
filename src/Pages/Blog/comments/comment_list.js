import React,{Component} from 'react';
import Comment from './comment';

var Comments = [];
var commentsReceived = false;

export default class CommentList extends Component {

  constructor() {
    super();

    this.getComments = this.getComments.bind(this);
  }

  getComments() {

    const comments = this.props.comments;

    for (var i in comments) {
      Comments.push(<Comment key={comments[i].timestamp} text={comments[i].text}
                      username={comments[i].username} imgUrl={comments[i].userimage}
                      timestamp={comments[i].timestamp} />);

                      commentsReceived = true;
    }
  }

  render() {

    if (commentsReceived == false) {
      this.getComments();
    }

    return (
      <ul className="commentListArea">
        {Comments}
      </ul>
    );
  }
}
