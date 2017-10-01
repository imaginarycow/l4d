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
    choice1 = (<Choice key={question.answer1}
      text={question.answer1} votes={question.answer1Votes} />);
    choice2 = (<Choice key={question.answer2}
      text={question.answer2} votes={question.answer2Votes} />);
  }

  render() {
    return (
      <div>
        {choice1} or {choice2}
      </div>
    );
  }
}
