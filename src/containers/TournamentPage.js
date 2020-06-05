import React from 'react'
import { connect } from "react-redux";
import {Container, Row, Col} from 'react-bootstrap'
import LeftHalfContainer from './LeftHalfContainer'
import FinalsContainer from './FinalsContainer'
import RightHalfContainer from './RightHalfContainer'


let roundType, finalRound, numberOfRounds, roundsSorted, roundsNotIncludingFinal, leftSideMatchUps, rightSideMatchUps


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

const TournamentPage = (props) => {
    if (props.tournament){
        numberOfRounds = checkRoundNumber(props.tournament.number_of_teams)
        roundsSorted = sortRounds(props.tournament.rounds)
        //array of 1 elemenet
        finalRound = roundsSorted[numberOfRounds-1]
        roundsNotIncludingFinal = [...roundsSorted.slice(0, numberOfRounds-1)]
                if (Number.isInteger(numberOfRounds)){
                    leftSideMatchUps = ReturnLetSideMatchUps(roundsNotIncludingFinal)
                    rightSideMatchUps = ReturnRightSideMatchUps(roundsNotIncludingFinal)
                }
                
   }
    
    return (!props.tournament? <div>No Tourney to see here.</div> : 
        <div>
            <h1>{props.tournament.name}</h1>
            <Container fluid>
                <Row >
                    <Col ><LeftHalfContainer rounds={leftSideMatchUps}/></Col>
                    <Col md="auto"><FinalsContainer round={finalRound} champ={props.tournament.champion}/></Col>
                    <Col ><RightHalfContainer rounds={rightSideMatchUps}/></Col>
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
        console.log(state.tournaments)
        return {tournament: state.tournaments.find(t => t.id === parseInt(ownProps.match.params.id))}
}

export default connect(mapStateToProps)(TournamentPage)

