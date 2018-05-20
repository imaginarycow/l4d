import React,{Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PostComment from '../../redux/actions/comment_new';
import toastr from 'toastr';
import '../../toastr/build/toastr.css';
import './comment_new.css';
import firebase from '../../firebase/firebase.js';


class NewComment extends Component {

  constructor() {
    super();

    this.state = {
      charCount: 0,
      comment: '',
      email: '',
      username: 'Login to comment',
      uid: '',
      userimage: '',
      redirectToLogin: false
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirectToLogin = this.handleRedirectToLogin.bind(this);
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {

      if (user !== null && user.email !== null) {
        this.setState({email: user.email,
          username: user.displayName,
          userimage: user.photoURL
        });
      }

    });
  }

  handleRedirectToLogin(e) {
    e.preventDefault();

    this.setState({redirectToLogin: true});
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.email === '') {
      toastr.error('You must be logged in to post a comment. Login or signup for a free account.');
      return;
    }

    if (this.state.charCount < 5) {
      toastr.error('Your comment is too short, must be a minimum of 5 characters!');
    } else {
      var newKey = this.state.username + Date.now();
      const newComment = {
        color1: this.props.user.color1,
        color2: this.props.user.color2,
        likes: 0,
        dislikes: 0,
        isFlagged: false,
        timestamp: Date.now(),
        text: this.state.comment,
        username: this.state.username
      };
      this.props.PostComment(this.props.app, this.props.commentGroupId, newKey, newComment);
    }
    this.setState({comment: ''});

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

    if (this.state.redirectToLogin) {
      return <Redirect to='/Login' />
    }

    return (
      <div id="newcommentcontainer">
        <form onSubmit={this.handleSubmit}>
          <div id="user">
            <div id="userButton" 
              style={{ backgroundColor: this.props.user.color1,
                       color: this.props.user.color2}}
              >4</div>
            <h4 onClick={this.handleRedirectToLogin}>{this.state.username}</h4>
          </div>

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
