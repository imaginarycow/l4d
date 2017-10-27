import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import CommentArea from '../comments/comment_area';
import GetComments from '../../../redux/actions/worst_comments_get';
import '../css/matchup.css';


class Matchup extends Component {

  constructor() {
    super();

    this.state = {
      commArea: <div></div>,
      viewComments: false,
      commentButtonLabel: 'View Comments'
    }

    this.toggleComments = this.toggleComments.bind(this);
  }

  toggleComments(e) {
    e.preventDefault();
    console.log('view comments button tapped');
    if (this.state.viewComments === false) {
      this.setState({
        commArea: <CommentArea app="worst" commentGroupId={this.props.commentGroupId} comments={this.props.comments}/>,
        viewComments: true,
        commentButtonLabel: 'Hide Comments'
      });
      this.setState({});
    } else {
      this.setState({
        commArea: <div></div>,
        viewComments: false,
        commentButtonLabel: 'View Comments'
      });
    }
  }

  render() {
    return (
      <div id="matchUp">
        <h4 id="vote1">Votes: {this.props.image1votes}</h4>
        <img id="image1" src={this.props.image1} alt="image1"/>
        <button id="button1">Vote</button>
        <h3 id="or">Vs</h3>
        <h4 id="vote2">Votes: {this.props.image2votes}</h4>
        <img id="image2" src={this.props.image2} alt="image2"/>
        <button id="button2">Vote</button>
        <button id="viewCommentsButton" onClick={this.toggleComments}>{this.state.commentButtonLabel}</button>
        {this.state.commArea}
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
