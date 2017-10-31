import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navbar from './components/navbar';
import firebase from './firebase/firebase.js';
import './css/App.css';

import Home from './Pages/Main/Main';
import Qotd from './Pages/Qotd/App';
import Blog from './Pages/Blog/App';
import Worst from './Pages/The_Worst/App';
import Doodles from './Pages/Doodles/App';
import Comments from './Pages/Comment/App';
import Login from './Pages/Login/App';
import Signup from './Pages/Login/Signup';
import Profile from './Pages/Login/Profile';
import Admin from './Pages/Admin/App';

class App extends Component {

  componentWillMount() {
    console.log(this.props);
  }

  render() {

    //check if user exists in store
    if (this.props.user.email === 'undefined') {
      console.log('user not logged in');
      var user = firebase.auth().currentUser;
      if (user !== null) {
        //set user in Redux
        user.providerData.forEach(function (profile) {



          console.log("  Name: "+profile.displayName);
          console.log("  Email: "+profile.email);
          console.log("  Photo URL: "+profile.photoURL);
        });

        console.log('user logged in:' + user.email);
      } else {
        console.log('no logged in user');
      }
    }

    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <Route exact path="/" component={Home}/>
              <Route path="/Qotd" component={Qotd}/>
              <Route path="/Blog" component={Blog}/>
              <Route path="/The Worst" component={Worst}/>
              <Route path="/Doodles" component={Doodles}/>
              <Route path="/Comment Box" component={Comments}/>
              <Route path="/Login" component={Login}/>
              <Route path="/Signup" component={Signup}/>
              <Route path="/Profile" component={Profile}/>
              <Route path="/Admin" component={Admin}/>
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {user: state.user};
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({}, dispatch);

}

export default connect(mapStateToProps, null)(App);
