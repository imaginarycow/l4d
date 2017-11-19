import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import BlogLoad from '../../redux/actions/blog_get';
import GetComments from '../../redux/actions/blog_comments_get';
import CommentArea from '../../components/comments/comment_area';
import './css/blog.css';


var text = '';
var date = '';
var title = 'Loading';
var url = '#';
var commentsFetched = false;

class Blog extends Component {

  constructor() {
    super();

    this.state = {
      blog: null,
      selectedBlogTitle: null,
      redirect: null
      };

    this.selectBlog = this.selectBlog.bind(this);
    this.getBlogOptions = this.getBlogOptions.bind(this);
  }

  componentWillMount() {
    this.props.BlogLoad();
    console.log(this.props.match);
    //check url for specific blog
    if (this.props.match.path !== '/') {
      console.log('blog load with params');
      this.props.BlogLoad(this.props.match.params.title);
    } else {
      console.log('blog load without params');
      this.props.BlogLoad();
    }
  }

  selectBlog(e) {
    e.preventDefault();
    var title = e.target.value;
    if (title === 'Archive') {
      return;
    } else {
      this.props.BlogLoad(title);
      commentsFetched = false;
    }
  }

  getBlogOptions() {
    //map through archived blogs
    var options = [];
    options.push(<option key='archive'>Archive</option>);
    if (this.props.blogs !== null) {
      const blogs = this.props.blogs;
      for (var i in blogs) {
        //options.push(<option key={blogs[i].title} value={blogs[i].title}>{blogs[i].title}</option>);
        options.push(<option key={blogs[i].title} id={blogs[i].title} value={blogs[i].title}><Link to={`/Blog/${blogs[i].title}`} >{blogs[i].title}</Link></option>);
      }
    }
    return options;
  }

  render () {

    if (this.state.redirect !== null) {
      return <Redirect to={`/Blog/${this.state.redirect}`} />;
    }

    if (this.props.currBlog !== null) {
      var blog = this.props.currBlog;
      text = blog.blog;
      date = 'posted '+blog.date;
      title = blog.title;
      url = blog.imgUrl;

      if (commentsFetched === false) {
        console.log('get comments called');
        this.props.GetComments(this.props.currBlog.commentGroupId);
        commentsFetched = true;
      }

      if (document.getElementById("text") !== null) {
        document.getElementById("text").innerHTML = text;
      }

      const archivedBlogs = this.getBlogOptions();

      return (
        <div id="container">
          <h1 id="title">{title}</h1>
          <h4 id="date">{date}</h4>
          <select id="archive" onChange={this.selectBlog}>
            {archivedBlogs}
          </select>
          <img id="image" src={url} alt='blog'/>
          <div id="text">Loading...</div>
          <CommentArea app="blog" commentGroupId={blog.commentGroupId} comments={this.props.comments}/>
        </div>
      );
    }

    //return loading... if blogs not loaded from firebase
    return (
      <div id="container">
        <h1 id="title">{title}</h1>
        <h4 id="date">{date}</h4>
        <img id="image" src={url} alt='blog'/>
        <div id="text">Loading...</div>
      </div>
    );
  }

}

function mapStateToProps(state) {
    return {
      blogs: state.allBlogs,
      currBlog: state.currBlog,
      latestBlog: state.latestBlog,
      comments: state.blogComments
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({BlogLoad, GetComments}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
