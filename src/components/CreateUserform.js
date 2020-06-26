import React from 'react'
import {Form, Button, Modal} from 'react-bootstrap'
import { connect } from "react-redux";
import {postUser} from '../redux/actions'
import {Redirect} from 'react-router-dom'

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
            usernameAvailable: true,
            usernameRequired: false,
            redirect: false
        }
    }

    // On Submit, check validation, close modal, postUser and reset state.
    onSubmit = (event) => {
        event.preventDefault()
        if (this.state.usernameAvailable && this.state.passwordCorrrect && this.state.usernameRequired){
            this.props.handleClose()
            // send fetch call with {username: this.state.username, password: this.state.password}
            this.props.postUser({username: this.state.username, password: this.state.password})
            this.setState({
            username: '',
            password: '',
            passwordConfirmation: '',
            passwordCorrrect: true,
            errors: {
                passowrd: '',
                username: ''
            },
            usernameAvailable: true,
            usernameRequired: false,
            redirect: true
        })

        }
    }

    // called by checkUsername is username is not taken, set valid to true. 
    validUsername = () => {
        this.setState({
            usernameAvailable: true,
            errors: {
                ...this.state.errors,
                username: ''
            }
        })
    }

    // called by checkUsername is username is taken, set valid to false and add error. 
    invalidUsername = ()=> {
        this.setState({
            usernameAvailable: false,
            errors: {
                ...this.state.errors,
                username: 'Username is already taken.'
            }
        })
    }


    // Checks if username is unqiue, called by OnChange
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

    // Called by OnChange if passwords don't match
    passwordError = () => {
        this.setState({
            passwordCorrrect: false,
            errors: {
                ...this.state.errors,
                password: 'passwords must mactch'
            }
        })
    }

    // Called by OnChange if passwords do match 
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
        // Check if password matches passwordConfirmation
        if (event.currentTarget.id === 'password'){
            if (event.currentTarget.value === this.state.passwordConfirmation) {
               this.passwordCorrrect()
            }else {
                this.passwordError()
            }
        }
        // Check if passwordConfirmation matches password
        if (event.currentTarget.id === 'passwordConfirmation'){
            if (event.currentTarget.value === this.state.password) {
               this.passwordCorrrect()
            }else {
                this.passwordError()
            }
        }
        // check if username is unique 
        if (event.currentTarget.id === 'username'){
            this.checkUsername(event.currentTarget.value)
        }
         //check if usname is present 
        if (event.currentTarget.id === 'username' && event.currentTarget.value.length > 0){
            this.setState({
                usernameRequired: true
            })
        }
        if (event.currentTarget.id === 'username' && event.currentTarget.value.length === 0){
            this.setState({
                usernameRequired: false
            })
        }

    }

    // called when a user selects "signup" from Modal 
    switchLoginIn = () => {
        this.props.handleClose()
        this.props.handleLoginShow()
    }

    render(){
     if (this.props.currentUser && this.state.redirect){
            this.setState({redirect: false})
            return <Redirect to='/mytournaments'/>
    }
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
            <Button variant='info' onClick={this.switchLoginIn}>Login</Button>
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

