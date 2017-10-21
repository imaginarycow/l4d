import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Doodle from './doodle';
import DoodlesLoad from '../../redux/actions/doodles_get';
import './css/doodles.css';

var doodlesArray = [];

class Doodles extends Component {

  componentWillMount() {
    this.props.DoodlesLoad();

  }

  render() {

    if (typeof this.props.doodles !== 'undefined') {
      console.log(this.props.doodles);
      let doods = this.props.doodles;
      for (var i in doods) {
        doodlesArray.push(<Doodle author={doods[i].author} title={doods[i].title} imgUrl={doods[i].imgUrl}/>);
      }
    }

    return (
      <div id="doodles">
        <h1>Doodles</h1>
        {doodlesArray}
      </div>

    );
  }
}

function mapStateToProps(state) {
    return {
      doodles: state.doodles,
    };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({DoodlesLoad}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Doodles);
