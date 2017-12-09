import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from '../../../firebase/firebase.js';
import toastr from 'toastr';
import '../../../toastr/build/toastr.css';
import GetComments from '../../../redux/actions/worst_comments_get';
// import CommentArea from '../../../components/comments/comment_area';
import '../css/matchup.css';
import HR from './hr.js';


class Matchup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      key: props.matchKey,
      viewComments: false,
      commentButtonLabel: 'comments',
      voted: false,
      image1votes: 0,
      image2votes: 0
    }

    toastr.options = {
      "closeButton": true,
      "preventDuplicates": true
    }

    this.upVote = this.upVote.bind(this);
    this.toggleComments = this.toggleComments.bind(this);
  }

  componentDidMount() {
    var that = this;
    const matchKey = that.props.matchKey;
    var voteCountRef1 = firebase.database().ref('apps/worst/'+matchKey+'/img1votes');
    voteCountRef1.on('value', function(snapshot) {
      that.setState({image1votes: snapshot.val()});
    });
    var voteCountRef2 = firebase.database().ref('apps/worst/'+matchKey+'/img2votes');
    voteCountRef2.on('value', function(snapshot) {
      that.setState({image2votes: snapshot.val()});
    });
  }

  toggleComments(e) {
    e.preventDefault();

    if (!this.state.viewComments) {
      this.props.GetComments(this.props.commentGroupId);

      this.setState({
        viewComments: true,
        commentButtonLabel: 'hide'
      });

    }
    else {
      this.setState({
        viewComments: false,
        commentButtonLabel: 'comments'
      });
    }
  }

  upVote(e) {
    e.preventDefault();
    console.log('vote for: ' + e.target.name);
    var user = firebase.auth().currentUser;
    var that = this;

    if (user === null) {
      toastr.error('Login to vote');
      return;
    }
    //check firebase user object to see if user has already voted for this qotdKey
    const key = this.props.commentGroupId;
    const matchKey = that.props.matchKey;
    console.log(matchKey);
    var voteKey = e.target.name === "1" ? "img1votes" : "img2votes";
    var hasVotedRef = firebase.database().ref('users/'+user.uid+'/votes/'+key);
    hasVotedRef.once('value', function(snapshot) {
      //user has not voted, allow them to vote
      if (snapshot.val() === null) {

        var voteCountRef = firebase.database().ref('apps/worst/'+matchKey+'/'+voteKey);
        voteCountRef.once('value', function(snapshot) {
          var updates = {};
          const newCount = snapshot.val() + 1;
          updates['apps/worst/'+matchKey+'/'+voteKey] = newCount;
          firebase.database().ref().update(updates);
          that.setState({voted: true});
        }).then(() => {
          firebase.database().ref('users/'+user.uid+'/votes/'+key+'/').set(voteKey)
          .then((response) => {
            console.log('successful vote');
          })
          .catch((error) => {
            console.log(error);
          });
        });

      }
      else {
        that.setState({voted: true});
        toastr.warning("Looks like you already voted on this matchup!");
        return;
      }
    });
  }

  render() {

    //comments not being viewed
    return (
      <div id="matchUp">

        <div id="button1">
          <h4>Votes: {this.state.image1votes}</h4>
          {/* <button><img src="../assets/thumbsUp.png" name='1' onClick={this.upVote}/></button> */}
          <button name='1' onClick={this.upVote}>Me</button>
        </div>



        <div id="button2">
          <h4>Votes: {this.state.image2votes}</h4>
          {/* <button><img src="../assets/thumbsUp.png" name='2' onClick={this.upVote}/></button> */}
          <button name='2' onClick={this.upVote}>Me</button>
        </div>

        <div id="image1">
          <img src={this.props.image1} alt="image1"/>
        </div>

        <h3 id="or">Vs</h3>

        <div id="image2">
          <img src={this.props.image2} alt="image2"/>
        </div>

        {/* <button id="viewCommentsButton" onClick={this.toggleComments}>{this.state.commentButtonLabel}</button> */}
        <HR id="hr"/>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      comments: state.worstComments
    };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({GetComments}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Matchup);
