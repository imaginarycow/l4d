import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Dropdown from '../../components/Dropdown/dropdown';
import BlogLoad from '../../redux/actions/blog_get';
import GetComments from '../../redux/actions/blog_comments_get';
import CommentArea from '../../components/comments/comment_area';
import './css/blog.css';


// var text = '';
// var date = '';
// var title = 'Loading';
// var url = '#';
var commentsFetched = false;

class Blog extends Component {

  constructor() {
    super();

    this.state = {
      blog: null,
      selectedBlogTitle: null,
      redirect: null
      };

  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (this.props.match.params !== nextProps.match.params) {
      console.log('update needed');
      this.props.BlogLoad(nextProps.match.params.title);
    }

    if (this.props.currBlog !== nextProps.currBlog) {
      console.log('update needed');
      this.props.GetComments(nextProps.currBlog.commentGroupId);
    }
  }

  componentDidMount() {

    //check url for specific blog
    console.log(this.props.match.params);
    if (typeof this.props.match.params.title !== 'undefined') {
      this.props.BlogLoad(this.props.match.params.title);
    } else {
      this.props.BlogLoad();
    }
  }

  render () {

    if (this.state.redirect !== null) {
      return <Redirect to={`/Blog/${this.state.redirect}`} />;
    }

    if (this.props.currBlog !== null) {
      var blog = this.props.currBlog;
      var text = blog.blog;
      var date = 'Posted '+blog.date;
      var author = `By ${blog.author}`;
      var title = blog.title;
      var url = blog.imgUrl;

      if (!commentsFetched) {
        console.log('comments being loaded');
        this.props.GetComments(blog.commentGroupId);
        commentsFetched = true;
      }

      if (document.getElementById("text") !== null) {
        document.getElementById("text").innerHTML = text;
      }

      return (
        <div id="container">
          <h1 id="title">{title}</h1>
          <h4 id="date">{date}</h4>
          <h4 id="author">{author}</h4>
          <Dropdown title='Archive' links={this.props.blogs} />
          <img id="image" src={url} alt='blog'/>
          <div id="text">Loading...</div>
          <CommentArea app="blog" commentGroupId={blog.commentGroupId} comments={this.props.comments}/>
        </div>
      );
    }
    else {
      //return loading... if blogs not loaded from firebase
      return (
        <div id="container">
          <h1 id="title">{title}</h1>
          <h4 id="date">{date}</h4>
          <img id="image" src={url} alt='blog'/>
          <div id="text">Thinking...</div>
        </div>
      );
    }

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
