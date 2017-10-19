import React, { Component } from 'react';
import getCurrentDate from '../../../utils/dates';
import '../css/blog_view_css.css';

const initState = {blog: '', date: '', imgUrl: '', title: '', count: 0};

class BlogView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blog: initState.blog,
      date: getCurrentDate(),
      imgUrl: initState.imgUrl,
      title: initState.title,
      wordcount: initState.count
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {

    e.preventDefault();
    if(e.target.name === 'blog') {

      if (e.target.value.length > 0) {
        this.setState({wordcount: e.target.value.match(/\S+/g).length});
      }
      this.setState({blog: e.target.value});
    }

    if(e.target.name === 'date') {
      this.setState({date: e.target.value});
    }

    if(e.target.name === 'title') {
      this.setState({title: e.target.value});
    }

    if(e.target.name === 'url') {
      this.setState({imgUrl: e.target.value});
    }

  }

  handleSubmit(event) {
    var words = this.state.blog.match(/\S+/g).length;
    if (this.state.blog === '' || this.state.blog === initState.blog || words < 200) {
      alert('You can do better than that!');
    }
    else {
      alert('New Blog Post submitted: ' + this.state.blog);
    }

    event.preventDefault();
  }

  render() {

    return (
      <form id="blog-form" onSubmit={this.handleSubmit}>
        <label>Image url:</label>
        <input type="text" name="url" value={this.state.imgUrl} onChange={this.handleChange}/>
        <img src={this.state.imgUrl} />
        <label>Title: {this.state.title}</label>
        <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
        <label>Date Active: {this.state.date}</label>
        <input type="text" name="date" value={this.state.date} onChange={this.handleChange} placeholder="10-21-2017"/>
        <label>New Post - Words: {this.state.wordcount}</label>
        <textarea value={this.state.blog} name="blog" onChange={this.handleChange}></textarea>
        <input type="submit" name="submit" value="Submit" />
      </form>
    );
  }

}

export default BlogView;
