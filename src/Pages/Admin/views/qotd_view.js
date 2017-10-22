import React, { Component } from 'react';
import { getFormattedDate, getUnformattedDate } from '../../../utils/dates';
import firebase from 'firebase';
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
      url1: initState.url1,
      url2: initState.url2
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {

    e.preventDefault();

    if(e.target.name === 'date') {
      this.setState({date: e.target.value});
    }
    if(e.target.name === 'question') {
      this.setState({question: e.target.value});
    }
    if(e.target.name === 'option1') {
      this.setState({option1: e.target.value});
    }
    if(e.target.name === 'option2') {
      this.setState({option2: e.target.value});
    }
    if(e.target.name === 'url1') {
      this.setState({url1: e.target.value});
    }
    if(e.target.name === 'url2') {
      this.setState({url2: e.target.value});
    }

  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.date === '' || this.state.question === '' || this.state.option1 === '' ||
        this.state.option2 === '' || this.state.url1 === '' || this.state.url2 === '') {
      alert('Leaving required fields blank!');
    }
    else {
      //submit new QOTD
      alert('New QOTD submitted: ' + this.state.question);

      let qotdKey = getUnformattedDate(this.state.date);
      let commentGroupId = 'QD' + qotdKey;
      var database = firebase.database();
      firebase.database().ref('apps/qotd/' + qotdKey).set({
        author: this.state.author,
        commentGroupId: commentGroupId,
        date: this.state.date,
        dateKey: qotdKey,
        question: this.state.question,
        option1: this.state.option1,
        option2: this.state.option2,
        img1: this.state.url1,
        img2: this.state.url2,
        votes1: 0,
        votes2: 0
      });
      //clear the form
      this.setState ({
        author: '',
        date: getFormattedDate(),
        question: initState.question,
        option1: initState.option1,
        option2: initState.option2,
        url1: initState.url1,
        url2: initState.url2
      });
    }

  }

  render() {

    return (
      <form id="qotd-form" onSubmit={this.handleSubmit}>
        <label>Active Date: {this.state.date} Unformatted: {getUnformattedDate(this.state.date)}</label>
        <input type="text" name="date" value={this.state.date} onChange={this.handleChange} placeholder="10-21-2017"/>
        <label>New QOTD: {this.state.question}</label>
        <textarea value={this.state.question} name="question" onChange={this.handleChange}></textarea>
        <label>Option 1: </label>
        <input type="text" name="option1" value={this.state.option1} onChange={this.handleChange}/>
        <label>Option 1 image url: </label>
        <input type="text" name="url1" value={this.state.url1} onChange={this.handleChange}/>
        <img src={this.state.url1} />
        <label>Option 2: </label>
        <input type="text" name="option2" value={this.state.option2} onChange={this.handleChange}/>
        <label>Option 2 image url: </label>
        <input type="text" name="url2" value={this.state.url2} onChange={this.handleChange}/>
        <img src={this.state.url2} />
        <input type="submit" name="submit" value="Submit" />
      </form>
    );
  }

}

export default QotdView;
