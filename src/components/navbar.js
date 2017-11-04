import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar,Nav,NavItem } from 'react-bootstrap';
import firebase from '../firebase/firebase.js';
import Logo from './logo';
import '../css/nav.css';


class navbarInstance extends Component {

    constructor() {
      super();

      this.state = {
        loginLink: '/Login',
        loginLabel: 'Login',
        loggedInUser: {}
      }
    }

    render() {
      var that = this;

      firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        that.setState({loginLabel: user.email,
          loginLink: '/Logout'});
        // const loginLabel = user.email;
        // const loginLink = '/Logout';
      } else {
        that.setState({loginLabel: 'Login',
          loginLink: '/Login'});
        // const loginLabel = 'Login';
        // const loginLink = '/Login';
      }
      });



      return(

        <Navbar id="navbar" inverse collapseOnSelect>
          <Navbar.Header>
            <Link to="/"><Logo /></Link>
            {/* <Navbar.Brand>

            </Navbar.Brand> */}
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} ><Link to="/Blog" >Blog</Link></NavItem>
              <NavItem eventKey={2} ><Link to="/QotD" >QotD</Link></NavItem>
              <NavItem eventKey={3} ><Link to="/The Worst" >The Worst</Link></NavItem>
              <NavItem eventKey={4} ><Link to="/Doodles" >Doodles</Link></NavItem>
              <NavItem eventKey={5} ><Link to="/Comment Box" >Comment Box</Link></NavItem>
              <NavItem eventKey={6} ><Link to={this.state.loginLink} >{this.state.loginLabel}</Link></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      );
    }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps, null)(navbarInstance);
