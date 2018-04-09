import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import './css/App.css';

// Pages
import Home from './pages/Main/Main';
import QotW from './pages/QotW/App';
import Blog from './pages/Blog/App';
import BlogRead from './pages/Blog/components/blog_read';
import Comments from './pages/Comment/App';
import Login from './pages/Login/App';
import Logout from './pages/Login/Logout';
import Signup from './pages/Login/Signup';
import Profile from './pages/Login/Profile';
import Admin from './pages/Admin/App';
import PageNotFound from './pages/404/App';


class App extends Component {

  render() {

    return (
      <div id="appcontainer">
        {/* <div id="navigationContainer"> */}
        
        {/* </div>   */}

        <div id="routedAppContainer">  
          <Router>
            <div>
            <Navbar that={this}/>
              <Route exact path="/" component={Home} />
              <Route path="/Blog" component={Blog} />
              <Route path="/Comments" component={Comments} />
              <Route path="/QotW" component={QotW} />
              <Route path="/Profile" component={Profile} />
            </div>
          </Router>
        </div>    
        <Footer /> 
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
