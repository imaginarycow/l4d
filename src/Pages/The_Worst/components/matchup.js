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
      commentButtonLabel: 'comments'
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
        commentButtonLabel: 'hide'
      });
      this.setState({});
    } else {
      this.setState({
        commArea: <div></div>,
        viewComments: false,
        commentButtonLabel: 'comments'
      });
    }
  }

  render() {
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
