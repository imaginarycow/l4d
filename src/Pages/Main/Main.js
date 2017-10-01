import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link,Switch } from 'react-router-dom';
import Navbar from '../../components/navbar';
import '../../css/App.css';

import QOTD from '../../Pages/Qotd/App';
import Blog from '../../Pages/Blog/App';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <h1>Home</h1>
      </div>
    );
  }
}

export default App;
