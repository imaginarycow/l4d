import React, { Component } from 'react';
import HR from './HR/hr';
import './css/doodle.css';

export default class Doodle extends Component {

  render() {

    return (
      <div id="doodle">
        <h3 id="title">{this.props.title}</h3>
        <h5 id="author">by {this.props.author}</h5>
        <img id="image" src={this.props.imgUrl} />
        <HR text='Junk Pile' />
      </div>
    );
  }
}
