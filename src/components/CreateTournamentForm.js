import React from 'react';
import {connect} from 'react-redux'
import {postTournament} from '../redux/actions'
import { Redirect } from 'react-router'
import { Tooltip, OverlayTrigger, Form, Col,  Button } from 'react-bootstrap';


class CreateTournamentForm extends React.Component{
    constructor(){
        super()
        this.state = {
            name: '',
            numberOfTeams: 4,
            redirect: false,
            teamNames: ['Team 1', 'Team 2', 'Team 3', 'Team 4'],
            shuffle: false,
            nameIncluded: true,
            private: false
        }
    }

    shuffleTeamsToggle = () => {
        this.setState({
            shuffle: !this.state.shuffle
        })
    }

    privateToggle = () => {
        this.setState({
            private: !this.state.private
        })
    }

    onSubmit = (event) => {
        event.preventDefault()
        if (this.state.nameIncluded && this.state.name.length > 0 ){
            this.props.postTournament(this.state, this.props.currentUser.id)
            this.setState({
                redirect: true
            })
        }else {
            this.setState({
                nameIncluded: false
            })
        }
    }
    

    validateNameRequired = () => {
        if (this.state.nameIncluded && this.state.name.length === 0){
            this.setState({
                nameIncluded: false 
            })
        }
    }
    onChange = (event) => {
        if (event.currentTarget.value.length === 0){
            this.setState({nameIncluded: false})
        }
        if (event.currentTarget.value.length > 0){
            this.setState({nameIncluded: true})
        }
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }

    setNewTeamsArray = (numberOfTeams) => {
        let newArray = [...this.state.teamNames]
        let secondArray = []
        for(let i = 0; i < parseInt(numberOfTeams); i ++){
            if (!newArray[i]){
            secondArray.push(`Team ${i+1}`)
            }else{
            secondArray.push(newArray[i])
            }
        
        }
        this.setState({
            teamNames: secondArray
        })
    }

    onTeamNumberChange = (event) => {
        this.validateNameRequired()
        this.setNewTeamsArray(event.currentTarget.value)
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }

    onTeamNameChange = (event) => {
        this.validateNameRequired()
        let teamsArray = [...this.state.teamNames]
        teamsArray.splice([parseInt(event.currentTarget.id)], 1, event.currentTarget.value)
        this.setState({
            teamNames: teamsArray
        })

    }

    dynamicTeamNames= () => {
        let array = []
        for(let i = 0; i < parseInt(this.state.numberOfTeams); i++){
            array.push(<div>
                <Form.Row>
                         <Form.Label column sm={2}> Team Name {i+1} </Form.Label>
                    <Col>
                        <Form.Control id={i} type="teamName" onChange={this.onTeamNameChange} value={this.state.teamNames[i]} />
                    </Col>
                </Form.Row>
            </div>)
            }
        return array
        }


    render(){
        if (this.state.redirect){
            return <Redirect to='/mytournaments'/>
        }
    return (
        <Col> 
        <div className='tourneyformDiv'>
            <h1>Create a BrackIt</h1>
        <Form>
        <Form.Group controlId="name">
          <Form.Label>Tournament Name</Form.Label>
          {!this.state.nameIncluded? <div style={{color: 'red'}}>Tournament Name is Required</div>: null}
          <Form.Control type="name" required={true} placeholder="Your Tourney Name" onChange={this.onChange} value={this.state.name}/>
        </Form.Group>


        <Form.Group controlId="numberOfTeams">
             <Form.Label>Number of Teams </Form.Label>
          <Form.Control as="select" onChange={this.onTeamNumberChange} value={this.state.numberOfTeams}>
            <option>4</option>
            <option>8</option>
            <option>16</option>
            <option>32</option>
            <option>64</option>
          </Form.Control>
        </Form.Group>
        <Form.Group >
            <OverlayTrigger key={'private'} placement="left" overlay={
                  <Tooltip id="private-tooltip">
                    Private Tournaments will not appear in search results for other users. You may still send a private link to friends.
                  </Tooltip>
            }><Form.Check
            type="checkbox"
            id="private-checkbox"
            label="Private"
            onChange={this.privateToggle}
            checked={this.state.private}>
                
            </Form.Check>
            </OverlayTrigger>
        </Form.Group>


        <Form.Group >
            <OverlayTrigger key={'shuffle'} placement="left" overlay={
                  <Tooltip id="shuffle-tooltip">
                      Shuffle teams will randomize first round matchups. Leaving this unchecked will allow you to choose first round matchups below. (Team 1 will play Team 2, Team 3 will play Team 4 etc.)
                  </Tooltip>
            }><Form.Check
            type="checkbox"
            id="shuffle-checkbox"
            label="Shuffle Teams"
            onChange={this.shuffleTeamsToggle}
            checked={this.state.shuffle}>
            </Form.Check>
            </OverlayTrigger>
        </Form.Group>


        <Form.Group controlId="teamNames">
            {this.dynamicTeamNames()}   
        </Form.Group>
        <Button variant="light" type="submit" onClick={this.onSubmit}>
             Generate BrackIt
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