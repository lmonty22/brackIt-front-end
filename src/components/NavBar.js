import React from 'react';
import Navbar from 'react-bootstrap/NavBar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import {FormControl} from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import {logout} from '../redux/actions'
import logo from '../assets/BrackIt.png'
import {newSearchTerm} from '../redux/actions'
import { Redirect} from "react-router-dom"

import '../App.css'

class NavBar extends React.Component {

    constructor(){
        super()
        this.state ={
            searchTerm: ''
        }
    }
    onChange = (e) => {
        this.props.search(e.currentTarget.value)
        this.setState({
            searchTerm: (e.currentTarget.value)
        })
    }

    onReset = () => {
        this.props.search('')
        this.setState({
            searchTerm: ''
        })
    }
 
    render(){
    return (
        <Navbar sticky="top" bg="light" expand="lg">
            <Nav>
            <Link to='/'><Navbar.Brand>
                 <img
                alt="brackit logo"
                src={logo}
                width="200"
                height="80"
                className="d-inline-block align-top"
            />{' '}
                </Navbar.Brand></Link>
             <Form inline>
                <FormControl onChange={this.onChange} value={this.state.searchTerm} type="text" placeholder="Search" className=" mr-sm-2" />
                <Link to='/' ><Button variant="info"type="submit">Submit</Button></Link>
                {this.props.searchTerm.length > 0? <Button onClick={this.onReset} variant="light">Reset</Button>: null}
            </Form>

            </Nav>
            <Nav >
            {this.props.currentUser? <Nav.Link as={Link} to='/createtournament'>Create Tournament</Nav.Link> :  <Link to='/login'><Button variant="light">Login</Button>  </Link>}
            {this.props.currentUser?  <Nav.Link as={Link} to='/mytournaments'>My Tournaments</Nav.Link> :  <Link  to='/signup'><Button variant="info">Signup</Button> </Link> }
            {this.props.currentUser?   <Button variant="info" onClick={() => this.props.logout()}>Logout</Button> : null }
            </Nav>
        </Navbar>
    )
     }
}

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser,
            searchTerm: state.searchTerm}
}

const mapDispatchToProps = (dispatch) => {
    return {logout: () => {dispatch(logout())},
            search: (searchTerm) => {dispatch(newSearchTerm(searchTerm))}}
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
