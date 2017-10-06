import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import './css/App.css';

import Home from './Pages/Main/Main';
import QOTD from './Pages/Qotd/App';
import Blog from './Pages/Blog/App';
import Worst from './Pages/The_Worst/App';
import Apis from './Pages/Awesome_Apis/App';
import Comments from './Pages/Contact/App';
import Login from './Pages/Login/App';
import Admin from './Pages/Admin/App';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Home}/>
              <Route path="/QOTD" component={QOTD}/>
              <Route path="/Blog" component={Blog}/>
              <Route path="/The Worst" component={Worst}/>
              <Route path="/Awesome Apis" component={Apis}/>
              <Route path="/Comment Box" component={Comments}/>
              <Route path="/Login" component={Login}/>
              <Route path="/Admin" component={Admin}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
