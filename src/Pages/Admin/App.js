import React, { Component } from 'react';
import BView from './views/blog_view';

let apps = ['Pick App','Blog','Apis','The Worst','QOTD'];
var options = [];

export default class Admin extends Component {

  constructor() {
    super();

    this.state = {
      app: '',
      view: null
    }

    this.getOptions = this.getOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    var appSelected = e.target.value;
    this.setState(
      {
        app: appSelected,
        view: this.updateDisplay(appSelected)
      }
    );
    this.updateDisplay(appSelected);
  }
  //update display based on app selected
  updateDisplay(app) {
    switch(app) {
      case 'Apis':
        return <div>Apis view</div>;
      case 'Blog':
        return <div><BView /></div>;
      case 'The Worst':
        return <div>The Worst view</div>;
      case 'QOTD':
        return <div>Qotd view</div>;
      default:
        return <div>Select an App</div>;
    }
  }

  getOptions() {
      options = apps.map((app) => {
        return <option key={app} >{app}</option>
      })
    }

  render () {

    this.getOptions();
    return (
      <div>
        Admin console
        <select onChange={this.handleChange}>
          {options}
        </select>
        {this.state.view}
      </div>
    );
  }
}
