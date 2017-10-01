import React, { Component } from 'react';
import Header from './components/header.js';
import Footer from './components/footer.js';
import Body from './components/body.js';
import './App.css';


class App extends Component {

  render() {

    return (
      <div>
        <Header title='Thats-the-Worst'/>
        <div id="site">
          <Body title="Container" />
          <Footer title='Powered by React'/>
        </div>
      </div>

    );
  }
}

export default App;
