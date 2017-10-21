import React, { Component } from 'react';
import Choice from './choice';
import '../css/choice_area.css';

var choice1;
var choice2;

export default class ChoiceArea extends Component {

  constructor() {
    super();

    this.setChoices = this.setChoices.bind(this);
  }

  setChoices() {

    if (typeof this.props.question.date !== 'undefined') {
      let question = this.props.question;
      console.log('question: ' + this.props.question.date);
      choice1 = (<Choice id="option1" key={question.option1}
        text={question.option1} votes={question.votes1} img={question.img1}/>);
      choice2 = (<Choice id="option2" key={question.option2}
        text={question.option2} votes={question.votes2} img={question.img2} />);
    }

  }

  render() {
    this.setChoices();

    return (
      <div id="choice-area">
        <div id="choice1">{choice1}</div>
        <div id="or" >or</div>
        <div id="choice2">{choice2}</div>
      </div>
    );
  }
}
