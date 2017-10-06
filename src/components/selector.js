import React, {Component} from 'react';

var options = [];

class Selector extends Component {

  constructor(props) {
    super(props);

    this.getOptions = this.getOptions.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    console.log("change to selector" + e.target.value);
  }

  getOptions(list) {

      for (var i in list) {
        options.push(<option key={list[i]}>{list[i]}</option>);
      }
    }

  render () {
    this.getOptions(this.props.options);
    return (
      <select id="selector" onChange={this.onChange}>
        {options}
      </select>
    );
  }

}

export default Selector;
