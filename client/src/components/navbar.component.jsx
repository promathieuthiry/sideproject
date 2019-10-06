import React, { Component } from 'react';

import { Nav, Navbar, Icon, Dropdown } from 'rsuite';

export default class NavbarComponent extends Component {

  render() {
    const {user, displayAddProject, logout} = this.props
    return (
<nav>
  <Navbar>
    <Navbar.Body>
      <Nav pullLeft>
        <Nav.Item  icon={<Icon icon="user-circle-o"/>}>Welcome {user.name}</Nav.Item>
      </Nav>
      <Nav pullRight>
        <Nav.Item  to="/create" onClick={displayAddProject} icon={<Icon icon="plus"/>}>Add Project</Nav.Item>
        <Dropdown title="User">
        <Dropdown.Item>Edit</Dropdown.Item>
        <Dropdown.Item onSelect={logout}>Logout</Dropdown.Item>
        </Dropdown>
      </Nav>
    </Navbar.Body>
  </Navbar>
</nav>
    );
  }
}