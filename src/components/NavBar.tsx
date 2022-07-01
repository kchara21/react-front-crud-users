import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const NavBar = ({ auth,setAuth }: any) => {
   
  const handleLogout = ()=>{
    window.localStorage.removeItem("user");
    setAuth(null);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Inicio
        </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/dashboard">
            Dashboard
          </Nav.Link>
        </Nav>
        <Nav>
          {auth ? (
            <>
              <Nav.Link onClick={handleLogout} className="d-flex" as={Link} to="/login">
                LOGOUT
              </Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link className="d-flex" as={Link} to="/dashboard">
                LOGIN
              </Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
