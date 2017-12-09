import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QotdLoad from '../../redux/actions/qotd_get';
import './css/qotd.css';
import Question from './components/question';
import ChoiceArea from './components/choice_area';
import CommentArea from '../../components/comments/comment_area';
import GetComments from '../../redux/actions/qotd_comments_get';

var commentsReceived = false;

class QOTD extends Component {

  constructor() {
    super();

    this.state = {user: null};
  }

  componentWillMount() {
    this.props.QotdLoad();
  }

  render() {

    if (this.props.qotd !== null) {

      if (this.props.comments === null && commentsReceived === false) {
        console.log('get comments called');
          this.props.GetComments(this.props.qotd.commentGroupId);
          commentsReceived = true;
      }

      return (
        <div id="QOTD-Page">
          <h1 id="title">QotD</h1>
          <h5 id="subtitle">Question of the Day</h5>
          <Question id="question" text={this.props.qotd.question}/>
          <ChoiceArea id="choice-area" question={this.props.qotd}/>
          <CommentArea app="qotd" commentGroupId={this.props.qotd.commentGroupId} comments={this.props.comments}/>
        </div>
      );
    }
    else {
      return (
        <div id="QOTD-Page">
          <h1>QotD</h1>
          <h5>Well, that's embarrasing. Please check back soon, we are working on the problem.</h5>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
    return {
      qotd: state.currQotd,
      comments: state.qotdComments
    };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({QotdLoad, GetComments}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(QOTD);
