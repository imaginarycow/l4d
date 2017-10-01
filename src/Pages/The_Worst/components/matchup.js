import React, { Component } from 'react';
import '../css/matchup.css';

export default class Matchup extends Component {

  render() {
    return (
      <div id="matchUp">
        <h4 id="vote1">Votes: {this.props.image1Votes}</h4>
        <img id="image1" src={this.props.image1} alt="image1"/>
        <h3 id="or">Vs</h3>
        <h4 id="vote2">Votes: {this.props.image2Votes}</h4>
        <img id="image2" src={this.props.image2} alt="image2"/>
      </div>
    );
  }
}
