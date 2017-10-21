import React, { Component } from 'react';
import { getFormattedDate, getUnformattedDate } from '../../../utils/dates';
import firebase from 'firebase';
import '../css/blog_view_css.css';

const initState = {author: '', blog: '', date: '', imgUrl: '', sub: '', title: '', count: 0};

class BlogView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      author: initState.author,
      blog: initState.blog,
      date: getFormattedDate(),
      imgUrl: initState.imgUrl,
      isCurrent: true,
      subtitle: initState.sub,
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

    if(e.target.name === 'author') {
      this.setState({author: e.target.value});
    }

    if(e.target.name === 'date') {
      this.setState({date: e.target.value});
    }

    if(e.target.name === 'isCurrent') {
      let val = e.target.value === 'true' ? true : false;
      this.setState({isCurrent: val});
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
    //var words = this.state.blog.match(/\S+/g).length;
    // if (this.state.blog === '' || this.state.blog === initState.blog || words < 200) {
    //   alert('You can do better than that!');
    // }
    if (1 > 5) {
      alert('You can do better than that!');
    }
    else {
      alert('New Blog Post submitted: ' + this.state.blog);
      let blogKey = getUnformattedDate();
      let commentGroupId = 'BL' + blogKey;
      var database = firebase.database();
      firebase.database().ref('apps/blog/' + blogKey).set({
        author: this.state.author,
        blog: this.state.blog,
        commentGroupId: commentGroupId,
        date: this.state.date,
        imgUrl: this.state.imgUrl,
        isCurrent: this.state.isCurrent,
        subtitle: this.state.subtitle,
        title: this.state.title,
      });

      this.setState ({
        author: initState.author,
        blog: initState.blog,
        date: getFormattedDate(),
        imgUrl: initState.imgUrl,
        isCurrent: true,
        subtitle: initState.sub,
        title: initState.title,
        wordcount: initState.count
      });
    }

  }

  render() {

    return (
      <form id="blog-form" onSubmit={this.handleSubmit}>
        <label>Image url:</label>
        <input type="text" name="url" value={this.state.imgUrl} onChange={this.handleChange}/>
        <img src={this.state.imgUrl} />
        <label>Author: {this.state.author}</label>
        <input type="text" name="author" value={this.state.author} onChange={this.handleChange}/>
        <label>Title: {this.state.title}</label>
        <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
        <label>Subtitle: {this.state.subtitle}</label>
        <input type="text" name="subtitle" value={this.state.subtitle} onChange={this.handleChange}/>
        <label>Date Active: {this.state.date}</label>
        <input type="text" name="date" value={this.state.date} onChange={this.handleChange} />
        <label>Set Current?: {this.state.isCurrent}</label>
        <label>Yes</label>
        <input name="isCurrent" type="radio" value="true" checked onChange={this.handleChange} />
        <label>No</label>
        <input name="isCurrent" type="radio" value="false" onChange={this.handleChange} />
        <label>New Post - Words: {this.state.wordcount}</label>
        <textarea value={this.state.blog} name="blog" onChange={this.handleChange}></textarea>
        <input type="submit" name="submit" value="Publish" />
      </form>
    );
  }

}

export default BlogView;
