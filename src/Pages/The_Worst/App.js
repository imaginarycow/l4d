import React, { Component } from 'react';
import Header from './components/header.js';
import Footer from './components/footer.js';
import Body from './components/body.js';
import CommentArea from './comments/comment_area';
import './css/App.css';


class Worst extends Component {

  render() {

    return (
      <div>
        <div id="site">
          <Body title="Container" />
        </div>
      </div>

    );
  }
}

export default Worst;
