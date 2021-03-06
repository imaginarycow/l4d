import React, { Component } from 'react';
import Choice from './choice';
import '../css/choice_area.css';

var choice1;
var choice2;

export default class ChoiceArea extends Component {

  constructor() {
    super();

    this.state = {optionVoted: null};

    this.setVote = this.setVote.bind(this);
    this.setChoice1 = this.setChoice1.bind(this);
    this.setChoice2 = this.setChoice2.bind(this);
  }

  setChoice1(props) {

    if (typeof props.question.date !== 'undefined') {
      let question = props.question;

      return (<Choice id="option1" key={question.option1} option="1" qotdKey={question.dateKey}
        text={question.option1} votes={question.votes1} img={question.img1} vote={this.setVote}
        voted={this.state.optionVoted} />);
    }
  }
  setChoice2(props) {

    if (typeof props.question.date !== 'undefined') {
      let question = props.question;

      return (<Choice id="option2" key={question.option2} option="2" qotdKey={question.dateKey}
        text={question.option2} votes={question.votes2} img={question.img2} vote={this.setVote}
        voted={this.state.optionVoted}/>);
    }
  }

  setVote(option) {
    
    this.setState({optionVoted: option});
    this.forceUpdate();
  }

  render() {
    //this.setChoices();
    const choice1 = this.setChoice1(this.props);
    const choice2 = this.setChoice2(this.props);

    return (
      <div id="choice-area">
        <div id="choice1">{choice1}</div>
        <div id="or" ><h4>or</h4></div>
        <div id="choice2">{choice2}</div>
      </div>
    );
  }
}
