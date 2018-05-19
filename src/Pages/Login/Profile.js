import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ColorPicker from '../../components/color_picker/index';
import {CompactPicker as Picker} from 'react-color';
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

    this.state = defaultState;

    this.onChange = this.onChange.bind(this);
    this.logout = this.logout.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.selectButton = this.selectButton.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.setActiveColor = this.setActiveColor.bind(this);
    this.getColorPicker = this.getColorPicker.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);

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

        this.setState({ firebaseUser: user });
      } 

    });

    if (this.props.user.uid !== 'undefined') {
      const user = this.props.user;
      this.setState({ user: user, 
        alias: this.props.user.displayName,
        color1: user.color1,
        color2: user.color2  
      });
    } 
    else {
      this.setState({ returnToLogin: true });
    }
    

    document.getElementById('color1').classList.add('active-color');

  }

  onChange(e) {
    e.preventDefault();
    var that = this;
    var currText = e.target.value;

    if (e.target.value.length <= 20) {
      this.setState({alias: currText});
    }
    //check alias object to see if username is available
    var aliasRef = firebase.database().ref('aliases/'+currText);
    aliasRef.once('value', function(snapshot) {

      if (snapshot.val() !== null && that.state.user.displayName !== currText) {
        that.setState({aliasAvailable: false});
      }else {
        that.setState({aliasAvailable: true});
      }
    });
  }

  getColorPicker(activeColor) {

    if (activeColor === 'color1') {
      const color = this.state.color1;
      return (
        <Picker
          color={ color }
          onChange={ this.handleColorChange }
        />
      )
    }
    else {
      const color = this.state.color2;
      return (
        <Picker
          color={ color }
          onChange={ this.handleColorChange }
          
        />
      )
    }
    
  }

  handleColorChange(color) {
    
    if (this.state.activeColor === 'color1') {
      this.setState({ color1: color.hex });
    } 
    if (this.state.activeColor === 'color2') {
      this.setState({ color2: color.hex });
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
    const alias = this.state.alias;
    const user = this.state.user;

    if (alias === '' || alias === null) {
      toastr.warning('Please enter a username that will be visible to other users');
      return;
    }
    if(!this.state.aliasAvailable) {
      toastr.error('alias ' + alias + ' is not available');
      return;
    }

    if (!validateString(alias)) {
        toastr.error("Special characters (!@#$%^&*, etc.) are not allowed.");
        return;
    }

    if (user!== null) {
      const oldAlias = user.displayName;
      this.state.firebaseUser.updateProfile({
        displayName: alias
      }).then(() => {
        var updates = {};
        updates['users/'+user.uid+'/displayName'] = alias;
        updates['users/'+user.uid+'/color1'] = this.state.color1;
        updates['users/'+user.uid+'/color2'] = this.state.color2;
        firebase.database().ref().update(updates);
      }).then(() => {
        const newAlias = user.uid;
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

  setActiveColor(e) {

    if (typeof e.target !== 'undefined'){

      const id = e.target.id;
      this.setState({activeColor: id});
      
      if (id === 'color1') {
        document.getElementById('color1').classList.add('active-color');
        document.getElementById('color2').className = 'colors';
      } else {
        document.getElementById('color2').classList.add('active-color');
        document.getElementById('color1').className = 'colors';
      }
    
    }
    
  }

  render() {

    if (!this.state.editing) {
      return <Redirect to='/Blog' />;
    }
    if (this.state.returnToLogin) {
      return <Redirect to='/Login' />;
    }
    // if (this.state.file !== '') {
    //   console.log(this.state.file);
    // }

    var availability = this.state.aliasAvailable ? 'Available' : 'Not Available!';
    const user = this.state.user;

    return (
      <div id="profileContainer">
        <div id="userButtonPreview" style={{backgroundColor: this.state.color1}}>
          <h4 style={{color: this.state.color2}}>4</h4>
        </div>
        <div id="colorsContainer">
          <div id="color1" className="colors" style={{backgroundColor: this.state.color1}} onClick={this.setActiveColor}></div>
          <div id="color2" className="colors" style={{backgroundColor: this.state.color2}} onClick={this.setActiveColor}></div>
        </div>
        <div>
          {this.getColorPicker(this.state.activeColor)}
        </div>
        <label id="elabel">Email: {user.email}</label>
        <div id="aliasDiv">
          <label id="aliaslabel">Alias</label>
          <input id="aliasInput" type="text" value={this.state.alias} onChange={this.onChange} name="username" maxLength="20" />
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
          
          {/* <div id="userimages">
            {imagesToRender}
          </div> */}

        </form>
      </div>
    );
  }
}

const defaultState = {
  aliasAvailable: true,
  alias: '',
  file: '',
  firebaseUser: null,
  user: {},
  editing: true,
  usernameError: false,
  returnToLogin: false,
  activeColor: 'color1',
  color1: '#063852',
  color2: '#f0810f'
}

function mapStateToProps(state) {
    return {user: state.user};
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({LogOutUser}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
