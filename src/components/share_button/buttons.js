import React, { Component } from 'react';
import './buttons.css';


export default class ShareButtons extends Component {

  render() {

    const link = "https://Left4Dev.com";
    const link2 = 'mailto:?Subject=Left4Dev.com&amp;Body=I%20saw%20this%20and%20thought%20of%20you!%20';

    return(
        <div id="share-buttons" >
          {/* Email */}
          <a href='mailto:?Subject=Left4Dev.com&amp;Body=I%20saw%20this%20and%20thought%20of%20you!%20'>
            <img src="https://simplesharebuttons.com/images/somacro/email.png" alt="Email" />
          </a>
          {/* Facebook */}
          <a href="http://www.facebook.com/sharer.php?u=https://Left4Dev.com" target="_blank">
            <img src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
          </a>
          {/* LinkedIn */}
          <a href="http://www.linkedin.com/shareArticle?mini=true&amp;url=https://Left4Dev.com" target="_blank">
            <img src="https://simplesharebuttons.com/images/somacro/linkedin.png" alt="LinkedIn" />
          </a>
          {/* Twitter */}
           <a href="https://twitter.com/share?url=https://Left4Dev.com&amp;text=Nice Article&amp;hashtags=Left4Dev" target="_blank">
            <img src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" />
           </a>

        </div>
    );
  }
}
