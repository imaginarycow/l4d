import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../css/blog_preview.css';
import StringShortener from '../../../utils/string_shortener';
import HR from './HR/hr';

export class BlogPreview extends Component {

  constructor() {
    super();

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
            <Link to={`/Blog/${urltitle}`} ><img src={url} alt='blog'/></Link>
          </div>
          <div id="blogtext" >{text}</div>
          <HR text="ʘ‿ʘ"/>
        </div>

      );
    }

  }
