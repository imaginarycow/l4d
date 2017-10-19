import React, { Component } from 'react';
import Choice from './choice';

let choice1;
let choice2;

export default class ChoiceArea extends Component {
  componentWillMount() {
    this.setChoices();
  }

  setChoices() {
    let question = this.props.question;
    choice1 = (<Choice id="option1" key={question.answer1}
      text={question.answer1} votes={question.answer1Votes} img={question.answer1url}/>);
    choice2 = (<Choice id="option2" key={question.answer2}
      text={question.answer2} votes={question.answer2Votes} img={question.answer2url} />);
  }

  render() {
    return (
      <div id="choice-area">
        {choice1} or {choice2}
      </div>
    );
  }
}
