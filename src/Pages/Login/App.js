import React, { Component } from 'react';
import './css/login.css';


class App extends Component {

  constructor() {
    super();

    this.state = {needsAccount: false}

    this.login = this.login.bind(this);
    this.createAccountView = this.createAccountView.bind(this);
  }

  login(e) {
    e.preventDefault();
    console.log('login attempted');
  }

  createAccountView(e) {
    e.preventDefault();
    console.log('switch to createAccount view');
  }

  render() {

      return (
        <div id="loginContainer">
          <form id="form" onSubmit={this.login}>
            <h3 id="loginLabel">Login</h3>
            <label id="elabel">Email</label>
            <input id="email" type="text" />
            <label id="plabel">Password</label>
            <input id="pass" type="text" />
            <input id="submit" type="submit" value="Sign In" />
            <label id="label3">Don't have a Left4Dev acount?</label>
            <button id="create" onClick={this.createAccountView}>Creat a free account</button>
          </form>
        </div>

      );
  }
}

export default App;
