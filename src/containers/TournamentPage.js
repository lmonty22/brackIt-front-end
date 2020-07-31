import React from 'react'
import { connect } from "react-redux";
import {Row, Col, Spinner, Button, Popover, OverlayTrigger, Form, FormControl, Jumbotron } from 'react-bootstrap'
import LeftHalfContainer from './LeftHalfContainer'
import FinalsContainer from './FinalsContainer'
import RightHalfContainer from './RightHalfContainer'
import {removeCurrentTournament, fetchTournament, followTournament, unfollowTournament, patchTournament} from '../redux/actions'
import '../App.css';


let finalRound, numberOfRounds, roundsSorted, roundsNotIncludingFinal, leftSideMatchUps, rightSideMatchUps, follow


// sort rounds before spliting them into left side and right side
// after patching a tournament, the rounds and matchups are sent back in a different order
// they need to be sorted by round and by matchup number before being split
const sortRounds = (allRounds) => {
    let sr = allRounds.sort((a, b) => {return a.id - b.id})
    return sr.map( r => {
        return {...r, match_ups: [...r.match_ups].sort((a, b)=> a.match_up_number - b.match_up_number)}
        })
}

// returns how many rounds should be in the tournament based on number of teams
const checkRoundNumber = (numberOfTeams) => {   
   return (Math.log2(numberOfTeams))
}

// returns the matchups that will be on the left side (the first half of each round)
const ReturnLetSideMatchUps = (roundsNotIncludingFinal) =>{
    return roundsNotIncludingFinal.map(r => {
        let matchHalf = r.match_ups.length/2
        let obj = {
            ...r, 
            match_ups: [...r.match_ups.slice(0, (matchHalf))]
        }
        return obj
    })
}

// returns the matchups that will be on the right side (second half of each round)
const ReturnRightSideMatchUps = (roundsNotIncludingFinal) => {
    return roundsNotIncludingFinal.map(r => {
        let startElement = r.match_ups.length/2
        let obj = {
            ...r, 
            match_ups: [...r.match_ups.slice(startElement)]
        }
        return obj
    })

}

class TournamentPage extends React.Component{
    constructor(){
        super()
        this.state={
            loading: true,
            tournamentLoaded: false,
            tournamentName: ''
        }
    }

    // change tournament name in state and update on backend 
    onTournamentNameChange = (e) => {
        this.setState({
            tournamentName: e.currentTarget.value
        })
        this.props.patchTournament(this.props.tournament.id, {name: e.currentTarget.value})
    }
    // fetch the tournament based on the tournament id (chose to do this instead of storing all  tournaments data 
    // in store because the nested data is heavy )
    componentDidMount(){
        if (!this.props.tournament){
            this.props.fetchTournament(this.props.match.params.id)
        }
        if(this.props.tournament && this.state.loading){
            this.setState({
                loading: false,
                tournamentName: this.props.tournament.name
            })
        }
    }

    // remove current tournament from store when unmounting(this may be help for redirects after creating a new tournament)
    componentWillUnmount(){
        if (this.props.tournament){
            this.props.removeCurrentTournament()
        }
    }

    // set loading to false if tournament is fetched 
    componentDidUpdate(){
        if(this.props.tournament && this.state.loading){
            this.setState({
                loading: false,
                tournamentName: this.props.tournament.name
            })
        }
    }

render (){
    // if tournament exists, split up matchups by left side, right side and final 
    const {tournament, currentUser} = this.props
    if (tournament){
        numberOfRounds = checkRoundNumber(tournament.number_of_teams)
        roundsSorted = sortRounds(tournament.rounds)
        //array of 1 elemenet
        finalRound = roundsSorted[numberOfRounds-1]
        roundsNotIncludingFinal = [...roundsSorted.slice(0, numberOfRounds-1)]
            if (Number.isInteger(numberOfRounds)){
                leftSideMatchUps = ReturnLetSideMatchUps(roundsNotIncludingFinal)
                rightSideMatchUps = ReturnRightSideMatchUps(roundsNotIncludingFinal)
            } 
            if(currentUser && tournament.user_id !== currentUser.id){
                follow = currentUser.followers.find(f => f.tournament_followed_id === tournament.id)
            }
        }
    // if no tournament / loading, display spinner, otherside display tournament page
    return (!tournament?  <div className='spinnerDiv'><Spinner animation="border" className='spinner-info' /></div> : 
    <div>
             {currentUser && tournament.user_id === currentUser.id? <Jumbotron className='adminBox'>You're the tournament admin! Only you have the power to make changes. Click on matchups to record scores, advance teams, and edit team names. Click on Edit Tournament to toggle your tournament from Private to Public or update the tournament name. Have fun!</Jumbotron>: null }
            <div className='tourneyHeader'>
            <h1>{tournament.name}</h1>
             <p>Created By: @{tournament.user.username}</p>
            {currentUser && tournament.user_id === currentUser.id? 
            <OverlayTrigger trigger='click' placement='right' rootClose overlay={
                <Popover>
                    <Popover.Title>Edit {tournament.name}</Popover.Title>
                    <Popover.Content>
                    <Form >
                            <Form.Label >Tournament Name</Form.Label>
                          <FormControl onChange={this.onTournamentNameChange} value={this.state.tournamentName} type="text" className=" mr-sm-2" />
                    </Form>
                    {tournament.public? 
                    <div>
                        <p>This tournament is public. Public BrackIts appear in search results and on the home page. 
                    Private tournaments are not searchable but are still accessible via their url.</p>
                    <Button variant='info' onClick={() => this.props.patchTournament(tournament.id, {public: false})}>Make Private </Button>
                     </div>:
                     <div>
                         <p>This tournament is private. Private BrackIts do not appear in search results and on the home page, but are 
                    still accessible via their url.</p>
                    <Button variant='info' onClick={() => this.props.patchTournament(tournament.id, {public: true})}>Make Public</Button>
                    </div>
                    }
                    {tournament.champion? <Button onClick={() => this.props.patchTournament(tournament.id, {champion_id: null})}className='btn-dark'>Remove Champion</Button>: null }
                    </Popover.Content>
                </Popover>
            }>
            <Button variant='light'>Edit Tournament</Button>
            </OverlayTrigger>
            : null }

             {currentUser && tournament.user_id !== currentUser.id && !follow? <Button className={'btn-info'} onClick={() => this.props.followTournament(tournament.id, currentUser.id)} >Follow Tournament </Button>: null}
             {currentUser && tournament.user_id !== currentUser.id && follow? <Button className={'btn-info'} onClick={() => this.props.unfollowTournament(follow)} >Unfollow Tournament </Button>: null}
            <br/>
             </div>
           
             <Row className='tourney' >
                    <Col ><LeftHalfContainer loading={this.state.loading} tUser={tournament.user_id} rounds={leftSideMatchUps} /></Col>
                    <Col md="auto" ><FinalsContainer  loading={this.state.loading} tUser={tournament.user_id} round={finalRound}  champ={tournament.champion}/></Col>
                    <Col><RightHalfContainer loading={this.state.loading} tUser={tournament.user_id} rounds={rightSideMatchUps} /></Col>
             </Row>
        </div>
)}

}

const mapStateToProps = (state, ownProps) => {
        return {tournament: state.currentTournament,
                currentUser: state.currentUser}
}

const mapDispatchToProps = (dispatch) => {
    return {removeCurrentTournament: () => dispatch(removeCurrentTournament()),
        fetchTournament: (tournamentId) => {dispatch(fetchTournament(tournamentId))},
        followTournament: (tournamentId, userId) => dispatch(followTournament(tournamentId, userId)),
        unfollowTournament: (follow) => dispatch(unfollowTournament(follow)),
        patchTournament: (tournamentId, obj) => dispatch(patchTournament(tournamentId, obj))}
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentPage)

