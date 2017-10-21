import React, { Component } from 'react';
import BlogView from './views/blog_view';
import DoodlesView from './views/doodles_view';
import QotdView from './views/qotd_view';
import WorstView from './views/worst_view';
import './css/admin_view_css.css';

let apps = ['Pick App','Blog','Doodles','The Worst','QOTD'];
var options = [];

class Admin extends Component {

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
      case 'Doodles':
        return <div id="selected-view"><DoodlesView /></div>;
      case 'Blog':
        return <div id="selected-view"><BlogView /></div>;
      case 'The Worst':
        return <div id="selected-view"><WorstView /></div>;
      case 'QOTD':
        return <div id="selected-view"><QotdView /></div>;
      default:
        return <div id="selected-view">Select an App</div>;
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
      <div id="admin-view">
        <h3>Admin console</h3>
        <select onChange={this.handleChange}>
          {options}
        </select>
        {this.state.view}
      </div>
    );
  }
}

export default Admin;
