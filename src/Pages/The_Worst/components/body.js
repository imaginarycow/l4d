import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WorstLoad from '../../../redux/actions/worst_get';
import Jumbotron from './jumbotron.js';
import Matchup from './matchup.js';
//import '../css/container.css';
import '../css/App.css';

var Matchups = [];

class Body extends Component {

  componentWillMount() {
    this.props.WorstLoad();
  }

  render() {

    if (this.props.matchups != null) {
      const matchups = this.props.matchups;
      for (var i in matchups) {

        Matchups.push(<Matchup key={matchups[i]} image1={matchups[i].image1} image1text={matchups[i].img1text}
          image1votes={matchups[i].img1votes} image2={matchups[i].image2} image2text={matchups[i].img2text}
          image2votes={matchups[i].img2votes} commentGroupId={matchups[i].commentGroupId}/>);
      }
    }

    return (

      <div id="body">
        <div id="bodyContainer">
          <div id="adSpace1">AdSpace1</div>
          <div id="adSpace2">AdSpace2</div>
          <div id="matchUps">
            <h2>Which is Worse?</h2>
            {Matchups}
          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
    return {
      matchups: state.worstMatchups,
    };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({WorstLoad}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Body);
