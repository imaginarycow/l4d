import React, { Component } from 'react';
import { getFormattedDate, getUnformattedDate } from '../../../utils/dates';
import firebase from 'firebase';
import Question from '../../QotW/components/question';
import Choice from '../../QotW/components/choice';
import ShareButtons from '../../../components/share_button/buttons';
import '../css/qotd_view_css.css';

const initState = {question: '', date: '', option1: '', option2: '', url1: '', url2: ''};

class QotdView extends Component {

  constructor(props) {
    super(props);
    this.state = {
        author: '',
        date: getFormattedDate(),
        question: initState.question,
        option1: initState.option1,
        option2: initState.option2,
        img1: initState.url1,
        img2: initState.url2
      
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setChoice1 = this.setChoice1.bind(this);
    this.setChoice2 = this.setChoice2.bind(this);
  }

  setChoice1() {

      return (<Choice id="option1" key={this.state.option1} option="1" qotdKey={this.state.dateKey}
        text={this.state.option1} votes={this.state.votes1} img={this.state.img1} vote={this.setVote}
        voted={this.state.optionVoted} />);
    
  }
  setChoice2() {

      return (<Choice id="option2" key={this.state.option2} option="2" qotdKey={this.state.dateKey}
        text={this.state.option2} votes={this.state.votes2} img={this.state.img2} vote={this.setVote}
        voted={this.state.optionVoted}/>);
    
  }

  handleChange(e) {

    e.preventDefault();

    if(e.target.name === 'date') {
      this.setState({
          date: e.target.value,
      });
    }
    if(e.target.name === 'question') {
      this.setState({ 
        question: e.target.value
      });
    }
    if(e.target.name === 'option1') {
      this.setState({
          option1: e.target.value,
      });
    }
    if(e.target.name === 'option2') {
      this.setState({
        option2: e.target.value
      });
    }
    if(e.target.name === 'url1') {
      this.setState({
          img1: e.target.value
      });
    }
    if(e.target.name === 'url2') {
      this.setState({
          img2: e.target.value
      });
    }

  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.date === '' || this.state.question === '' || this.state.option1 === '' ||
        this.state.option2 === '' || this.state.img1 === '' || this.state.img2 === '') {
      alert('Leaving required fields blank!');
    }
    else {
      //submit new QOTD
      let qotwKey = getUnformattedDate(this.state.date);
      let commentGroupId = 'QW' + qotwKey;
      var database = firebase.database();
      firebase.database().ref('apps/qotw/' + qotwKey).set({
        author: this.state.author,
        commentGroupId: commentGroupId,
        date: this.state.date,
        dateKey: qotwKey,
        question: this.state.question,
        option1: this.state.option1,
        option2: this.state.option2,
        img1: this.state.img1,
        img2: this.state.img2,
        votes1: 0,
        votes2: 0
      })
      .then(() => {
        alert('New QOTW submitted: ' + this.state.question);
      })
      .catch((error) => {
        alert('error submitting QOTW');
      });
      //clear the form
      this.setState ({
          author: '',
          date: getFormattedDate(),
          question: initState.question,
          option1: initState.option1,
          option2: initState.option2,
          img1: initState.url1,
          img2: initState.url2
      });
    }

  }

  render() {

    const choice1 = this.setChoice1();
    const choice2 = this.setChoice2();

    return (
      <div id="qotwViewContainer">
        <div id="qotwFormContainer">
          <form id="qotd-form" onSubmit={this.handleSubmit}>
            <label>Active Date: {this.state.date} Unformatted: {getUnformattedDate(this.state.date)}</label>
            <input type="text" name="date" value={this.state.date} onChange={this.handleChange} placeholder="10-21-2017"/>
            <label>New QOTD: {this.state.question}</label>
            <textarea value={this.state.question} name="question" onChange={this.handleChange}></textarea>
            <label>Option 1: </label>
            <input type="text" name="option1" value={this.state.option1} onChange={this.handleChange}/>
            <label>Option 1 image url: </label>
            <input type="text" name="url1" value={this.state.img1} onChange={this.handleChange}/>
            <label>Option 2: </label>
            <input type="text" name="option2" value={this.state.option2} onChange={this.handleChange}/>
            <label>Option 2 image url: </label>
            <input type="text" name="url2" value={this.state.img2} onChange={this.handleChange}/>
            <input id="submit" type="submit" name="submit" value="Submit" />
          </form>
        </div>
        <div id="qotwPreviewContainer">
          <h1 id="title">QotW</h1>
          <h5 id="subtitle">Question of the Week</h5>
          <div id="share-archive-container">
            <ShareButtons pagelink={this.state.url} hashtags="QotD" comment=""/>
          </div>
          <Question id="question" text={this.state.question}/>
          <div id="choice-area">
            <div id="choice1">{choice1}</div>
            <div id="or" ><h4>or</h4></div>
            <div id="choice2">{choice2}</div>
          </div> 
        </div>
      </div>
    );
  }

}

export default QotdView;
