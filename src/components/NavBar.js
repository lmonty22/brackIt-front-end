import React from 'react';
import Navbar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'

const NavBar = ( ) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">BrackIt</Navbar.Brand>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/createtournament">Create Tournament</Nav.Link>
        </Navbar>
    )
}

export default NavBar
