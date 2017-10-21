import React, { Component } from 'react';
import { getFormattedDate, getUnformattedDate } from '../../../utils/dates';
import firebase from 'firebase';
import '../css/doodles_view.css';


class DoodlesView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      author: '',
      date: getFormattedDate(),
      imgUrl: '',
      isCurrent: true,
      subtitle: '',
      title: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {

    e.preventDefault();

    if(e.target.name === 'author') {
      this.setState({author: e.target.value});
    }

    if(e.target.name === 'title') {
      this.setState({title: e.target.value});
    }

    if(e.target.name === 'subtitle') {
      this.setState({subtitle: e.target.value});
    }

    if(e.target.name === 'url') {
      this.setState({imgUrl: e.target.value});
    }

  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.title === '' || this.state.imgUrl === '') {
      alert('Missing title or img url!');
    }
    else {
      alert('New Doodle submitted: ' + this.state.title);
      let doodleKey = getUnformattedDate();
      let commentGroupId = 'DD' + doodleKey;
      var database = firebase.database();
      firebase.database().ref('apps/doodles/' + doodleKey).set({
        author: this.state.author,
        commentGroupId: commentGroupId,
        date: this.state.date,
        imgUrl: this.state.imgUrl,
        subtitle: this.state.subtitle,
        title: this.state.title,
      });

      this.setState ({
        author: '',
        date: getFormattedDate(),
        imgUrl: '',
        subtitle: '',
        title: ''
      });
    }

  }

  render() {

    return (
      <form id="doodle-form" onSubmit={this.handleSubmit}>
        <label>Author: {this.state.author}</label>
        <input type="text" name="author" value={this.state.author} onChange={this.handleChange}/>
        <label>Title: {this.state.title}</label>
        <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
        <label>Subtitle: {this.state.subtitle}</label>
        <input type="text" name="subtitle" value={this.state.subtitle} onChange={this.handleChange}/>
        <label>Image url:</label>
        <input type="text" name="url" value={this.state.imgUrl} onChange={this.handleChange}/>
        <img src={this.state.imgUrl} />
        <input type="submit" name="submit" value="Publish" />
      </form>
    );
  }

}

export default DoodlesView;
