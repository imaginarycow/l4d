import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropdown from '../../../components/dropdown/dropdown';
import BlogLoad from '../../../redux/actions/blog_get';
import GetComments from '../../../redux/actions/blog_comments_get';
import CommentArea from '../../../components/comments/comment_area';
import '../css/blog_read.css';
import ShareButtons from '../../../components/share_button/buttons';

var commentsFetched = false;


class BlogRead extends Component {

  constructor() {
    super();

    this.state = {
      blog: null,
      hashtags: '',
      selectedBlogTitle: null,
      url: 'http://www.Left4Dev.com'
      };
      this.updateText = this.updateText.bind(this);
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.match.params !== nextProps.match.params) {

      this.props.BlogLoad(nextProps.match.params.title);
      const linkUrl = 'http://www.Left4Dev.com' + nextProps.match.url;
      this.setState({url: linkUrl});
    }

    if (this.props.currBlog !== nextProps.currBlog && nextProps.currBlog !== null) {
      console.log('props changed' + nextProps.currBlog.hashtags);
      this.props.GetComments(nextProps.currBlog.commentGroupId);
      this.setState({hashtags: nextProps.currBlog.hashtags});
      this.updateText(nextProps.currBlog.blog);
    }
  }

  componentWillMount() {

    //check url for specific blog
    if (typeof this.props.match.params.title !== 'undefined') {
      this.props.BlogLoad(this.props.match.params.title);
    }
  }

  componentDidMount() {
    const linkUrl = 'http://www.Left4Dev.com' + this.props.match.url;
    this.setState({url: linkUrl});

    if (document.getElementById("blogreadtext") !== null && this.props.currBlog !== null) {
      console.log('blogreadtext is not null');
      document.getElementById("blogreadtext").innerHTML = this.props.currBlog.blog;
    }
  }

  updateText(text) {
    document.getElementById("blogreadtext").innerHTML = text;
  }

  render () {

      if (this.props.currBlog !== null) {
        var blog = this.props.currBlog;
        var text = blog !== null ? blog.blog : '';
        var date = blog !== null ? 'Posted '+blog.date + ` | By ${blog.author}`: '';
        var hashes = blog.hashtags;
        var title = blog !== null ? blog.title : '';
        var subtitle = blog.subtitle;
        var url = blog !== null ? blog.imgUrl : '';
        var commentGroupId = blog !== null ? blog.commentGroupId: '';

        if (!commentsFetched && blog !== null) {

          this.props.GetComments(blog.commentGroupId);
          commentsFetched = true;
        }
        if (document.getElementById("blogreadtext").innerHTML === 'Loading...') {
          document.getElementById("blogreadtext").innerHTML = text;
        }

        return (
          <div id="container">
            <h1 id="title">{title}</h1>
            <h4 id="subtitle">{subtitle}</h4>
            <h4 id="postedby">{date}</h4>
            <div id="share-archive-container">
              <ShareButtons pagelink={this.state.url} hashtags={hashes} comment="Check this Article: "/>
              <Dropdown title='Archive' links={this.props.blogs} />
            </div>

            <div id="image">
              <img src={url} alt='blog'/>
            </div>

            <div id="blogreadtext">Loading...</div>
            <CommentArea app="blog" commentGroupId={commentGroupId} comments={this.props.comments}/>
          </div>
        );
      }
      else {

        return (
          <div id="container">
              <div id="blogreadtext">Loading...</div>
          </div>
        );
      }

    }

  }

function mapStateToProps(state) {
    return {
      blogs: state.allBlogs,
      currBlog: state.currBlog,
      comments: state.blogComments
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({BlogLoad, GetComments}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogRead);
