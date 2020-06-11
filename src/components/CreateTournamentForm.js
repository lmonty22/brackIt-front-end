import React from 'react';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import {connect} from 'react-redux'
import {postTournament} from '../redux/actions'
import { Redirect } from 'react-router'

class CreateTournamentForm extends React.Component{
    constructor(){
        super()
        this.state = {
            name: '',
            numberOfTeams: 4,
            teamNames: [],
            redirect: false
        }
    }
    onSubmit = (event) => {
        event.preventDefault()
        this.props.postTournament(this.state, this.props.currentUser.id)
        this.setState({
            redirect: true
        })
    }
    
    onChange = (event) => {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }

    textAreaToArray = (event) => {
        this.setState({
            [event.currentTarget.id]: event.target.value.split("\n")
    })
    }


    render(){
        if (this.state.redirect){
            return <Redirect to='/mytournaments'/>
        }
    return (
        <Col> 
        <div className='tourneyformDiv'>
            <h1>Create a Tournament</h1>
        <Form>
        <Form.Group controlId="name">
          <Form.Label>Tournament Name</Form.Label>
          <Form.Control type="name" placeholder="Your Tourney Name!" onChange={this.onChange} value={this.state.name}/>
        </Form.Group>
        <Form.Group controlId="numberOfTeams">
             <Form.Label>Number of Teams </Form.Label>
          <Form.Control as="select" onChange={this.onChange} value={this.state.numberOfTeams}>
            <option>4</option>
            <option>8</option>
            <option>16</option>
            <option>32</option>
            <option>64</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="teamNames">
             <Form.Label>Enter Team Names, one per line ({this.state.teamNames.length > this.state.numberOfTeams? `You have too many team names ${this.state.teamNames.length} have been named` : `${this.state.teamNames.length} teams have been named)`}</Form.Label>
          <Form.Control as="textarea" rows="10" onChange={this.textAreaToArray} />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={this.onSubmit}>
             Submit
        </Button>
      </Form>
      </div>
      </Col>)
    }

}
const mapStateToProps = (state) => {
    return {currentUser: state.currentUser }
}

const mapDispatchToProps = (dispatch) => {
    return {postTournament: (tournament, userId) =>{dispatch(postTournament(tournament, userId))}}
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateTournamentForm)