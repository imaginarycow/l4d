import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LogoutUser from '../../redux/actions/user_logout';
import './css/logout.css';


class Logout extends Component {

  constructor() {
    super();

    this.state = {
      needsAccount: false,
      email: '',
      pass: '',
      username: '',
      attempts: 0,
    }

    this.logout = this.logout.bind(this);
  }

  logout(e) {
    e.preventDefault();

    this.props.LogoutUser();
  }

  render() {

    if (this.props.user.email === 'undefined') {
      return <Redirect to='/Login'/>;
    }

    return (
      <div id="logoutContainer">

        <div id="innerContainer">

            <h3 id="plabel">Profile</h3>

            <label id="elabel">Email</label>
            <label id="email">{this.props.user.email}</label>

            <label id="ulabel">Username</label>
            <label id="username">{this.props.user.username}</label>
            <label id="userimage">User selected image</label>
            <div id="userimage">
              <img src="https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage1.png?alt=media&token=eb366724-4c6d-44d5-8672-dbb2fa06457c" alt="user"/>
              <img src="https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage2.png?alt=media&token=c89d945c-230d-41da-bb0a-c016a16abb5e" alt="user" />
              <img src="https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage3.png?alt=media&token=4ead53ef-e040-4a44-9c53-1c8cb913f6ee" alt="user" />
              <img src="https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage4.png?alt=media&token=97ea6c39-0bb0-4139-b69c-49726542e37d" alt="user" />
              <img src="https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage5.png?alt=media&token=db768196-984b-4529-8f91-3b54f1db4d4e" alt="user" />
              <img src="https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage6.png?alt=media&token=29bf02ee-1f9d-4656-a7d0-9222d0394b1a" alt="user" />
              {/* <img src={this.props.user.image} alt="user"/> */}
            </div>

            <div id="logoutButton">
              <button onClick={this.logout} >Logout</button>
            </div>

        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
    return {user: state.user};
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({LogoutUser}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
