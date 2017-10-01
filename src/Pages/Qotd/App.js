import React, { Component } from 'react';
import './css/App.css';
import Navbar from '../../components/navbar';
import Languages from './components/language_option';
import Question from './components/question';
import ChoiceArea from './components/choice_area';
import CommentArea from './components/comment_area';
import { Questions } from './data/questions';

var questionOfTheDay = {};

export default class App extends Component {

  componentWillMount() {
    this.getQuestionOfTheDay();
  }

  getQuestionOfTheDay() {
    var d = new Date();
    for (var i = 0; i < Questions.length; i++) {
      if (Questions[i].date === '09/16/2017') {
        questionOfTheDay = Questions[i];
      }
    }
  }

  render() {

    return (
      <div className="App">
        <h1>QOTD</h1>
        <h5>Question of the Day</h5>
        <Languages />
        <Question text={questionOfTheDay.question}/>
        <ChoiceArea question={questionOfTheDay}/>
        <CommentArea comments={questionOfTheDay.comments}/>
      </div>
    );
  }
}
