import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BlogPreview } from './components/blog_preview';
import BlogLoad from '../../redux/actions/blog_get';
import './css/blog_page.css';


class Blog extends Component {

  constructor() {
    super();

    this.getBlogList = this.getBlogList.bind(this);
  }

  componentWillMount() {
    this.props.BlogLoad();
  }

  getBlogList() {

    const blogs = this.props.blogs;
    // blogs.sort((a, b) => a.dateKey < b.dateKey);
    var blogList = [];

    for (var i in blogs) {
      blogList.push(<BlogPreview key={blogs[i].commentGroupId} blog={blogs[i]} text={blogs[i].blog} date={blogs[i].dateKey}/>);
    }
    return blogList.sort((a, b) => a.date < b.date);

  }

  render () {

      if (this.props.blogs !== null) {

        return (
          <div id="blogpagecontainer">
            {this.getBlogList()}
          </div>
        );
      }
      else {
        return (
          <div id="blogpagecontainer">
            Loading...
          </div>
        );
      }

    }

  }

function mapStateToProps(state) {
    return {
      blogs: state.allBlogs,
    };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({BlogLoad}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
