import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

var text = '';
var date = '';
var title = 'Loading';
var url = '#';

class App extends Component {
  render () {
    console.log(this.props.blog.Blog);
    if (typeof this.props.blog.Blog != 'undefined') {
      text = this.props.blog.Blog.text;
      date = this.props.blog.Blog.date;
      title = this.props.blog.Blog.title;
      url = this.props.blog.Blog.imageUrl;
    }

    return (
      <div>
        <h1>{title}</h1>
        <h4>{date}</h4>
        <img src={url} />
        <p>{text}</p>
      </div>
    );
  }

}

function mapStateToProps(state) {
    return {blog: state.load};
}

// function mapDispatchToProps(dispatch) {
//
//   return bindActionCreators({StoreLoad}, dispatch);
//
// }

export default connect(mapStateToProps, null)(App);
