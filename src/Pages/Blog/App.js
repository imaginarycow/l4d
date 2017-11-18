import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
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
      redirect: null,
      selectedBlogTitle: null
      };

    this.selectBlog = this.selectBlog.bind(this);
    this.getBlogOptions = this.getBlogOptions.bind(this);
  }

  componentWillMount() {

    this.props.BlogLoad();

    if (this.props.match.path !== '/') {
      console.log(this.props.match.params.title);
      this.setState({selectedBlogTitle: this.props.match.params.title});
    } else {
      return <Redirect to='/' />;
    }
  }
  selectBlog(e) {
    e.preventDefault();
    var value = e.target.value;
    if (value === 'Archive') {
      return;
    } else {
      console.log('redirect');

      this.setState({redirect: value});
    }
  }
  getBlogOptions() {
    //map through archived blogs
    var options = [];
    options.push(<option key='archive'>Archive</option>);
    if (this.props.blogs !== null) {
      const blogs = this.props.blogs;
      for (var i in blogs) {
        console.log(blogs[i]);
        options.push(<option key={blogs[i].title} value={blogs[i].title}>{blogs[i].title}</option>);
      }
    }
    return options;
  }

  render () {

    if (this.state.redirect !== null) {
      return <Redirect to={`/Blog/${this.state.redirect}`} />;
    }

    if (typeof this.props.blog.date !== 'undefined') {

      text = this.props.blog.blog;
      date = 'posted '+this.props.blog.date;
      title = this.props.blog.title;
      url = this.props.blog.imgUrl;

      if (typeof this.props.blog.commentGroupId !== 'undefined' && commentsFetched == false) {
        this.props.GetComments(this.props.blog.commentGroupId);
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
          <CommentArea app="blog" commentGroupId={this.props.blog.commentGroupId} comments={this.props.comments}/>
        </div>
      );
    }

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
      blog: state.currBlog,
      blogs: state.allBlogs,
      comments: state.blogComments
    };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({BlogLoad, GetComments}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
