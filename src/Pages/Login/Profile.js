import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LogOutUser from '../../redux/actions/user_logout';
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
      aliasAvailable: true,
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
      "preventDuplicates": true,
      "showDuration": "100",
      "hideDuration": "1000",
      "timeOut": "1000",
      "extendedTimeOut": "2000"
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
    var that = this;
    var currText = e.target.value;

    if (e.target.value.length <= 20) {
      this.setState({username: currText});
    }
    //check alias object to see if username is available
    var aliasRef = firebase.database().ref('aliases/'+currText);
    aliasRef.once('value', function(snapshot) {

      if (snapshot.val() !== null && that.state.firebaseUser.displayName !== currText) {
        that.setState({aliasAvailable: false});
      }else {
        that.setState({aliasAvailable: true});
      }
    });
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
    var alias = this.state.username;
    if (alias === '' || alias === null) {
      toastr.warning('Please enter a username that will be visible to other users');
      return;
    }
    if(!this.state.aliasAvailable) {
      toastr.error('username ' + alias + ' is not available');
      return;
    }

    if (!validateString(alias)) {
        toastr.error("Special characters (!@#$%^&*, etc.) are not allowed.");
        return;
    }
    if (this.state.imageUrl === null) {
      this.setState({imageUrl: this.state.defaultImage});
    }

    if (this.state.firebaseUser !== null && this.state.firebaseUser.email !== null) {
      const oldAlias = this.state.firebaseUser.displayName;
      this.state.firebaseUser.updateProfile({
        displayName: alias,
        photoURL: this.state.imageUrl,
      }).then(() => {
        var updates = {};
        updates['users/'+this.state.firebaseUser.uid+'/displayName'] = alias;
        firebase.database().ref().update(updates);
      }).then(() => {
        var alias = this.state.username;
        const newAlias = this.state.firebaseUser.uid;
        console.log('alias '+alias+' set');
        firebase.database().ref('aliases/'+alias).set(newAlias);
      })
      //remove old alias
      .then(() => {
        if (alias !== oldAlias) {
          firebase.database().ref('aliases/'+oldAlias).remove();
        }
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
    this.props.LogOutUser();
    var that = this;
    firebase.auth().signOut().then(function() {
    }, function(error) {
      console.log(error);
    });
    that.setState({returnToLogin: true});
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
    var availability = this.state.aliasAvailable ? 'Available' : 'Not Available!';

    return (
      <div id="profileContainer">
        <div id="userButtonPreview">
          <img src={this.state.imageUrl} alt="Select one"/>
        </div>
        <label id="elabel">Email: {this.state.email}</label>
        <div id="aliasDiv">
          <label id="aliaslabel">Alias</label>
          <input id="aliasInput" type="text" value={this.state.username} onChange={this.onChange} name="username" maxLength="20" />
          <label id="availLabel">{availability}</label>
        </div>
        
        <div id="logoutDiv">
          <button id="logoutButton" onClick={this.logout}>Logout</button>
        </div>

        <form id="profileform" onSubmit={this.handleSubmit}>
          <div id="doneEditingButton">
            <input type="submit" value="Done" />
          </div>

          {/* <label id="">Upload a Profile pic</label>
          <input type="file" id="profile_pic" name="profile_pic" accept="image/*" onChange={this.handleImageChange} />
          <div id="preview">
            <img src={this.state.imagePreviewUrl} alt=''/>
          </div> */}
          <label id="yourButtonLabel">Select a button</label>
          
          <div id="userimages">
            {imagesToRender}
          </div>

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {user: state.user};
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({LogOutUser}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
