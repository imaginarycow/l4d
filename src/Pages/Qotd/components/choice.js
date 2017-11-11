import React, { Component } from 'react';
import firebase from '../../../firebase/firebase.js';
import toastr from 'toastr';
import '../../../toastr/build/toastr.css';
import '../css/choice.css';


export default class Choice extends Component {

  constructor(props) {
    super(props);

    console.log(props);
    this.state = {voted: props.voted, option: props.option};

    this.handleSubmit = this.handleSubmit.bind(this);

    toastr.options = {
      "closeButton": true,
      "preventDuplicates": true
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    var user = firebase.auth().currentUser;

    if (user === null) {
      toastr.error('Login to vote');
      return;
    }

    if (this.state.voted === null) {
      this.props.vote(e.target.name);
    } else {
      toastr.warning("You cannot vote more than once!");
      return;
    }
    const qotdKey = this.props.qotdKey;
    var voteKey = e.target.name === "1" ? "votes1" : "votes2";
    var voteCountRef = firebase.database().ref('apps/qotd/'+qotdKey+'/'+voteKey);
    voteCountRef.once('value', function(snapshot) {
      var updates = {};
      const newCount = snapshot.val() + 1;
      updates['apps/qotd/'+qotdKey+'/'+voteKey] = newCount;
      return firebase.database().ref().update(updates);
    });

  }

  render() {
    return (
      <div id="choice">
        <h3>{this.props.text}</h3>
        <h5 id="votes">{this.props.votes}</h5>
        <form onSubmit={this.handleSubmit} name={this.props.option}>
          <input type="submit" value="vote" />
        </form>
        <img src={this.props.img} />
      </div>
    );
  }
}
