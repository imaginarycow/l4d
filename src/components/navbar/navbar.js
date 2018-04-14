import React, { Component } from 'react';
import ReactDOM, { findDOMNode } from 'react-dom';
import { connect } from 'react-redux';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import $ from 'jquery';
import firebase from '../../firebase/firebase.js';
import Logo from '../logo/logo.js';
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
        }
      });
      window.addEventListener("resize", this.closeDropDownMenu);
    }

    componentWillUnmount () {
      window.removeEventListener("resize", this.closeDropDownMenu);
    }

    updateUser(user, that) {
      var userRef = firebase.database().ref('users/'+user.uid+'/displayName');
      userRef.on('value', function(snapshot) {
        if (snapshot.val() !== null && snapshot.val() !== '') {
          console.log('change to label');
          that.setState({
            loggedInUser: {displayName: snapshot.val()}
          });
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

    render() {

  		return (
        <div id="navContainer">
          <Logo subtitle='Because Life is too short' />
          <div className="topnav" id="myTopnav" >
            <a id="icon" href="#" onClick={this.toggleMenu}>&#9776;</a>
            <ul className="navList" id="myNavList">
              <li onClick={this.closeDropDownMenu}><NavLink to="/Blog" className="navLink active">Blog</NavLink></li>
              <li onClick={this.closeDropDownMenu}><NavLink to="/QotW" className="navLink">QotW</NavLink></li>
              <li onClick={this.closeDropDownMenu}><NavLink to="/Comments" className="navLink">Comments</NavLink></li>
              <li onClick={this.closeDropDownMenu}><NavLink to={this.state.loginLink} className="navLink">{this.state.loggedInUser.displayName}</NavLink></li>
            </ul>
          </div>
        </div>
  		);
	}

}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps, null)(NavigationBar);
