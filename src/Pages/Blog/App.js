import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlogLoad from '../../redux/actions/blog_get';
import GetComments from '../../redux/actions/comments_get';
import CommentArea from '../../components/comment_area';
import './css/blog.css';

var text = '';
var date = '';
var title = 'Loading';
var url = '#';
var commentsReceived = false;

class App extends Component {


  componentWillMount() {
    this.props.BlogLoad();
  }

  render () {
    
    if (typeof this.props.blog.date !== 'undefined') {

      text = this.props.blog.text;
      date = 'posted '+this.props.blog.date;
      title = this.props.blog.title;
      url = this.props.blog.imageUrl;

      if (this.props.blog.commentGroupId && !commentsReceived) {
        this.props.GetComments(this.props.blog.commentGroupId);
        commentsReceived = true;
      }

      return (
      <div id="container">
        <h1 id="title">{title}</h1>
        <h4 id="date">{date}</h4>
        <img id="image" src={url} alt='blog'/>
        <p id="text">{text}</p>
        <CommentArea id="commentArea" comments={this.props.comments}/>
      </div>
    );
    }

    return (
      <div id="container">
        <h1 id="title">{title}</h1>
        <h4 id="date">{date}</h4>
        <img id="image" src={url} alt='blog'/>
        <p id="text">{text}</p>
      </div>
    );
  }

}

function mapStateToProps(state) {
    return {
      blog: state.currBlog,
      comments: state.blogComments
    };
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({BlogLoad, GetComments}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
