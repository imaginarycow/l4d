import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QotwLoad from '../../redux/actions/qotw_get';
import './css/qotd.css';
import Question from './components/question';
import ChoiceArea from './components/choice_area';
import CommentArea from '../../components/comments/comment_area';
import GetComments from '../../redux/actions/qotd_comments_get';
import ShareButtons from '../../components/share_button/buttons';

var commentsReceived = false;

class QOTW extends Component {

  constructor() {
    super();

    this.state = {url: 'http://www.Left4Dev.com/QOTW', user: null};
  }

  componentWillMount() {
    this.props.QotwLoad();
  }

  render() {
   
    if (this.props.qotw !== null) {
      
      if (this.props.comments === null && commentsReceived === false) {
          this.props.GetComments(this.props.qotw.commentGroupId);
          commentsReceived = true;
      }
      const qotw = this.props.qotw;
      var comment = qotw.question + ' ' + qotw.option1 + ' or ' + qotw.option2;
      
      return (
        <div id="QOTD-Page">
          <h1 id="title">QotW</h1>
          <h5 id="subtitle">Question of the Week</h5>
          <div id="share-archive-container">
            <ShareButtons pagelink={this.state.url} hashtags="QotW" comment={comment}/>
          </div>
          <Question id="question" text={qotw.question}/>
          <ChoiceArea id="choice-area" question={qotw}/>
          <CommentArea app="qotw" commentGroupId={qotw.commentGroupId} comments={this.props.comments}/>
        </div>
      );
    }
    else {
      return (
        <div id="QOTD-Page">
          <h1 id="title">QotW</h1>
          <h5 id="subtitle">Loading...</h5>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {

    return {
      qotw: state.currQotw,
      comments: state.qotdComments
    };
}

const mapDispatchToProps = (dispatch) => {

  return bindActionCreators({QotwLoad, GetComments}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(QOTW);
