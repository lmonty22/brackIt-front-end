import React from 'react'
import {Col, Form, Button, Modal} from 'react-bootstrap'
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'
import {postUser} from '../redux/actions'

class CreateUserForm extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            password: '',
            passwordConfirmation: '',
            passwordCorrrect: true,
            errors: {
                passowrd: '',
                username: ''
            },
            usernameAvailable: true
        }
    }
    onSubmit = (event) => {
        event.preventDefault()
        if (this.state.usernameAvailable && this.state.passwordCorrrect){
            this.props.handleClose()
            // send fetch call with {username: this.state.username, password: this.state.password}
            this.props.postUser({username: this.state.username, password: this.state.password})

        }
    }

    validUsername = () => {
        this.setState({
            usernameAvailable: true,
            errors: {
                ...this.state.errors,
                username: ''
            }
        })
    }

    invalidUsername = ()=> {
        this.setState({
            usernameAvailable: false,
            errors: {
                ...this.state.errors,
                username: 'Username is already taken.'
            }
        })
    }



    checkUsername = (username) => {
        fetch('http://localhost:3000/users')
        .then(respone => respone.json())
        .then(data => {
            let username_exists = data.find(user => user.username === username)
            if (username_exists){
                this.invalidUsername()
            }else {this.validUsername()}
        })
    }

    passwordError = () => {
        this.setState({
            passwordCorrrect: false,
            errors: {
                ...this.state.errors,
                password: 'passwords must mactch'
            }
        })
    }

    passwordCorrrect = () => {
        this.setState({
            passwordCorrrect: true,
            errors: {
                ...this.state.errors,
                password: ''
            }
        })
    }
    
    onChange = (event) => {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
        if (event.currentTarget.id === 'password'){
            if (event.currentTarget.value === this.state.passwordConfirmation) {
               this.passwordCorrrect()
            }else {
                this.passwordError()
            }
        }
        if (event.currentTarget.id === 'passwordConfirmation'){
            if (event.currentTarget.value === this.state.password) {
               this.passwordCorrrect()
            }else {
                this.passwordError()
            }
        }
        if (event.currentTarget.id === 'username'){
            this.checkUsername(event.currentTarget.value)
        }

    }

    render(){
    //   return this.props.currentUser? <Redirect to="/mytournaments"/>: 
    return(
      <Modal show={this.props.show} onHide={this.props.handleClose}l>
      <Modal.Header closeButton >
        <Modal.Title>SignUp</Modal.Title>
      </Modal.Header>
      <Modal.Body>
           <Form>
        <ul style={{color:'red'}}>
            {!this.state.passwordCorrrect? <li>{this.state.errors.password}</li> : null}
            {!this.state.usernameAvailable? <li>{this.state.errors.username}</li>: null }
        </ul>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="create a username" onChange={this.onChange} value={this.state.username}/>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="password" onChange={this.onChange} value={this.state.password}/>
            </Form.Group>
            <Form.Group controlId="passwordConfirmation">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" placeholder="password" onChange={this.onChange} value={this.state.passwordConfirmation}/>
            </Form.Group>
            <Button variant="light" type="submit" onClick={this.onSubmit}>
                SignUp
            </Button>
          </Form>
      </Modal.Body>
    </Modal>)
    }
  }
 




const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}

const mapDispatchToProps = (dispatch) => {
    return {postUser: (userInfo) =>{dispatch(postUser(userInfo))}}
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateUserForm)

