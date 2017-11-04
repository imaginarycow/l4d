import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PostComment from '../../../redux/actions/comment_new';
import toastr from 'toastr';
import '../../../toastr/build/toastr.css';
import './comment_new.css';


class NewComment extends Component {

  constructor() {
    super();

    this.state = {
      charCount: 0,
      comment: '',
      timestamp: Date.now(),
      username: '',
      uid: '',
      userimage: '',
      defaultimage: 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/default_image.png?alt=media&token=c25561dd-b553-48ad-b53c-6b82dd38fdc7'
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.props.user.email === 'undefined') {
      toastr.error('You must be logged in to post a comment. Login or signup for a free account.');
      return;
    }

    if (this.state.charCount < 5) {
      alert('Your comment is too short, must be a minimum of 5 characters!');
    } else {
      var newKey = this.state.username + this.state.timestamp;
      const newComment = {
        likes: 0,
        dislikes: 0,
        isFlagged: false,
        timestamp: this.state.timestamp,
        text: this.state.comment,
        userimage: this.state.userimage === '' ? this.state.defaultimage : this.state.userimage,
        username: this.state.username
      };
      this.props.PostComment(this.props.app, this.props.commentGroupId, newKey, newComment);
    }

  }
  onChange(e) {
    e.preventDefault();
    var text = e.target.value;
    var count = text.length;

    this.setState({
      comment: text,
      charCount: count});
  }

  render () {
    return (
      <div>
        <form id="new-comment" onSubmit={this.handleSubmit}>
          <textarea id="text" placeholder="Comment: 500 characters max" name="comment"
              value={this.state.comment} onChange={this.onChange} maxLength="500"/>
          <label id="charCount">Characters remaining: {500 - this.state.charCount}</label>
          <input id="post" type="submit" value="Comment" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      user: state.user
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({PostComment}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
