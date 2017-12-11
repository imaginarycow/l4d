import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { BlogPreview } from './components/blog_preview';
import Dropdown from '../../components/Dropdown/dropdown';
import BlogLoad from '../../redux/actions/blog_get';
import './css/blog_page.css';
import PageNotFound from '../404/App';
import Footer from '../../components/footer/footer';


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
    var blogList = [];

    for (var i in blogs) {
      blogList.push(<BlogPreview key={blogs[i].commentGroupId} blog={blogs[i]} text={blogs[i].blog}/>);
    }
    return blogList;
  }

  render () {

      if (this.props.blogs !== null) {

        return (
          <div id="blogpagecontainer">
            {this.getBlogList()}
            {/* <Footer /> */}
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
