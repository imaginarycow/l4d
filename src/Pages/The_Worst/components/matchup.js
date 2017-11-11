import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
      commentButtonLabel: 'comments'
    }

    this.toggleComments = this.toggleComments.bind(this);
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

  render() {

    if (this.state.viewComments) {
      return (
        <div id="matchUp">

          <div id="button1">
            <h4>Votes: {this.props.image1votes}</h4>
            <button><img src="../assets/thumbsUp.png" /></button>
          </div>

          <div id="image1">
            <img src={this.props.image1} alt="image1"/>
          </div>

          <h3 id="or">Vs</h3>

          <div id="button2">
            <h4>Votes: {this.props.image2votes}</h4>
            <button><img src="../assets/thumbsUp.png" /></button>
          </div>

          <div id="image2">
            <img src={this.props.image2} alt="image2"/>
          </div>

          {/* <button id="viewCommentsButton" onClick={this.toggleComments}>{this.state.commentButtonLabel}</button>
          <CommentArea app="worst" commentGroupId={this.props.commentGroupId} comments={this.props.comments}/>;
          <button id="closeCommentsButton" onClick={this.toggleComments}>{this.state.commentButtonLabel}</button> */}
          <HR id="newHR"/>
        </div>
      );
    }

    //comments not being viewed
    return (
      <div id="matchUp">

        <div id="button1">
          <h4>Votes: {this.props.image1votes}</h4>
          <button><img src="../assets/thumbsUp.png" /></button>
        </div>

        <div id="image1">
          <img src={this.props.image1} alt="image1"/>
        </div>

        <h3 id="or">Vs</h3>

        <div id="button2">
          <h4>Votes: {this.props.image2votes}</h4>
          <button><img src="../assets/thumbsUp.png" /></button>
        </div>

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
