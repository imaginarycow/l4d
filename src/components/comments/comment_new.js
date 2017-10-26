import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostComment from '../redux/actions/comment_new';


class NewComment extends Component {

  constructor() {
    super();

    this.state = {
      comment: '',
      timestamp: Date.now(),
      username: '',
      uid: '',
      userimage: ''
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var newKey = this.state.username + this.state.timestamp;
    const newComment = {
      likes: 0,
      dislikes: 0,
      isFlagged: false,
      timestamp: this.state.timestamp,
      text: this.state.comment,
      userimage: this.state.userimage,
      username: this.state.username
    };
    this.props.PostComment(this.props.app, this.props.commentGroupId, newKey, newComment);
  }
  onChange(e) {
    e.preventDefault();
    this.setState({comment: e.target.value});
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Comment" name="comment" value={this.state.comment} onChange={this.onChange}/>
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({PostComment}, dispatch);

}

export default connect(null, mapDispatchToProps)(NewComment);
