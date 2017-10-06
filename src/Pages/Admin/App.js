import React, { Component } from 'react';
import Selector from '../../components/selector';

let apps = ['Blog','Apis','The Worst','QOTD'];

export default class Admin extends Component {

  componentDidMount() {

  }

  render () {

    return (
      <div>
        Admin console
        <Selector options={apps}/>
      </div>
    );
  }
}
