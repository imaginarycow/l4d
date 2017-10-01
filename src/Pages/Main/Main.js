import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom';
import Navbar from '../../components/navbar';
import '../../css/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Home</h1>
      </div>
    );
  }
}

export default App;
