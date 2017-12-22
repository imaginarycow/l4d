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
      subtitle: initState.sub,
      title: initState.title,
      urltitle: '',
      snippet: '',
      snippetcount: 0,
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

    if(e.target.name === 'title') {
      this.setState({title: e.target.value});
    }

    if(e.target.name === 'urltitle') {
      this.setState({urltitle: e.target.value});
    }

    if(e.target.name === 'subtitle') {
      this.setState({subtitle: e.target.value});
    }

    if(e.target.name === 'snippet') {
      if (e.target.value.length > 0) {
        this.setState({snippetcount: e.target.value.length});
      }
      this.setState({snippet: e.target.value});
    }

    if(e.target.name === 'url') {
      this.setState({imgUrl: e.target.value});
    }

  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.blog === '') {
      alert('Missing Blog!');
      return;
    }
    if (this.state.snippet === '') {
      alert('Missing Snippet!');
      return;
    }
    var words = this.state.blog.match(/\S+/g).length;
    if (this.state.blog === '' || this.state.blog === initState.blog || words < 200) {
      alert('You can do better than that!');
    }
    else {
      alert('New Blog Post submitted: ' + this.state.blog);
      let blogKey = getUnformattedDate(this.state.date);
      let commentGroupId = 'BL' + blogKey;
      var database = firebase.database();
      firebase.database().ref('apps/blog/' + blogKey).set({
        author: this.state.author,
        blog: this.state.blog,
        commentGroupId: commentGroupId,
        date: this.state.date,
        dateKey: blogKey,
        imgUrl: this.state.imgUrl,
        subtitle: this.state.subtitle,
        title: this.state.title,
        snippet: this.state.snippet
      });

      this.setState ({
        author: initState.author,
        blog: initState.blog,
        date: getFormattedDate(),
        imgUrl: initState.imgUrl,
        subtitle: initState.sub,
        title: initState.title,
        snippet: '',
        snippetcount: 0,
        wordcount: initState.count
      });
    }

  }

  render() {
    var blogPreview = this.state.blog;
    if (document.getElementById("blog-preview") !== null) {
      document.getElementById("blog-preview").innerHTML = this.state.blog;
    }

    const prevStyle = {
      textAlign: 'left'
    }

    return (
      <div>
        <form id="blog-form" onSubmit={this.handleSubmit}>
          <label>Image url:</label>
          <input type="text" name="url" value={this.state.imgUrl} onChange={this.handleChange}/>
          <label>Author: {this.state.author}</label>
          <input type="text" name="author" value={this.state.author} onChange={this.handleChange}/>
          <label>Title: {this.state.title}</label>
          <input type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
          <label>UrlTitle: Should be in the format "some-blog-title "{this.state.urltitle}</label>
          <input type="text" name="urltitle" value={this.state.urltitle} onChange={this.handleChange}/>
          <label>Subtitle: {this.state.subtitle}</label>
          <input type="text" name="subtitle" value={this.state.subtitle} onChange={this.handleChange}/>
          <label>Date Active: {this.state.date}</label>
          <input type="text" name="date" value={this.state.date} onChange={this.handleChange} />
          <label>New Post - Words: {this.state.wordcount}</label>
          <textarea value={this.state.blog} name="blog" onChange={this.handleChange}></textarea>
          <label>Snippet - Characters: {this.state.snippetcount} of 300</label>
          <textarea value={this.state.snippet} name="snippet" onChange={this.handleChange}></textarea>
          <input id="submit" type="submit" name="submit" value="Publish" />
        </form>
        <div>
          <h2>Preview</h2>
          <div id="blogpreviewarea">
            <div><label>{this.state.title}</label></div>
            <div><label>{this.state.subtitle}</label></div>
            <div><label>published by: {this.state.author}</label></div>
            <img src={this.state.imgUrl} />
            <div id="blog-preview" style={prevStyle}></div>
          </div>
        </div>
    </div>
    );
  }

}

export default BlogView;
