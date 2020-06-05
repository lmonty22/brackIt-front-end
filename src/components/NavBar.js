import React from 'react';
import Navbar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'

const NavBar = ( ) => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">BrackIt</Navbar.Brand>
            <Link to='/'>Home</Link>
            <Link to="/createtournament">Create Tournament</Link>
        </Navbar>
    )
}

export default NavBar
