import React from 'react';
import {FormControl, Form, Navbar, Nav, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { connect } from "react-redux";
import {logout} from '../redux/actions'
import logo from '../assets/BrackIt.png'
import {newSearchTerm} from '../redux/actions'
import '../App.css'

class NavBar extends React.Component {

    constructor(){
        super()
        this.state ={
            searchTerm: ''
        }
    }
    
    // change search term 
    onChange = (e) => {
        this.props.search(e.currentTarget.value)
        this.setState({
            searchTerm: (e.currentTarget.value)
        })
    }

    // reset search bar 
    onReset = () => {
        this.props.search('')
        this.setState({
            searchTerm: ''
        })
    }

  
 
    render(){
    return (
        <div>
        <Navbar sticky="top" bg="light" expand="lg" style={{justifyContent: 'space-between', maxHeight:'57px'}}>
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
                <FormControl onChange={this.onChange} value={this.state.searchTerm} type="text" placeholder="Search Tournaments" className=" mr-sm-2" />
                <Link to='/' ><Button variant="info" type="submit">Search</Button></Link>
                {this.props.searchTerm.length > 0? <Button onClick={this.onReset} variant="light">Reset</Button>: null}
            </Form>
            </Nav>
            <Nav >
             {this.props.currentUser? <Nav.Link as={Link} to='/createtournament'>Create BrackIt</Nav.Link> :  <Button variant="info" onClick={this.props.handleShowLogin}>Login</Button> } 
            {this.props.currentUser?  <Nav.Link as={Link} to='/mytournaments'>My Tournaments</Nav.Link> :  <Button variant="light" onClick={this.props.handleCreateShow}> Signup </Button>  }
            {this.props.currentUser? <Nav.Link as={Link} to='/mytournaments' style={{margin : 'auto', color: 'grey'}}>@{this.props.currentUser.username} </Nav.Link>: null}
            {this.props.currentUser?   <Link to='/'><Button variant="info" onClick={() => this.props.logout()}>Logout</Button></Link>: null }
            </Nav>
        </Navbar>
        </div>
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
