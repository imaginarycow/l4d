import React, { Component } from 'react';
import './buttons.css';


export default class ShareButtons extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      url: props.pagelink
    }

    this.stringBuilder = this.stringBuilder.bind(this);
  }

  componentDidMount() {

    console.log(this.state.url);

    var links = [];
    var pageurl = this.state.url;


    {/* Email */}
    links.push(
      <a href='mailto:?Subject=Left4Dev.com&amp;Body=I%20saw%20this%20and%20thought%20of%20you!%20'>
        <img src="https://simplesharebuttons.com/images/somacro/email.png" alt="Email" />
      </a>
    );

    {/* Facebook */}
    links.push(
      <a href="http://www.facebook.com/sharer.php?u=https://Left4Dev.com" target="_blank">
        <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
      </a>
    );

    {/* LinkedIn */}
    links.push(
      <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://Left4Dev.com" target="_blank">
        <img src="https://simplesharebuttons.com/images/somacro/linkedin.png" alt="LinkedIn" />
      </a>
    );

    {/* Twitter */}
    var someLink = encodeURI(this.state.url);

    var twitterurl = `https://twitter.com/intent/tweet?text=Hello%20Peeps&text=Nice Article&hashtags=Left4Dev&url=${someLink}`;
    links.push(
      <a class="twitter-share-button" href={twitterurl} target="_blank">
       <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" />
      </a>
    );

    this.setState({links: links});;
  }

  stringBuilder(inArray) {

    var output = '';
    for (var i = 0; i < inArray.length; i++) {
      output += inArray[i];
    }

    return (output);
  }

  render() {

    const link = "https://Left4Dev.com";
    const link2 = 'mailto:?Subject=Left4Dev.com&amp;Body=I%20saw%20this%20and%20thought%20of%20you!%20';

    return(

        <div id="share-buttons" >
          {this.state.links}
        </div>
    );
  }
}
