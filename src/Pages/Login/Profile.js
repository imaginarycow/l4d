import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginUser from '../../redux/actions/user_login';
import firebase from '../../firebase/firebase.js';
import toastr from 'toastr';
import '../../toastr/build/toastr.css';
import './css/profile.css';

const src1 = 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage1.png?alt=media&token=eb366724-4c6d-44d5-8672-dbb2fa06457c';
const src2 = 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage2.png?alt=media&token=c89d945c-230d-41da-bb0a-c016a16abb5e';
const src3 = 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage3.png?alt=media&token=4ead53ef-e040-4a44-9c53-1c8cb913f6ee';
const src4 = 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage4.png?alt=media&token=97ea6c39-0bb0-4139-b69c-49726542e37d';
const src5 = 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage5.png?alt=media&token=db768196-984b-4529-8f91-3b54f1db4d4e';
const src6 = 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage6.png?alt=media&token=29bf02ee-1f9d-4656-a7d0-9222d0394b1a';
const src7 = 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage7.png?alt=media&token=38cb29e8-c27a-4a74-9618-1b92ba2f7022';
const src8 = 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage8.png?alt=media&token=6b0b106f-2ec5-4326-8afe-d2dec72a298a';
const src9 = 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage9.png?alt=media&token=b07ef388-5b24-4537-90d1-0c66f54837de';
const src10 = 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage10.png?alt=media&token=14e748c8-4637-4eae-ace0-be9436a6585a';
const src11 = 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage11.png?alt=media&token=25fc910b-8a28-4612-9ae1-f72968ebd707';
const src12 = 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage12.png?alt=media&token=dc61d240-d3cc-4713-b5d0-acce09513505';

class Profile extends Component {

  constructor() {
    super();

    this.state = {
      username: null,
      file: '',
      firebaseUser: null,
      imageUrl: null,
      imagePreviewUrl: '',
      defaultImage: 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage3.png?alt=media&token=4ead53ef-e040-4a44-9c53-1c8cb913f6ee',
      editing: true,
      returnToLogin: false
    }

    this.onChange = this.onChange.bind(this);
    this.logout = this.logout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectButton = this.selectButton.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
  }

  componentDidMount() {

    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
    if (user !== null) {
      this.setState({email: user.email,
        firebaseUser: user,
        username: user.displayName,
        imageUrl: user.photoURL});
    } else {

      toastr.error('Looks like you are not logged in.  Pleas login to edit your profile.');
    }
    });

//     var storage = firebase.storage().ref();
//     var imagesRef = storage.child('profileImages');
//     image12 = imagesRef.child('userImage12.png').getDownloadURL().then(function(url) {
//   // `url` is the download URL for 'images/stars.jpg'
//
//   // This can be downloaded directly:
//   var xhr = new XMLHttpRequest();
//   xhr.responseType = 'blob';
//   xhr.onload = function(event) {
//     var blob = xhr.response;
//   };
//   xhr.open('GET', url);
//   xhr.send();
//
//   // Or inserted into an <img> element:
//   var img = document.getElementById('myimg');
//   return url;
// }).catch(function(error) {
//   // Handle any errors
// });

  }

  onChange(e) {
    e.preventDefault();

    if (e.target.name === 'username') {
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
    if (this.state.imageUrl === null) {
      this.setState({imageUrl: this.state.defaultImage});
    }

    if (this.state.firebaseUser !== null) {

      this.state.firebaseUser.updateProfile({
        displayName: this.state.username,
        photoURL: this.state.imageUrl
      }).then(function() {
        toastr.success('Successfully edited your account.');
      }).catch(function(error) {
        return;
      });

    } else {
      toastr.error('Looks like you are not logged in.  Please login to edit your profile.');
    }
    this.setState({editing: false});

  }

  selectButton(e) {
    e.preventDefault();
    this.setState({imageUrl: e.target.src});
    toastr.success('Got it, ill use that one.');
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

    return (
      <div id="loginContainer">
        <div id="logoutDiv">
          <button id="logoutButton" onClick={this.logout}>Logout</button>
        </div>

        <form id="form" onSubmit={this.handleSubmit}>
          <h3 id="loginLabel">Edit Profile</h3>
          <label id="elabel">Email: {this.state.email}</label>
          <label id="">Username</label>
          <input id="" type="text" value={this.state.username} onChange={this.onChange} name="username" />
          {/* <label id="">Upload a Profile pic</label>
          <input type="file" id="profile_pic" name="profile_pic" accept="image/*" onChange={this.handleImageChange} />
          <div id="preview">
            <img src={this.state.imagePreviewUrl} alt=''/>
          </div> */}
          <label id="">Pick your button</label>
          <div id="userimage">
            <img onClick={this.selectButton} name="button1" src={src1} alt="user"/>
            <img onClick={this.selectButton} name="button2" src={src2} alt="user" />
            <img onClick={this.selectButton} name="button3" src={src3} alt="user" />
            <img onClick={this.selectButton} name="button4" src={src4} alt="user" />
            <img onClick={this.selectButton} name="button5" src={src5} alt="user" />
            <img onClick={this.selectButton} name="button6" src={src6} alt="user" />
            <img onClick={this.selectButton} name="button7" src={src7} alt="user" />
            <img onClick={this.selectButton} name="button8" src={src8} alt="user" />
            <img onClick={this.selectButton} name="button9" src={src9} alt="user" />
            <img onClick={this.selectButton} name="button10" src={src10} alt="user" />
            <img onClick={this.selectButton} name="button11" src={src11} alt="user" />
            <img onClick={this.selectButton} name="button12" src={src12} alt="user" />
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
