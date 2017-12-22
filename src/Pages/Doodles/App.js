import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Doodle from './doodle';
import DoodlesLoad from '../../redux/actions/doodles_get';
import './css/doodles.css';


class Doodles extends Component {

  constructor() {
    super();

    this.state = {doodlesArray: [], loaded: false}

    this.getDoodles = this.getDoodles.bind(this);
  }

  componentWillMount() {
    this.props.DoodlesLoad();
  }

  getDoodles(doods) {

    if (doods === null) {
      return [];
    }

    var doodsArray = [];

    for (var i in doods) {
      doodsArray.push(<Doodle key={doods[i].imgUrl} author={doods[i].author}
        title={doods[i].title} imgUrl={doods[i].imgUrl}/>);
    }
    return doodsArray;

  }

  render() {

    return (
      <div id="doodlesContainer">
        <h1 id="doodlestitle">Junk Pile</h1>
        <div id="doodles">
          {this.getDoodles(this.props.doodles)}
        </div>
      </div>

    );
  }
}

function mapStateToProps(state) {
    return {
      doodles: state.doodles
    };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({DoodlesLoad}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Doodles);
