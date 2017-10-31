import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logUserIn } from '../../redux/actions/user_login';
import firebase from '../../firebase/firebase.js';
import './css/login.css';


class Signup extends Component {

  constructor() {
    super();

    this.state = {
      needsAccount: true,
      email: '',
      pass: '',
      stepTwo: false
    }

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

  signUp(e) {
    e.preventDefault();
    //attempt create user with state.email & state.pass
    //validate email address, verify unique user done by firebase
    var errorThrown = false;
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.pass)
      .then((user) => {
        console.log(user);
        this.setState({stepTwo: true});
        this.props.logUserIn(user);
        user.sendEmailVerification().then(() => {
            alert('An email verification has been sent to '+user.email+'.' +
              'If you do not see it, check your junk folder. ');
        }).catch(() => {
          alert('Something went wrong, please try that again.');
        });

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/weak-password') {
          alert('The password is too weak.');
        } else if (errorCode === 'auth/email-already-in-use') {
          alert('Email already in use.');
        } else if (errorCode === 'auth/invalid-email') {
          alert('Invalid email.');
        } else {
          alert(errorMessage);
        }
          console.log(error);
      });

  }

  toggleAccountView(e) {
    e.preventDefault();

    if (this.state.needsAccount) {
      this.setState({needsAccount: false, pass: ''});
    }
    else {
      this.setState({needsAccount: true, pass: ''});
    }
  }

  render() {

    if (!this.state.needsAccount) {
      return <Redirect to='/Login' />
    }
    if (this.state.stepTwo) {
      return <Redirect to={{
        pathname: '/Profile',
        state: {email: this.state.email}
      }}/>
    }

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

function mapStateToProps(state) {
    return {user: state.user};
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({logUserIn}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
