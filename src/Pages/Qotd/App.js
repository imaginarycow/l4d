import React, { Component } from 'react';
import './css/qotd.css';
import Languages from './components/language_option';
import Question from './components/question';
import ChoiceArea from './components/choice_area';
import CommentArea from '../../components/comment_area';
import { Questions } from './data/questions';

var questionOfTheDay = {};

class QOTD extends Component {

  componentWillMount() {
    this.getQuestionOfTheDay();
  }

  getQuestionOfTheDay() {

    for (var i = 0; i < Questions.length; i++) {
      if (Questions[i].date === '09/16/2017') {
        questionOfTheDay = Questions[i];
      }
    }
  }

  render() {

    return (
      <div id="QOTD-Page">
        <h1>QotD</h1>
        <h5>Question of the Day</h5>
        <Languages id="language-selector"/>
        <Question id="question" text={questionOfTheDay.question}/>
        <ChoiceArea id="choice-area" question={questionOfTheDay}/>
        <CommentArea comments={questionOfTheDay.comments}/>
      </div>
    );
  }
}
export default QOTD;
