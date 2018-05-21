import React, { Component } from 'react';
import firebase from '../../../firebase/firebase.js';
import toastr from 'toastr';
import '../../../toastr/build/toastr.css';
import '../css/choice.css';


export default class Choice extends Component {

  constructor(props) {
    super(props);

    this.state = {voted: props.voted, option: props.option};

    this.handleSubmit = this.handleSubmit.bind(this);

    toastr.options = {
      "closeButton": true,
      "preventDuplicates": true,
      "positionClass": "toast-top-center",
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    var user = firebase.auth().currentUser;
    var that = this;

    if (user === null) {
      toastr.error('Login to vote');
      return;
    }
    //check firebase user object to see if user has already voted for this qotdKey
    const qotwKey = this.props.qotdKey;
    var voteKey = e.target.name === "1" ? "votes1" : "votes2";
    var hasVotedRef = firebase.database().ref('users/'+user.uid+'/votes/QW'+qotwKey);
    hasVotedRef.once('value', function(snapshot) {
      //user has not voted, allow them to vote
      if (snapshot.val() === null) {
        
        var voteCountRef = firebase.database().ref('apps/qotw/'+qotwKey+'/'+voteKey);
        voteCountRef.once('value', function(snapshot) {
          var updates = {};
          const newCount = snapshot.val() + 1;
          updates['apps/qotw/'+qotwKey+'/'+voteKey] = newCount;
          firebase.database().ref().update(updates);
          that.setState({voted: true});
        }).then(() => {
          firebase.database().ref('users/'+user.uid+'/votes/QW'+qotwKey+'/').set(voteKey)
        });

      }
      else {
        that.setState({voted: true});
        toastr.warning("You cannot vote more than once!");
        return;
      }
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
