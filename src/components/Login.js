import React from 'react'
import {Col, Form, Button} from 'react-bootstrap'
import {login} from '../redux/actions'
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'

class Login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: '',
            password: ''
        }
    }
    onSubmit = (event) => {
        event.preventDefault()
        this.props.login(this.state)
        this.setState({
          username: '',
          password: ''
        })
    }
    
    onChange = (event) => {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }

    render(){
      return this.props.currentUser? <Redirect to="/mytournaments"/>: 
           <Col> 
            <Form>
              <div style={{color:'red'}}>{this.props.errors? this.props.errors: null} </div>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control type="username" placeholder="username!" onChange={this.onChange} value={this.state.username}/>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="password" onChange={this.onChange} value={this.state.password}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={this.onSubmit}>
                Login
            </Button>
          </Form>
          </Col>
    }
  }


const mapStateToProps = (state) => {
    return {currentUser: state.currentUser,
             errors: state.errors}
}

const mapDispatchToProps = (dispatch) => {
    return {login: (userInfo) =>{dispatch(login(userInfo))}}
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)