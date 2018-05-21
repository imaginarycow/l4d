import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import $ from 'jquery';
import firebase from '../../firebase/firebase.js';
import Logo from '../logo/logo.js';
import { updateLoggedInUser } from '../../redux/actions/user_login';
import './nav.css';


class NavigationBar extends Component {

    constructor() {
      super();

      this.state = {
        loginLink: '/Login',
        loggedInUser: {displayName: 'Login'}
      }
      this.toggleMenu = this.toggleMenu.bind(this);
      this.updateUser = this.updateUser.bind(this);
      this.handleResize =this.closeDropDownMenu.bind(this);
      this.getAvailableTabs = this.getAvailableTabs.bind(this);
    }

    componentDidMount() {
      let link = '/Login';
      let label = 'Login';
      let that = this;

      firebase.auth().onAuthStateChanged((user) => {

        if (user !== null && user.email !== null) {
          link = '/Profile';
          that.setState({loginLink: link, loggedInUser: user});
          that.updateUser(user, that);
        } else {
          link =  '/Login';
          that.setState({loginLink: link, loggedInUser: {displayName: 'Login'}});
          that.props.updateLoggedInUser({email: null});
        }
      });
      window.addEventListener("resize", this.closeDropDownMenu);
    }

    componentWillUnmount () {
      window.removeEventListener("resize", this.closeDropDownMenu);
    }

    updateUser(user, that) {
      //get custom firebase user object
      var userRef = firebase.database().ref('users/'+user.uid);
      userRef.on('value', function(snapshot) {
        if (snapshot.val() !== null && snapshot.val() !== '') {
          const userName = snapshot.val().displayName !== "" ? snapshot.val().displayName : snapshot.val().email;
          that.setState({
            loggedInUser: {displayName: userName}
          });
          that.props.updateLoggedInUser(snapshot.val());
        }
      })
    }

    closeDropDownMenu () {
      const el = document.getElementById('myNavList');
      if (el.classList.contains('responsive')) {
        el.className = "navList";
      }
    }

    toggleMenu() {
       
      const el = document.getElementById('myNavList');
      if (el.className === "navList") {
        el.className += " responsive";
      } else {
        el.className = "navList";
      }
      
    }

    getAvailableTabs() {

      let tabs = [];
      tabs.push(<li key="Blog" onClick={this.closeDropDownMenu}><NavLink to="/Blog" className="navLink active">Blog</NavLink></li>);
      tabs.push(<li key="Qotw" onClick={this.closeDropDownMenu}><NavLink to="/QotW" className="navLink">QotW</NavLink></li>);
      tabs.push(<li key="About" onClick={this.closeDropDownMenu}><NavLink to="/About" className="navLink">About</NavLink></li>);
      tabs.push(<li key="Contact" onClick={this.closeDropDownMenu}><NavLink to="/Contact" className="navLink">Contact</NavLink></li>);
      tabs.push(<li key="Login" onClick={this.closeDropDownMenu}><NavLink to={this.state.loginLink} className="navLink">{this.state.loggedInUser.displayName}</NavLink></li>);

      if (this.props.user.permissions){
        let perms = this.props.user.permissions;
        let auth = false;
        for (var i in perms) {
          let perm = perms[i];
          if (perm.includes('KING')) {
            tabs.push(<li key="admin" onClick={this.closeDropDownMenu}><NavLink to="/Admin" className="navLink">Admin</NavLink></li>);
          }
        }
      }

      return tabs;
    }

    render() {
      let tabs = this.getAvailableTabs();
      
  		return (
        <div id="navContainer">
          <Logo subtitle='Because Life is too short' />
          <div className="topnav" id="myTopnav" >
            <a id="icon" href="#" onClick={this.toggleMenu}>&#9776;</a>
            <ul className="navList" id="myNavList">{tabs}</ul>
          </div>
        </div>
  		);
	}

}

function mapStateToProps(state) {
    return { user: state.user };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({updateLoggedInUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
