import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import './logo.css';


export default class Logo extends Component {

  constructor() {
    super();
 
    this.state = {redirect: false};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({redirect: true}, () => {this.setState({redirect: false})});
  }
  render() {

    if (this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <div id="logo" onClick={this.handleClick}>
        <h1 id="logoText">Left<span id="four">4</span>Dev</h1>
        <span>{this.props.subtitle}</span>
      </div>
    );
  }
}
