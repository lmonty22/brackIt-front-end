import React from 'react';
import Navbar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

const NavBar = ( ) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">BrackIt</Navbar.Brand>
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
        </Navbar>
    )
}

export default NavBar
