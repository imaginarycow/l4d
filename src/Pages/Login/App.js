import React, { Component } from 'react';
import { validateEmail, validatePassword } from '../../utils/validations';
import './css/login.css';
import firebase from '../../firebase/firebase.js';

var eSuccess = false;
var pSuccess = false;

class Login extends Component {

  constructor() {
    super();

    this.state = {
      needsAccount: false,
      email: '',
      pass: '',
      attempts: 0
    }

    this.login = this.login.bind(this);
    this.signUp = this.signUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.toggleAccountView = this.toggleAccountView.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    if (e.target.name === 'email') {
      this.setState({email: e.target.value});
    }
    if (e.target.name === 'pass') {
      this.setState({pass: e.target.value});
    }
  }

  login(e) {
    e.preventDefault();
    //attempt user login with state.email & state.pass
    //after 3 login attempts, deny further attempts
    console.log('login attempted' + this.state.email + ' '+this.state.pass);
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).catch(function(error) {
    // Handle Errors here.
    // let attempCount = this.state.attempts + 1;
    // this.setState({attempts: attempCount});
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/wrong-password') {
      alert('Wrong password.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    });
  }
  signUp(e) {
    e.preventDefault();
    //attempt create user with state.email & state.pass
    //validate email address, verify unique user
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
      console.log(error);
    });
  }

  toggleAccountView(e) {
    e.preventDefault();
    console.log('toggle account view');
    if (this.state.needsAccount) {
      this.setState({needsAccount: false, pass: ''});
    }
    else {
      this.setState({needsAccount: true, pass: ''});
    }

  }

  render() {
      if (!this.state.needsAccount) {
        return (
          <div id="loginContainer">
            <form id="form" onSubmit={this.login}>
              <h3 id="loginLabel">Login</h3>
              <label id="elabel">Email</label>
              <input id="email" type="text" value={this.state.email} onChange={this.onChange} name="email" />
              <label id="plabel">Password</label>
              <input id="pass" type="password" value={this.state.pass} onChange={this.onChange} name="pass" />
              <input id="submit" type="submit" value="Sign In" />
              <label id="label3">Don't have a Left4Dev acount?</label>
              <button id="create" onClick={this.toggleAccountView}>Create a free account</button>
            </form>
          </div>
        );
      }
      else {
        return (
          <div id="loginContainer">
            <form id="form" onSubmit={this.signUp}>
              <h3 id="loginLabel">Create a new account</h3>
              <label id="elabel">Email</label>
              <input id="email" type="text" value={this.state.email} onChange={this.onChange} name="email" />
              <label id="plabel">Password</label>
              <input id="pass" type="password" placeholder="must be at least 8 characters" value={this.state.pass} onChange={this.onChange} name="pass" />
              <input id="submit" type="submit" value="Create Account" />
              <button id="create" onClick={this.toggleAccountView}>Back to sign in</button>
            </form>
          </div>
        );
      }
  }
}

export default Login;
