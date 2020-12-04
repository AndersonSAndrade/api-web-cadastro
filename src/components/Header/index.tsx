import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return(
    <Navbar bg="dark" variant="dark" expand="sm">
      <div className="container">
        <Navbar.Brand href="/">API Cadastro</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item as={Link} className="nav-link" to="/">Dashboard</Nav.Item>
            <Nav.Item as={Link} className="nav-link" to="/usuarios">Usuários</Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Header;