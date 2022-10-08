import React from 'react';
import '../Header/header.css';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ReactLogo from '../../../src/Logo_2.png';

function Header(props) {
  return (
    <Navbar bg="dark" fixed="top">
    <Container>
      <Navbar.Brand href="/Dashboard">
        <img
          src={ReactLogo}
          width="80"
          height="80"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
      </Navbar.Brand>
    </Container>
  </Navbar>
  );
}

export default Header;

