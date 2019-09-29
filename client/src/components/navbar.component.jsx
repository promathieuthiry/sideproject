import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Nav, Navbar, Icon } from 'rsuite';

export default class NavbarComponent extends Component {

  render() {
    const NavLink = props => 
    <Nav.Item componentClass={Link} {...props} />;
    return (
<nav>
  <Navbar>
    <Navbar.Body>
      <Nav pullLeft>
      <NavLink to="/" icon={<Icon icon="home" />}>Javascript Project</NavLink>
      </Nav>
      <Nav pullRight>
        <NavLink to="/create" icon={<Icon icon="plus"/>}>Add Project</NavLink>
        <NavLink to="/" onSelect={this.props.logout}>Logout</NavLink>
      </Nav>
    </Navbar.Body>
  </Navbar>
</nav>
    );
  }
}