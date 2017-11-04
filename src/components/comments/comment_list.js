import React,{Component} from 'react';
import Comment from './comment';


export default class CommentList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      comments: null,
      commentsReceived: false
    }

    this.getComments = this.getComments.bind(this);
  }

  getComments(comments) {

    var CommentsArray = [];
    for (var i in comments) {
      CommentsArray.push(<Comment key={comments[i].timestamp+i} text={comments[i].text}
                      username={comments[i].username} imgUrl={comments[i].userimage}
                      timestamp={comments[i].timestamp} />);
    }
    return CommentsArray;
  }

  render() {

    const mappedComments = this.getComments(this.props.comments);

    return (
      <ul className="commentListArea">
        {mappedComments}
      </ul>
    );
  }
}
