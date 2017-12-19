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
        loggedInUser: {displayName: 'Login'}
      }
      this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
      var link = '/Login';
      var label = 'Login';
      var that = this;

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

    render() {


      return(

        <Navbar id="navbar" inverse collapseOnSelect>
          <Navbar.Header>
            <Link to="/"><Logo /></Link>
            {/* <Navbar.Brand>

            </Navbar.Brand> */}
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav id="navlinkcontainer">
                <Link className="navlink" to="/Blog" >Blog</Link>
                <Link className="navlink" to="/QotD" >QotD</Link>
                <Link className="navlink" to="/The-Worst" >The Worst</Link>
                <Link className="navlink" to="/Junk-Pile" >Junk Pile</Link>
                <Link className="navlink" to="/Comments" >Comments</Link>
                <Link className="navlink" to={this.state.loginLink} >{this.state.loggedInUser.displayName}</Link>


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
