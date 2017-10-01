import React, { Component } from 'react';

export default class NewComment extends Component {

  render() {
    return (
      <div>
        <form>
          <input type="text" placeholder="Comment" />
          <input type="submit" value="Post" />
        </form>
      </div>
    )
  }
}
