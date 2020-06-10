import React from 'react'
import { connect } from "react-redux";
import {Row, Col, Spinner} from 'react-bootstrap'
import LeftHalfContainer from './LeftHalfContainer'
import FinalsContainer from './FinalsContainer'
import RightHalfContainer from './RightHalfContainer'
import '../App.css';


let finalRound, numberOfRounds, roundsSorted, roundsNotIncludingFinal, leftSideMatchUps, rightSideMatchUps


const sortRounds = (allRounds) => {
    let sr = allRounds.sort((a, b) => {return a.id - b.id})
    return sr.map( r => {
        return {...r, match_ups: [...r.match_ups].sort((a, b)=> a.match_up_number - b.match_up_number)}
        })
}

// determines that round has 2, 4, 8, 12, 32, 64 teams 
const checkRoundNumber = (numberOfTeams) => {   
   return (Math.log2(numberOfTeams))
}

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

    componentDidMount(){
        if(this.props.tournament && this.state.loading){
            this.setState({
                loading: false
            })
        }
    }

    
    componentDidUpdate(){
        if(this.props.tournament && this.state.loading){
            this.setState({
                loading: false
            })
        }
    }

render (){
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
                
   }
    return (!this.props.tournament? <Spinner/> : 
        <div>
            <div className='tourneyHeader'>
            <h1>{this.props.tournament.name}</h1>
             <p>Created By: @{this.props.tournament.user.username}</p>
             </div>
             <Row className='tourney' >
                    <Col ><LeftHalfContainer loading={this.state.loading} rounds={leftSideMatchUps} /></Col>
                    <Col md="auto" ><FinalsContainer  loading={this.state.loading} round={finalRound}  champ={this.props.tournament.champion}/></Col>
                    <Col><RightHalfContainer loading={this.state.loading} rounds={rightSideMatchUps} /></Col>
             </Row>
        </div>
)}

}

const mapStateToProps = (state, ownProps) => {
        return {tournament: state.tournaments.find(t => t.id === parseInt(ownProps.match.params.id))}
}

export default connect(mapStateToProps)(TournamentPage)

