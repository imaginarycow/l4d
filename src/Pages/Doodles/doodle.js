import React, { Component } from 'react';
import HR from './HR/hr';
import './css/doodle.css';

export default class Doodle extends Component {

  render() {

    return (
      <div id="doodle">
        <h3 id="doodletitle">{this.props.title}</h3>
        <h5 id="doodleauthor">by {this.props.author}</h5>
        <div id="doodleimage">
          <img src={this.props.imgUrl} />
        </div>
        <HR text='Junk Pile' />
      </div>
    );
  }
}
