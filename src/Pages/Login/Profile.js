import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import LoginUser from '../../redux/actions/user_login';
import firebase from '../../firebase/firebase.js';
import './css/profile.css';


class Profile extends Component {

  constructor() {
    super();

    this.state = {
      email: '',
      username: '',
      file: '',
      imagePreviewUrl: '',
      editing: true
    }

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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


  }

  render() {

    if (!this.state.editing) {
      return <Redirect to='/Signup' />;
    }
    if (this.state.file !== '') {
      console.log(this.state.file);
    }
    console.log(this.props.location.state.email);

    return (
      <div id="loginContainer">
        <form id="form" onSubmit={this.login}>
          <h3 id="loginLabel">Edit Profile</h3>
          <label id="elabel">Email: {this.props.location.state.email}</label>
          <label id="">Username</label>
          <input id="" type="text" value={this.state.username} onChange={this.onChange} name="username" />
          <label id="">Upload a Profile pic</label>
          <input type="file" id="profile_pic" name="profile_pic" accept="image/*" onChange={this.handleImageChange} />
          <div id="preview">
            <img src={this.state.imagePreviewUrl} alt=''/>
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
