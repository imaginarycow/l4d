import React, { Component } from 'react';


export default class Doodle extends Component {

  render() {

    return (
      <div id="doodle">
        <h3>{this.props.title}</h3>
        <h5>by {this.props.author}</h5>
        <img src={this.props.imgUrl} />
      </div>
    );
  }
}
