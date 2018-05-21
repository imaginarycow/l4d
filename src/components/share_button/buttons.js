import React, { Component } from 'react';
import './buttons.css';


export default class ShareButtons extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      comment: props.comment,
      hashtags: props.hashtags,
      url: props.pagelink
    }
    this.getLinks = this.getLinks.bind(this);
  }

  getLinks() {

    var links = [];
    var pageurl = this.state.url;
    var comment = this.state.comment;


    {/* Email */}
    var emaillink = `mailto:?subject=Left4Dev.com&body=I%20saw%20this%20and%20thought%20of%20you!%20${pageurl}`;
    links.push(
      <a href={emaillink} key="email">
        <img src="https://simplesharebuttons.com/images/somacro/email.png" alt="Email" />
      </a>
    );

    {/* Facebook */}
    var facebookurl = `http://www.facebook.com/sharer.php?u=${pageurl}`;
    links.push(
      <a href={facebookurl} target="_blank" key="facebook">
        <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
      </a>
    );

    {/* LinkedIn */}
    var linkedinurl = `http://www.linkedin.com/shareArticle?mini=true&url=${pageurl}`;
    links.push(
      <a href={linkedinurl} target="_blank" key="linkedin">
        <img src="https://simplesharebuttons.com/images/somacro/linkedin.png" alt="LinkedIn" />
      </a>
    );

    {/* Twitter */}
    var twitterurl = `https://twitter.com/intent/tweet?text=${comment}&hashtags=Left4Dev,${this.state.hashtags}&url=${pageurl}`;
    links.push(
      <a className="twitter-share-button" href={twitterurl} target="_blank" key="twitter">
       <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" />
      </a>
    );

    return links;
  }

  componentWillReceiveProps(nextProps) {

    if (this.props.hashtags !== nextProps.hashtags) {
      
      this.setState({comment: nextProps.comment, hashtags: nextProps.hashtags,url: nextProps.pagelink});
      this.getLinks();
    }
  }

  render() {

    return(

        <div id="share-buttons" >
          {this.getLinks()}
        </div>
    );
  }
}
