import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navbar from './components/navbar';
import firebase from './firebase/firebase.js';
import './css/App.css';

import Home from './Pages/Main/Main';
import QOTD from './Pages/Qotd/App';
import Blog from './Pages/Blog/App';
import Worst from './Pages/The_Worst/App';
import Doodles from './Pages/Doodles/App';
import Comments from './Pages/Comment/App';
import Login from './Pages/Login/App';
import Admin from './Pages/Admin/App';

class App extends Component {

  componentWillMount() {
    console.log(this.props);
  }

  render() {

    var user = firebase.auth().currentUser;
    if (user) {
      console.log('user logged in:' + user.email);
    } else {
      console.log('no logged in user');
    }
      

    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Home}/>
              <Route path="/QOTD" component={QOTD}/>
              <Route path="/Blog" component={Blog}/>
              <Route path="/The Worst" component={Worst}/>
              <Route path="/Doodles" component={Doodles}/>
              <Route path="/Comment Box" component={Comments}/>
              <Route path="/Login" component={Login}/>
              <Route path="/Admin" component={Admin}/>
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {...state};
}

// function mapDispatchToProps(dispatch) {
//
//   return bindActionCreators({}, dispatch);
//
// }

export default connect(mapStateToProps, null)(App);
