import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import Logout from './Pages/Login/Logout';
import Signup from './Pages/Login/Signup';
import Profile from './Pages/Login/Profile';
import Admin from './Pages/Admin/App';
import PageNotFound from './Pages/404/App';

class App extends Component {

  render() {

    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={Blog}/>
              <Route path="/Qotd" component={Qotd}/>
              <Route exact path="/Blog" component={Blog}/>
              {/* <Route path="/Blog/:title" component={Blog}/> */}
              <Route path={decodeURIComponent("/Blog/:title")} component={Blog}/>
              <Route path="/The Worst" component={Worst}/>
              <Route path="/Doodles" component={Doodles}/>
              <Route path="/Comment Box" component={Comments}/>
              <Route path="/Login" component={Login}/>
              <Route path="/Logout" component={Logout}/>
              <Route path="/Signup" component={Signup}/>
              <Route path="/Profile" component={Profile}/>
              <Route path="/Admin" component={Admin}/>
              <Route component={PageNotFound}/>
            </Switch>
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
