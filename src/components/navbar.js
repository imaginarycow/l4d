import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
//import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
//import { Navbar,Nav,NavItem,MenuItem } from 'react-bootstrap';
import Logo from './logo';
import '../css/nav.css';

import Home from '../Pages/Main/Main';
import QOTD from '../Pages/Qotd/App';
import Blog from '../Pages/Blog/App';

class navbarInstance extends Component {

  render() {
    return (
<div>
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/QOTD">QOTD</Link></li>
            <li><Link to="/Blog">Blog</Link></li>
          </ul>
          {/* <Link to="/">
            <h1>Home</h1>
          </Link>
          <Link to="/QOTD">
            <h1>QOTD</h1>
          </Link>
          <Link to="/Blog">
            <h1>Blog</h1>
          </Link> */}

          <Route path="/" component={Home}/>
          <Route path="/QOTD" component={QOTD}/>
          <Route path="/Blog" component={Blog}/>
        </div>
      </Router>

      {/* <Router>
          <div>


            <Navbar id="navbar" inverse collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Logo id="logo"/>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav>

                  <NavItem eventKey={1} ><Link to="/">Home</Link></NavItem>

                  <NavItem eventKey={2} ><Link to="/QOTD" >QOTD</Link></NavItem>
                  <NavItem eventKey={2} ><Link to="/Blog" >Blog</Link></NavItem>
                  <NavItem eventKey={2} href="#">Awesome Apis</NavItem>
                  <NavItem eventKey={2} href="#">Comment Box</NavItem>
                  <NavItem eventKey={2} href="#">Login</NavItem>
                </Nav>
              </Navbar.Collapse>
            </Navbar>


              <Route exact path="/QOTD" component={QOTD} />
              <Route path="/Blog" component={Blog}  />

          </div>
        </Router> */}


    </div>
    );
  }
}

export default navbarInstance;


            {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown> */}
