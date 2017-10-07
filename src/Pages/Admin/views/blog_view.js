import React, { Component } from 'react';

const initState = {blog: 'Write with your heart, and remember your audience!.',
                    imgUrl: ''};

class BlogView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      blog: initState.blog,
      imgUrl: initState.imgUrl
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({blog: event.target.value});
  }
  handleUrlChange(event) {
    this.setState({imgUrl: event.target.value});
  }

  handleSubmit(event) {
    var words = this.state.blog.match(/\S+/g).length;
    if (this.state.blog === '' || this.state.blog === initState.blog || words < 200) {
      alert('You can do better than that!');
    }
    else {
      alert('New Blog Post submitted: ' + this.state.blog);
    }

    event.preventDefault();
  }

  render() {

    return (
      <form onSubmit={this.handleSubmit}>
        <label>Image url:</label>
        <input type="text" value={this.state.imgUrl} onChange={this.handleUrlChange}/>
        <label>New Post:</label>
        <textarea value={this.state.blog} onChange={this.handleChange}></textarea>
        <input type="submit" value="Submit" />
      </form>
    );
  }

}

export default BlogView;
