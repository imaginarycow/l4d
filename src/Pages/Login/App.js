import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginUser from '../../redux/actions/user_login';
import firebase from '../../firebase/firebase.js';
import './css/login.css';
import toastr from 'toastr';
import '../../toastr/build/toastr.css';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      needsAccount: false,
      email: '',
      pass: '',
      username: '',
      attempts: 0,
      authenticated: false
    }

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
    this.sendPasswordReset = this.sendPasswordReset.bind(this);
    this.toggleAccountView = this.toggleAccountView.bind(this);

    toastr.options = {
      "positionClass": "toast-top-center",
      "closeButton": true,
      "preventDuplicates": true
    }
  }

  onChange(e) {
    e.preventDefault();
    if (e.target.name === 'email') {
      this.setState({email: e.target.value});
    }
    if (e.target.name === 'username') {
      this.setState({username: e.target.value});
    }
    if (e.target.name === 'pass') {
      this.setState({pass: e.target.value});
    }
  }

  login(e) {
    e.preventDefault();
    //attempt user login with state.email & state.pass
    //after 3 login attempts, deny further attempts
    // if (this.state.attempts >= 3) {
    //   alert('You have failed to login at least 3 times. You can reset your password, or wait 10 minutes and try again.');
    // }
    const email = this.state.email;
    const pass = this.state.pass;
    this.props.LoginUser(email, pass);
  }

  sendPasswordReset(e) {
    e.preventDefault();

    //send password reset email

    const email = this.state.email;
    firebase.auth().sendPasswordResetEmail(email)
    .then(function() {
      // Password reset email sent.
      toastr.warning('An email to reset your password has been sent to ' + email);
    })
    .catch(function(error) {
      // Error occurred. Inspect error.code.
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/invalid-email') {
        toastr.error('Invalid email.');
      }
      if (errorCode === 'auth/user-not-found') {
        toastr.error('User not found.');
      }
      else {
        toastr.error(errorMessage);
      }
    });
  }

  toggleAccountView(e) {
    e.preventDefault();

    if (this.state.needsAccount) {
      this.setState({needsAccount: false, pass: ''});
    }
    else {
      this.setState({
        needsAccount: true,
        email: '',
        pass: ''
      });
    }
    return <Redirect to='/'/>;
  }

  render() {

    if (this.props.user.email !== 'undefined' && this.props.user.email !== null) {
      return <Redirect to='/'/>;
      // console.log(this.props.lastPage.link);
      // return <Redirect to={this.props.lastPage.link}/>;
    }

    if (this.state.needsAccount) {
      return <Redirect to='/Signup' />;
    }

    return (
      <div id="outerContainer">
        <div id="loginContainer">
          <form id="form" onSubmit={this.login}>
            <h3 id="loginLabel">Sign In</h3>
            <label id="elabel">Email</label>
            <input id="email" type="text" value={this.state.email} onChange={this.onChange} name="email" />
            <label id="passlabel">Password</label>
            <input id="pass" type="password" value={this.state.pass} onChange={this.onChange} name="pass" />
            <input id="submit" type="submit" value="Sign In" />
            <button id="reset" onClick={this.sendPasswordReset}>I forgot my password ;(</button>
            <label id="label3"></label>
            <button id="create" onClick={this.toggleAccountView}>I don't have a Left4Dev account</button>
          </form>
        </div>
      </div>  
    );
  }
}

function mapStateToProps(state) {
    return {user: state.user, lastPage: state.lastPage};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({LoginUser}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
