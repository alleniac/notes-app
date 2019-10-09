import React, { useState } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import Routes from './Routes';
import './App.css';

export default function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);

  return (
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <LinkContainer to='signup'>
              <NavItem>Sign Up</NavItem>
            </LinkContainer>
            <LinkContainer to='login'>
              <NavItem>Log In</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes
        appProps={{ isAuthenticated, setIsAuthenticated }}
      />
    </div>
  );
}