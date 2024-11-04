import React, { useEffect, useRef } from 'react';
import { Container, Nav, Navbar, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import styled from 'styled-components';

const Navbars = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(imageRef.current, { x: 60, rotation: 360, duration: 1, ease: 'power3.in' })
        .to(imageRef.current, { x: 0, rotation: 0, duration: 1, ease: 'power3.out' });
  }, []);

  return (
      <StyledNavbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image
                ref={imageRef}
                src="../assets/img/logo.jpg"
                alt="Gestion CV Logo"
                height="150"
                width="150"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
            <Nav>
              <StyledNavLink as={Link} to="/home">Accueil</StyledNavLink>
              <StyledNavLink as={Link} to="/login">Login</StyledNavLink>
              <StyledNavLink as={Link} to="/signup">Signup</StyledNavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>
  );
};

// Styled Components for enhanced styling
const StyledNavbar = styled(Navbar)`
  background-color: #f8f9fa; /* Soft background for the navbar */
`;

const StyledNavLink = styled(Nav.Link)`
  font-size: 1.1em;          /* Increase font size */
  padding: 10px 20px;        /* Add padding around the links */
  color: brown;            /* Primary color */
  font-weight: bold;         /* Make the text bold */
  margin-left: 10px;         /* Add space between the links */
  border-radius: 5px;        /* Slightly rounded corners */
  transition: all 0.3s ease; /* Smooth transition for hover effects */

  &:hover {
    background-color: #a6918a; /* Change background color on hover */
    color: white;              /* Change text color on hover */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); /* Add shadow on hover */
  }
`;

export default Navbars;
