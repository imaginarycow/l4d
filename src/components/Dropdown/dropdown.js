import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dropdown.css';

export default class Dropdown extends Component {

  constructor() {
    super();

    this.getLinks = this.getLinks.bind(this);
    this.selectLink = this.selectLink.bind(this);
  }

  selectLink(e) {
    e.preventDefault();

    document.getElementById("myDropdown").classList.toggle("show");

  }

  getLinks() {
    var linkList = [];
    if (this.props.links !== null) {
      const links = this.props.links;
      for (var i in links) {
        linkList.push(<Link to={`/Blog/${links[i].title}`}
          key={links[i].title} value={links[i].title}>{links[i].title}</Link>);
      }

    }

    return linkList;
  }

  render() {
    

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    }

    return (
      <div className="dropdown" id="dropdown">
        <button onClick={this.selectLink} className="dropbtn">{this.props.title}</button>
        <div id="myDropdown" className="dropdown-content">
          {this.getLinks()}
        </div>
      </div>
    );
  }
}
