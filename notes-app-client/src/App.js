import React, { useState, useEffect } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';
import Routes from './Routes';
import './App.css';

export default function App() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  const [ isAuthenticating, setIsAuthenticating ] = useState(true);

  async function onLoad() {
    try {
      await Auth.currentSession();
      setIsAuthenticated(true);
    } catch (error) {
      if (error !== 'No current user') {
        alert(error);
      }
    }
    setIsAuthenticating(false);
  };

  // componentDidMount
  useEffect(() => {
    onLoad();
  }, []);

  async function handleLogout() {
    try {
      await Auth.signOut();
    } catch (error) {
      alert(error);
    }
    setIsAuthenticated(false);
  }

  return (
    !isAuthenticating &&
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
            {
              isAuthenticated
                ? <NavItem onClick={ handleLogout }>Logout</NavItem>
                : (
                  <React.Fragment>
                    <LinkContainer to='/signup'>
                      <NavItem>Signup</NavItem>
                    </LinkContainer>
                    <LinkContainer to='/login'>
                      <NavItem>Login</NavItem>
                    </LinkContainer>
                  </React.Fragment>
                )
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes
        appProps={{ isAuthenticated, setIsAuthenticated }}
      />
    </div>
  );
}