import React, { Component } from 'react';
import '../css/choice.css';

export default class Choice extends Component {

  componentWillMount() {
    this.setState({voted:false});
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.voted != null && this.state.voted === false) {
      this.setState({
        voted: true
      });
    } else {
      alert("You cannot vote more than once!");
    }
  }

  render() {
    return (
      <div id="choice">
        <h3>{this.props.text}</h3>
        <h5 id="votes">{this.props.votes}</h5>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="submit" value="vote" />
        </form>
        <img src={this.props.img} />
      </div>
    );
  }
}
