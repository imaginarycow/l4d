import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Dropdown from '../../../components/Dropdown/dropdown';
import BlogLoad from '../../../redux/actions/blog_get';
import GetComments from '../../../redux/actions/blog_comments_get';
import CommentArea from '../../../components/comments/comment_area';
import '../css/blog_read.css';
import PageNotFound from '../../404/App';


var commentsFetched = false;

class BlogRead extends Component {

  constructor() {
    super();

    this.state = {
      blog: null,
      selectedBlogTitle: null
      };

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.currBlog === null) {
      this.props.BlogLoad();
      return;
    }

    if (this.props.match.params !== nextProps.match.params) {

      this.props.BlogLoad(nextProps.match.params.title);
    }

    if (this.props.currBlog !== nextProps.currBlog) {

      this.props.GetComments(nextProps.currBlog.commentGroupId);

    }
  }

  componentWillMount() {

    //check url for specific blog
    if (typeof this.props.match.params.title !== 'undefined') {
      this.props.BlogLoad(this.props.match.params.title);
    } else {
      this.props.BlogLoad();
    }
  }

  render () {

      if (this.props.currBlog !== null) {
        var blog = this.props.currBlog;
        console.log(blog);
        var text = blog !== null ? blog.blog : '';
        var date = blog !== null ? 'Posted '+blog.date + ` | By ${blog.author}`: '';
        // var author = blog !== null ? `By ${blog.author}` : '';
        var title = blog !== null ? blog.title : '';
        var subtitle = blog.subtitle;
        var url = blog !== null ? blog.imgUrl : '';
        var commentGroupId = blog !== null ? blog.commentGroupId: '';

        if (!commentsFetched && blog !== null) {

          this.props.GetComments(blog.commentGroupId);
          commentsFetched = true;
        }

        if (document.getElementById("blogreadtext") !== null) {
          document.getElementById("blogreadtext").innerHTML = text;
        }

        return (
          <div id="container">
            <h1 id="title">{title}</h1>
            <h4 id="subtitle">{subtitle}</h4>
            <h4 id="postedby">{date}</h4>
            <Dropdown title='Archive' links={this.props.blogs} />
            <div id="image">
              <img src={url} alt='blog'/>
            </div>

            <div id="blogreadtext">Loading...</div>
            <CommentArea app="blog" commentGroupId={commentGroupId} comments={this.props.comments}/>
          </div>
        );
      } else {
        this.props.BlogLoad();
        return (
          <div id="container">
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogRead);
