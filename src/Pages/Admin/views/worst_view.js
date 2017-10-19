import React, { Component } from 'react';
import { getFormattedDate } from '../../../utils/dates';
import '../css/worst_view_css.css';

const initState = {title: '', date: '', sit1: '', sit2: '', url1: '', url2: ''};

class WorstView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: getFormattedDate(),
      title: initState.title,
      sit1: initState.sit1,
      sit2: initState.sit2,
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
    if(e.target.name === 'title') {
      this.setState({title: e.target.value});
    }
    if(e.target.name === 'sit1') {
      this.setState({sit1: e.target.value});
    }
    if(e.target.name === 'sit2') {
      this.setState({sit2: e.target.value});
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

    if (this.state.date === '' || this.state.title === '' || this.state.sit1 === '' ||
        this.state.sit2 === '' || this.state.url1 === '' || this.state.url2 === '') {
      alert('Leaving required fields blank!');
    }
    else {
      //submit new QOTD
      alert('New Worst Matchup submitted: ' + this.state.question);
    }

  }

  render() {

    return (
      <form id="worst-form" onSubmit={this.handleSubmit}>
        <label>Date: {this.state.date}</label>
        <input type="text" name="date" value={this.state.date} onChange={this.handleChange} placeholder="10-21-2017"/>
        <label>Worst Matchup Title: {this.state.title}</label>
        <input type="text" name="title" value={this.state.title} onChange={this.handleChange}></input>
        <label>Situation 1 text: </label>
        <input type="text" name="sit1" value={this.state.sit1} onChange={this.handleChange}/>
        <label>Situation 1 image url: </label>
        <input type="text" name="url1" value={this.state.url1} onChange={this.handleChange}/>
        <img src={this.state.url1} />
        <label>Situation 2 text: </label>
        <input type="text" name="sit2" value={this.state.sit2} onChange={this.handleChange}/>
        <label>Situation 2 image url: </label>
        <input type="text" name="url2" value={this.state.url2} onChange={this.handleChange}/>
        <img src={this.state.url2} />
        <input type="submit" name="submit" value="Submit" />
      </form>
    );
  }

}

export default WorstView;
