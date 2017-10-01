import React, { Component } from 'react';
import Matchup from './matchup.js';
import '../App.css';
import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';

export default class Jumbotron extends Component {

  render() {
    return (
      <div id="jumbotron">
        <h1>{this.props.title}</h1>
        <Matchup image1={image1} image2={image2} image1Votes="1124" image2Votes="1045"/>
      </div>
    );
  }
}
