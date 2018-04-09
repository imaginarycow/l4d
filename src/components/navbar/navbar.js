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

    toggleMenu() {

      const menuButton = findDOMNode(this.refs.menuButton);
      $(menuButton).toggleClass("active");

      const line1 = findDOMNode(this.refs.line1);
      $(line1).toggleClass("active");
      const line2 = findDOMNode(this.refs.line2);
      $(line2).toggleClass("active");
      const line3 = findDOMNode(this.refs.line3);
      $(line3).toggleClass("active");

      const menu = findDOMNode(this.refs.navigationMenu);
      $(menu).slideToggle("slow");
      
    }

    render() {

  		return (
        <div>

          <div id="menu-button"  ref="menuButton" onClick={this.toggleMenu}>
            <div id="line-1" ref="line1" ></div>
            <div id="line-2" ref="line2" ></div>
            <div id="line-3" ref="line3" ></div>
          </div>

          <div id="navigationMenu" ref="navigationMenu">
            <Logo subtitle='Because Life is too short' />
            <div id="navListContainer">
              <ul className="navList">
                <li><NavLink to="/Blog" className="navLink">Blog</NavLink></li>
                <li><NavLink to="/QotW" className="navLink">QotW</NavLink></li>
                <li><NavLink to="/Comments" className="navLink">Comments</NavLink></li>
                <li><NavLink to={this.state.loginLink} className="navLink">{this.state.loggedInUser.displayName}</NavLink></li>
              </ul>
            </div>
          </div>

        </div>
  		);
	}

}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps, null)(NavigationBar);
