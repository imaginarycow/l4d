import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar,Nav,NavItem } from 'react-bootstrap';
import Logo from './logo';
import '../css/nav.css';


const navbarInstance = () => (

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
            <NavItem eventKey={3} ><Link to="/Blog" >Blog</Link></NavItem>
            <NavItem eventKey={4} ><Link to="/The Worst" >The Worst</Link></NavItem>
            <NavItem eventKey={5} ><Link to="/Awesome Apis" >Awesome Apis</Link></NavItem>
            <NavItem eventKey={6} ><Link to="/Comment Box" >Comment Box</Link></NavItem>
            <NavItem eventKey={7} ><Link to="/Login" >Login</Link></NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

)

export default navbarInstance;


            {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown> */}
