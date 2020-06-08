import React from 'react'
import {Col, Form, Button} from 'react-bootstrap'
import {login} from '../redux/actions'
import { connect } from "react-redux";

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
    return (
        <Col> 
        <Form>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control type="username" placeholder="username!" onChange={this.onChange} value={this.state.name}/>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password" onChange={this.onChange} value={this.state.name}/>
        </Form.Group>
       
        <Button variant="primary" type="submit" onClick={this.onSubmit}>
             Login
        </Button>
      </Form>
      </Col>)
    }

}
// const mapStateToProps = (state) => {
//     return {tournaments: state.tournaments}
// }

const mapDispatchToProps = (dispatch) => {
    return {login: (userInfo) =>{dispatch(login(userInfo))}}
}


export default connect(null, mapDispatchToProps)(Login)