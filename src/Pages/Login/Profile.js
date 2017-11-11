import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginUser from '../../redux/actions/user_login';
import firebase from '../../firebase/firebase.js';
import toastr from 'toastr';
import '../../toastr/build/toastr.css';
import './css/profile.css';
import {imageArray} from '../../assets/profile_images/image_exporter';
import {validateString} from '../../utils/validations';

const defImage = require('../../assets/profile_images/userImage1.png');

class Profile extends Component {

  constructor() {
    super();

    this.state = {
      username: '',
      file: '',
      firebaseUser: null,
      imageUrl: null,
      imagePreviewUrl: '',
      defaultImage: defImage,
      editing: true,
      usernameError: false,
      returnToLogin: false
    }

    this.onChange = this.onChange.bind(this);
    this.logout = this.logout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectButton = this.selectButton.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.getImageButtons = this.getImageButtons.bind(this);

    toastr.options = {
      "positionClass": "toast-top-center",
      "closeButton": true,
      "preventDuplicates": true
    }
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {

      if (user !== null && user.email !== null) {

        var photo = user.photoURL !== null ? user.photoURL : this.state.defaultImage;
        this.setState({email: user.email,
          firebaseUser: user,
          username: user.displayName === null ? '' : user.displayName,
          imageUrl: photo});
      } else {
        this.setState({imageUrl: this.state.defaultImage});
      }
    });

  }

  onChange(e) {
    e.preventDefault();

    if (e.target.value.length <= 20) {
      this.setState({username: e.target.value});
    }
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }


  handleSubmit(e) {

    e.preventDefault();

    if (this.state.username === '' || this.state.username === null) {
      toastr.warning('Please enter a username that will be visible to other users');
      return;
    }

    if (!validateString(this.state.username)) {
        toastr.error("Special characters (!@#$%^&*, etc.) are not allowed.");
        return;
    }
    if (this.state.imageUrl === null) {
      this.setState({imageUrl: this.state.defaultImage});
    }

    if (this.state.firebaseUser !== null && this.state.firebaseUser.email !== null) {

      this.state.firebaseUser.updateProfile({
        displayName: this.state.username,
        photoURL: this.state.imageUrl,
      }).then(function() {
        toastr.success('Successfully edited your account.');
      }).then(() => {
        var updates = {};

        updates['users/'+this.state.firebaseUser.uid+'/displayName'] = this.state.username;
        firebase.database().ref().update(updates);
      })
      .catch(function(error) {
        return;
      });
      this.setState({editing: false});

    } else {
      toastr.error('Looks like you are not logged in.  Please login to edit your profile.');
      this.setState({returnToLogin: true});
    }

  }

  selectButton(e) {
    e.preventDefault();

    this.setState({imageUrl: e.target.src});
    toastr.success('Got it, ill use that one.');

    if (this.state.firebaseUser !== null) {

      this.state.firebaseUser.updateProfile({
        photoURL: e.target.src
      }).then(function() {
        console.log('success editing account in firebase');
      }).catch(function(error) {
        return;
      });
      var updates = {};
      updates['users/'+this.state.firebaseUser.uid+'/photoURL'] = e.target.src;
      return firebase.database().ref().update(updates);
    }
  }
  setUser(user) {
    this.setState({email: user.email});
  }

  logout(e) {
    e.preventDefault();

    firebase.auth().signOut().then(function() {
      toastr.success('You are now logged out');
    }, function(error) {
      console.log(error);
    });
    this.setState({returnToLogin: true});
  }

  getImageButtons() {
    var newArray = [];
    for (var i in imageArray) {
      newArray.push(<img onClick={this.selectButton} key={imageArray[i].src}
        name={imageArray[i].name} src={imageArray[i].src} alt={imageArray[i].alt}/>);
    }
    return newArray;
  }

  render() {

    if (!this.state.editing) {
      return <Redirect to='/' />;
    }
    if (this.state.returnToLogin) {
      return <Redirect to='/Login' />;
    }
    // if (this.state.file !== '') {
    //   console.log(this.state.file);
    // }

    const imagesToRender = this.getImageButtons();

    return (
      <div id="loginContainer">
        <div id="logoutDiv">
          <button id="logoutButton" onClick={this.logout}>Logout</button>
        </div>

        <form id="form" onSubmit={this.handleSubmit}>
          <h3 id="loginLabel">Edit Profile</h3>
          <label id="elabel">Email: {this.state.email}</label>
          <label>Username</label>
          <input type="text" value={this.state.username} onChange={this.onChange} name="username" maxLength="20" />
          {/* <label id="">Upload a Profile pic</label>
          <input type="file" id="profile_pic" name="profile_pic" accept="image/*" onChange={this.handleImageChange} />
          <div id="preview">
            <img src={this.state.imagePreviewUrl} alt=''/>
          </div> */}
          <label id="yourButtonLabel">Select a button</label>
          <div id="userButtonPreview">
            <img src={this.state.imageUrl} alt="Select one"/>
          </div>
          <div id="userimage">
            {imagesToRender}
          </div>
          <div id="doneButton">
            <input id="submit" type="submit" value="Done Editing" />
          </div>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {user: state.user};
}

// function mapDispatchToProps(dispatch) {
//
//   return bindActionCreators({LoginUser}, dispatch);
//
// }

export default connect(mapStateToProps, null)(Profile);
