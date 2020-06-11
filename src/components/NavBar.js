import React from 'react';
import Navbar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import {FormControl} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import {logout} from '../redux/actions'
import '../App.css'

const NavBar = (props) => {
    return (
        <Navbar sticky="top" bg="light" expand="lg">
            <Nav className="mr-auto">
            <Link to='/'><Navbar.Brand>BrackIt</Navbar.Brand></Link>
            {/* <Form inline>
                <FormControl type="text" placeholder="Search" className=" mr-sm-2" />
                <Button type="submit">Submit</Button>
            </Form> */}
            </Nav>
            <Nav >
            {props.currentUser? <Nav.Link as={Link} to='/createtournament'>Create Tournament</Nav.Link> :  <Link to='/login'><Button variant="light">Login</Button>  </Link>}
            {props.currentUser?  <Nav.Link as={Link} to='/mytournaments'>My Tournaments</Nav.Link> :  <Link to='/signup'><Button>Signup</Button> </Link> }
            {props.currentUser?   <Button onClick={() => props.logout()}>Logout</Button> : null }
            </Nav>
        </Navbar>
    )
}

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}

const mapDispatchToProps = (dispatch) => {
    return {logout: () => {dispatch(logout())}}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
