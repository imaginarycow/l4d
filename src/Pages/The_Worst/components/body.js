import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WorstLoad from '../../../redux/actions/worst_get';
import Matchup from './matchup.js';
import '../css/App.css';


class Body extends Component {

  constructor(props) {
    super(props);

    this.getMappedMatchups = this.getMappedMatchups.bind(this);

  }

  componentWillMount() {
    this.props.WorstLoad();
  }

  getMappedMatchups() {

    var MatchupsArray = [];
    const matchups = this.props.matchups;
    for (var i in matchups) {
      MatchupsArray.push(<Matchup key={matchups[i]+i} image1={matchups[i].image1} image1text={matchups[i].img1text}
        image1votes={matchups[i].img1votes} image2={matchups[i].image2} image2text={matchups[i].img2text}
        image2votes={matchups[i].img2votes} commentGroupId={matchups[i].commentGroupId}
        matchKey={matchups[i].dateKey} />);
    }

    return MatchupsArray;
  }

  render() {

    const Matchups = this.getMappedMatchups();

    return (
      <div id="matchUps">
        <h2>Which is Worse?</h2>
        {Matchups}
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
