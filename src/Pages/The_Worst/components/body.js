import React, { Component } from 'react';
import Jumbotron from './jumbotron.js';
import Matchup from './matchup.js';
//import '../css/container.css';
import '../App.css';

import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';


export default class Body extends Component {

  render() {
    return (

      <div id="body">
        <div id="bodyContainer">
          <div id="adSpace1">AdSpace1</div>
          <Jumbotron id="jumbotron" title="Which is Worse?" />
          <div id="adSpace2">AdSpace2</div>
          <div id="matchUps">
            <Matchup image1={image3} image2={image4} image1Votes="153" image2Votes="386"/>
            <Matchup image1={image5} image2={image6} image1Votes="741" image2Votes="935"/>
            <Matchup image1={image3} image2={image4} image1Votes="153" image2Votes="386"/>
            <Matchup image1={image5} image2={image6} image1Votes="741" image2Votes="935"/>
            <Matchup image1={image3} image2={image4} image1Votes="153" image2Votes="386"/>
            <Matchup image1={image5} image2={image6} image1Votes="741" image2Votes="935"/>
            <Matchup image1={image3} image2={image4} image1Votes="153" image2Votes="386"/>
            <Matchup image1={image5} image2={image6} image1Votes="741" image2Votes="935"/>
            <Matchup image1={image3} image2={image4} image1Votes="153" image2Votes="386"/>
            <Matchup image1={image5} image2={image6} image1Votes="741" image2Votes="935"/>
          </div>
        </div>
      </div>

    );
  }
}
