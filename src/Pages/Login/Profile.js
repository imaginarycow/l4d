import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginUser from '../../redux/actions/user_login';
import firebase from '../../firebase/firebase.js';
import toastr from 'toastr';
import '../../toastr/build/toastr.css';
import './css/profile.css';


class Profile extends Component {

  constructor() {
    super();

    this.state = {
      username: '',
      file: '',
      imageUrl: 'https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage1.png?alt=media&token=eb366724-4c6d-44d5-8672-dbb2fa06457c',
      imagePreviewUrl: '',
      editing: true
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectButton = this.selectButton.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
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

    if (this.state.username === '') {
      toastr.warning('Please enter a username that will be visible to other users');
      return;
    }

    var user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: this.state.username,
      photoURL: this.state.imageUrl
    }).then(function() {
      toastr.success('Thanks for setting up your account. You can now add comments.');
      this.setState({editing: false});
    }).catch(function(error) {
      console.log('Something went wrong. Please try again');
    });
  }

  selectButton(e) {
    e.preventDefault();
    this.setState({imageUrl: e.target.src});
    toastr.success('Got it, ill use that one.');
  }
  setUser(user) {
    this.setState({email: user.email});
  }

  render() {
    const that = this;

    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // that.setUser(user);
    } else {
      console.log('nu user logged in');
    }
    });

    if (!this.state.editing) {
      return <Redirect to='/' />;
    }
    // if (this.state.file !== '') {
    //   console.log(this.state.file);
    // }

    return (
      <div id="loginContainer">
        <form id="form" onSubmit={this.login}>
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
            <img onClick={this.selectButton} name="button1" src="https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage1.png?alt=media&token=eb366724-4c6d-44d5-8672-dbb2fa06457c" alt="user"/>
            <img onClick={this.selectButton} name="button2" src="https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage2.png?alt=media&token=c89d945c-230d-41da-bb0a-c016a16abb5e" alt="user" />
            <img onClick={this.selectButton} name="button3" src="https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage3.png?alt=media&token=4ead53ef-e040-4a44-9c53-1c8cb913f6ee" alt="user" />
            <img onClick={this.selectButton} name="button4" src="https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage4.png?alt=media&token=97ea6c39-0bb0-4139-b69c-49726542e37d" alt="user" />
            <img onClick={this.selectButton} name="button5" src="https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage5.png?alt=media&token=db768196-984b-4529-8f91-3b54f1db4d4e" alt="user" />
            <img onClick={this.selectButton} name="button6" src="https://firebasestorage.googleapis.com/v0/b/left4dev-b2aab.appspot.com/o/profileImages%2FuserImage6.png?alt=media&token=29bf02ee-1f9d-4656-a7d0-9222d0394b1a" alt="user" />
            {/* <img src={this.props.user.image} alt="user"/> */}
          </div>

          <input id="submit" type="submit" value="Done" onSubmit={this.handleSubmit}/>
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
