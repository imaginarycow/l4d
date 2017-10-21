import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QotdLoad from '../../redux/actions/qotd_get';
import './css/qotd.css';
import Languages from './components/language_option';
import Question from './components/question';
import ChoiceArea from './components/choice_area';
import CommentArea from '../../components/comment_area';
import { Questions } from './data/questions';


class QOTD extends Component {

  componentWillMount() {
    this.props.QotdLoad();
  }

  render() {

    return (
      <div id="QOTD-Page">
        <h1>QotD</h1>
        <h5>Question of the Day</h5>
        <Languages id="language-selector"/>
        <Question id="question" text={this.props.qotd.question}/>
        <ChoiceArea id="choice-area" question={this.props.qotd}/>
        {/* <CommentArea comments={}/> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      qotd: state.currQotd,
    };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({QotdLoad}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(QOTD);
