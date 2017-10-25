import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar,Nav,NavItem } from 'react-bootstrap';
import Logo from './logo';
import '../css/nav.css';

var loginLink = 'Login';

class navbarInstance extends Component {

      render() {

        if (this.props.user != null && this.props.user.email !== '') {
          loginLink = this.props.user.email;
        } else {
          loginLink = 'Login';
        }

        return(

          <Navbar id="navbar" inverse collapseOnSelect>
            <Navbar.Header>
              <Link to="/"><Logo /></Link>
              {/* <Navbar.Brand>

              </Navbar.Brand> */}
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <NavItem eventKey={1} ><Link to="/Blog" >Blog</Link></NavItem>
                <NavItem eventKey={2} ><Link to="/QotD" >QotD</Link></NavItem>
                <NavItem eventKey={3} ><Link to="/The Worst" >The Worst</Link></NavItem>
                <NavItem eventKey={4} ><Link to="/Doodles" >Doodles</Link></NavItem>
                <NavItem eventKey={5} ><Link to="/Comment Box" >Comment Box</Link></NavItem>
                <NavItem eventKey={6} ><Link to="/Login" >{loginLink}</Link></NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
      }
}

function mapStateToProps(state) {
    return { user: state.user };
}

export default connect(mapStateToProps, null)(navbarInstance);


            {/* <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown> */}
