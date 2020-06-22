import React from 'react'
import { Form, Button, Modal} from 'react-bootstrap'
import {login} from '../redux/actions'
import { connect } from "react-redux";



class Login extends React.Component{
  constructor(){
    super()
    this.state = {
      username: '',
      password: '',
    }
  }

  // OnSubmit, call login from action stack, reset state. 
    onSubmit = (event) => {
        event.preventDefault()
        this.props.login(this.state)
        this.setState({
          username: '',
          password: ''
        })
    }
    
    // change username or password in state 
    onChange = (event) => {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }

    // Switch to Signup instead, close login modal, open signup modal
    switchCreateUser = () => {
      this.props.handleClose()
      this.props.handleCreateShow()
    }

    // if current user, close modal
    componentDidUpdate = (prevProps) => {
      if (prevProps.currentUser !== this.props.currentUser){
        this.props.handleClose()
      }
    }

    render(){
      return(
      <Modal show={this.props.show} onHide={this.props.handleClose}l>
      <Modal.Header closeButton >
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
           <Form>
            <div style={{color:'red'}}>{this.props.errors? this.props.errors: null} </div>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="username" onChange={this.onChange} value={this.state.username}/>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="password" onChange={this.onChange} value={this.state.password}/>
            </Form.Group>
           <Button variant="info" type="submit" onClick={this.onSubmit}>
                Login
            </Button>
            <Button variant='light' onClick={this.switchCreateUser}>
                SignUp
            </Button>
          </Form>
      </Modal.Body>
    </Modal>
      )}
  }


const mapStateToProps = (state) => {
    return {currentUser: state.currentUser,
             errors: state.errors}
}

const mapDispatchToProps = (dispatch) => {
    return {login: (userInfo) =>{dispatch(login(userInfo))}}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)