import React from 'react'
import { connect } from "react-redux";
import {Row, Col, Spinner, Button, Badge } from 'react-bootstrap'
import LeftHalfContainer from './LeftHalfContainer'
import FinalsContainer from './FinalsContainer'
import RightHalfContainer from './RightHalfContainer'
import {removeCurrentTournament, fetchTournament, followTournament, unfollowTournament} from '../redux/actions'
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
            tournamentLoaded: false
        }
    }

    // fetch the tournament based on the tournament id (chose to do this instead of storing all  tournaments data 
    // in store because the nested data is heavy )
    componentDidMount(){
        if (!this.props.tournament){
            this.props.fetchTournament(this.props.match.params.id)
        }
        if(this.props.tournament && this.state.loading){
            this.setState({
                loading: false
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
                loading: false
            })
        }
    }

render (){
    // if tournament exists, split up matchups by left side, right side and final 
    if (this.props.tournament){
        numberOfRounds = checkRoundNumber(this.props.tournament.number_of_teams)
        roundsSorted = sortRounds(this.props.tournament.rounds)
        //array of 1 elemenet
        finalRound = roundsSorted[numberOfRounds-1]
        roundsNotIncludingFinal = [...roundsSorted.slice(0, numberOfRounds-1)]
            if (Number.isInteger(numberOfRounds)){
                leftSideMatchUps = ReturnLetSideMatchUps(roundsNotIncludingFinal)
                rightSideMatchUps = ReturnRightSideMatchUps(roundsNotIncludingFinal)
            } 
            if(this.props.currentUser && this.props.tournament.user_id !== this.props.currentUser.id){
                follow = this.props.currentUser.followers.find(f => f.tournament_followed_id === this.props.tournament.id)
            }
        }
    // if no tournament / loading, display spinner, otherside display tournament page
    return (!this.props.tournament?  <div className='spinnerDiv'><Spinner animation="border" className='spinner-info' /></div> : 
        <div>
            <div className='tourneyHeader'>
            <h1>{this.props.tournament.name}</h1>
             <p>Created By: @{this.props.tournament.user.username}</p>
    {this.props.currentUser && this.props.tournament.user_id === this.props.currentUser.id? <h4><Badge className='badge-info'>You're the tournament admin! Only you have the power to make changes. Click on matchups to record scores, advance teams, and edit team names. Have fun!</Badge></h4>: null }
             {this.props.currentUser && this.props.tournament.user_id !== this.props.currentUser.id && !follow? <Button className={'btn-info'} onClick={() => this.props.followTournament(this.props.tournament.id, this.props.currentUser.id)} >Follow Tournament </Button>: null}
             {this.props.currentUser && this.props.tournament.user_id !== this.props.currentUser.id && follow? <Button className={'btn-info'} onClick={() => this.props.unfollowTournament(follow)} >Unfollow Tournament </Button>: null}
            <br/>
             </div>
           
             <Row className='tourney' >
                    <Col ><LeftHalfContainer loading={this.state.loading} tUser={this.props.tournament.user_id} rounds={leftSideMatchUps} /></Col>
                    <Col md="auto" ><FinalsContainer  loading={this.state.loading} tUser={this.props.tournament.user_id} round={finalRound}  champ={this.props.tournament.champion}/></Col>
                    <Col><RightHalfContainer loading={this.state.loading} tUser={this.props.tournament.user_id} rounds={rightSideMatchUps} /></Col>
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
        unfollowTournament: (follow) => dispatch(unfollowTournament(follow))}
}

export default connect(mapStateToProps, mapDispatchToProps)(TournamentPage)

