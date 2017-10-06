import React, { Component } from 'react';
import { QOTD } from '../../redux/actions/get_question_of_the_day';
import '../../css/App.css';

class App extends Component {

  componentDidMount() {
    QOTD();
  }

  render() {
    return (
      <div className="App">
        <h1>Home</h1>
      </div>
    );
  }
}

export default App;
