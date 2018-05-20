import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlogLoad from '../../../redux/actions/blog_get';
import '../css/blog_preview.css';
import StringShortener from '../../../utils/string_shortener';
import HR from './HR/hr';

class BlogPreview extends Component {

  constructor() {
    super();

    this.handleBlogSelect = this.handleBlogSelect.bind(this);
  }

  handleBlogSelect() {
    this.props.BlogLoad(this.props.blog.urltitle);
  }

  render () {
      
      var blog = this.props.blog;
      var text = StringShortener(blog.snippet, 300);
      var date = 'Posted '+blog.date + ` | By ${blog.author}`;
      var title = blog.title;
      var urltitle = blog.urltitle;
      var subtitle = blog.subtitle;
      var url = blog.imgUrl;
      var commentGroupId = blog.commentGroupId;
      // if (document.getElementById("blogtext") !== null) {
      //   document.getElementById("blogtext").innerHTML = StringShortener(blog.snippet, 300);
      // }

      return (

        <div id="previewcontainer">
          <h1 id="previewtitle">{title}</h1>
          {/* <h4 id="subtitle">{subtitle}</h4> */}
          <h4 id="postedBy">{date}</h4>
          <div id="image">
            <Link to={`/Blog/${urltitle}`} ><img src={url} alt='blog' onClick={this.handleBlogSelect}/></Link>
          </div>
          <div id="blogtext" >{text}</div>
          <HR text="ʘ‿ʘ"/>
        </div>

      );
    }

  }

  function mapDispatchToProps(dispatch) {
    return bindActionCreators({BlogLoad}, dispatch);
  }

  export default connect(null, mapDispatchToProps)(BlogPreview);
