import React, { Component } from 'react';
import firebase from '../../firebase/firebase.js';
import toastr from 'toastr';
import '../../toastr/build/toastr.css';
import './comment_box.css';


class CommentBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      name: '',
      email: '',
      comment: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    toastr.options = {
      "positionClass": "toast-top-center",
      "closeButton": true
    }

  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged(user => {
      if (user !== null && user.email !== null) {
        this.setState({user: user, email: user.email, name: user.displayName});
      }
    })
  }

  handleChange(e) {

    e.preventDefault();

    if(e.target.name === 'name') {
      this.setState({name: e.target.value});
    }

    if(e.target.name === 'email') {
      this.setState({email: e.target.value});
    }

    if(e.target.name === 'comment') {
      this.setState({comment: e.target.value});
    }

  }

  handleSubmit(event) {

    event.preventDefault();

    var words = this.state.comment === '' ? 0 : this.state.comment.match(/\S+/g).length;

    if (this.state.user === null) {
      toastr.error('You must be signed in to leave a comment.');
      return;
    }
    else if (words === 0) {
      toastr.error('You cannot submit a blank comment.');
      return;
    }
    else if (words > 150) {
      toastr.error('Your comment is too long. Please shorten it to 150 words or less. Thank you.');
      return;
    }
    else if (words < 2) {
      toastr.error('Your comment is too short.');
      return;
    }
    const newKey = Date.now();
    const newComment = {
      name: this.state.name,
      email: this.state.email,
      comment: this.state.comment
    }
    const postUrl = 'feedback/'+'/'+newKey+'/';
    firebase.database().ref(postUrl).set(newComment)
    .then((response) => {
      toastr.success('Your feedback is appreciated.  Thanks!');
    })
    .catch((error) => {
      console.log(error);
    });
    this.setState({
      comment: ''
    });
  }

  render() {

    return (
      <div id="comment-box">
        <h3>Comments / Suggestions</h3>
        <h5>(login to leave a message)</h5>
        <form onSubmit={this.handleSubmit}>
          <input id="namein" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
          <label id="name">Name</label>

          <input id="emailin" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
          <label id="emaillabel">Email</label>

          <textarea id="commentbox" value={this.state.comment} name="comment" onChange={this.handleChange}></textarea>

          <input id="submit" type="submit" name="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

export default CommentBox;
