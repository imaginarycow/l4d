import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import BlogLoad from '../../redux/actions/blog_get';

var text = '';
var date = '';
var title = 'Loading';
var url = '#';

class App extends Component {


  componentWillMount() {
    this.props.BlogLoad();
  }

  render () {
    console.log(this.props);
    if (typeof this.props.blog.data !== 'undefined') {
      text = this.props.blog.data.text;
      date = this.props.blog.data.date;
      title = this.props.blog.data.title;
      url = this.props.blog.data.imageUrl;
    }

    return (
      <div>
        <h1>{title}</h1>
        <h4>{date}</h4>
        <img src={url} alt='blog'/>
        <p>{text}</p>
      </div>
    );
  }

}

function mapStateToProps(state) {
    return {blog: state.currBlog};
}

function mapDispatchToProps(dispatch) {

  return bindActionCreators({BlogLoad}, dispatch);

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
