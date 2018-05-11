import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlogLoad from '../../../redux/actions/blog_get';
import { getFormattedDate, getUnformattedDate } from '../../../utils/dates';
import firebase from 'firebase';
import '../css/blog_view_css.css';

const initState = {author: '', blog: '', date: '', imgUrl: '', sub: '', title: '', count: 0};

class BlogView extends Component {

  constructor() {
    super();

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
      wordcount: initState.count,
      pastBlog: {}
    };
    this.resetState = this.resetState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getPastBlogs = this.getPastBlogs.bind(this);
    this.handleBlogSelect = this.handleBlogSelect.bind(this);
  }

  componentWillMount() {
    this.props.BlogLoad();
  }

  resetState() {
    this.setState ({
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
    });
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
      console.log(blogKey);
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
        publish: true,
        urltitle: this.state.urltitle,
        snippet: this.state.snippet
      });
      this.resetState();
    }

  }

  handleBlogSelect(e) {
    let val = e.target.value;
    if (val === 'New') {
      //reset to default state
      this.resetState();
    } 
    else {
      this.props.pastBlogs.map((blog) => {
        if (blog.title === val) {
          this.setState ({
            author: blog.author,
            blog: blog.blog,
            date: blog.date,
            imgUrl: blog.imgUrl,
            subtitle: blog.subtitle,
            title: blog.title,
            urltitle: blog.urltitle,
            snippet: blog.snippet,
            snippetcount: 0,
            wordcount: initState.count
          });
        }
      })
    }
  }

  getPastBlogs(pastBlogs) {
    let blogs = [<option key="new">New</option>];
    pastBlogs.map((blog) => {
      blogs.push(<option key={blog.commentGroupId}>{blog.title}</option>);
    });
    return blogs;
  }

  render() {
    var blogPreview = this.state.blog;
    if (document.getElementById("blog-preview") !== null) {
      document.getElementById("blog-preview").innerHTML = this.state.blog;
    }

    const prevStyle = {
      textAlign: 'left'
    }

    const blogs = this.props.pastBlogs !== null ? this.getPastBlogs(this.props.pastBlogs) 
                                                : [<option>New</option>];

    return (
      <div id="blogAdminContainer">
        <div id="formContainer">
          <select onChange={this.handleBlogSelect}>{blogs}</select>
          <form id="blog-form" onSubmit={this.handleSubmit}>
            <label>Main Image url:</label>
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
        </div>
        <div id="previewContainer">
            <div id="blogpreviewarea">
              <div><h1>{this.state.title}</h1></div>
              <div><label>{this.state.subtitle}</label></div>
              <div id="posted-by"><h4>Posted by: {this.state.author}</h4></div>
              <img src={this.state.imgUrl} />
              <div id="blog-preview" style={prevStyle}></div>
            </div>
        </div>
      </div>  
    );
  }

}

const mapStateToProps = (state) => {
  return { pastBlogs: state.allBlogs }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({BlogLoad}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogView);
