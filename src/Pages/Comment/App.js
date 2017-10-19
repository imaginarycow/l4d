import React, { Component } from 'react';
import './comment_box.css';


class CommentBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      comment: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    var words = this.state.comment.match(/\S+/g).length;
    if (this.state.name === '' || this.state.email === '' || words > 150) {
      alert('Either you left something blank, or your comment is too long!');
    }
    else {
      alert('Your comment has been submitted!: ');
    }

    event.preventDefault();
  }

  render() {

    return (
      <div id="comment-box">
        <h3>Speak Your Mind</h3>
        <form onSubmit={this.handleSubmit}>
          <label id="name">Name</label>
          <input id="namein" type="text" name="name" value={this.state.name} onChange={this.handleChange}/>

          <label id="emaillabel">Email</label>
          <input id="emailin" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>

          <textarea id="comments" value={this.state.comment} name="comment" onChange={this.handleChange}></textarea>

          <input id="submit" type="submit" name="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

export default CommentBox;
