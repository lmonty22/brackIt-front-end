import React from 'react'
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import LeftHalfContainer from './LeftHalfContainer'
import FinalsContainer from './FinalsContainer'
import RightHalfContainer from './RightHalfContainer'

let round_type
let final_round
let number_of_rounds 
let roundsNotIncludingFinal
let leftSideMatchUps
let rightSideMatchUps

// determines that round has 2, 4, 8, 12, 32, 64 teams 
const checkRoundType = (number_of_teams) => {
    let round_type 
    let x = Math.log2(number_of_teams)
    return Number.isInteger(x)? "normal" : 'invalid'
}

const ReturnLetSideMatchUps = (roundsNotIncludingFinal) =>{
    return roundsNotIncludingFinal.map(r => {
        let match_half = r.match_ups.length/2
        let obj = {
            ...r, 
            match_ups: [...r.match_ups.slice(0, (match_half))]
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
        round_type = checkRoundType(props.tournament.number_of_teams)
        number_of_rounds = props.tournament.rounds.length
        final_round = props.tournament.rounds[number_of_rounds - 1]
        roundsNotIncludingFinal = [...props.tournament.rounds.slice(0, number_of_rounds-1)]
                if (round_type === 'normal'){
                    leftSideMatchUps = ReturnLetSideMatchUps(roundsNotIncludingFinal)
                    rightSideMatchUps = ReturnRightSideMatchUps(roundsNotIncludingFinal)
                }
   }

   
    return (!props.tournament? <div>No Tourney to see here.</div> : 
        <div>
            <h1>{props.tournament.name}</h1>
            <Container fluid>
                <Row>
                    <Col><LeftHalfContainer rounds={leftSideMatchUps}/></Col>
                    <Col md="auto"><FinalsContainer rounds={final_round}/></Col>
                    <Col ><RightHalfContainer rounds={rightSideMatchUps}/></Col>
                </Row>
            </Container>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => (
        {tournament: state.tournaments.find(t => t.id === parseInt(ownProps.match.params.id))}
)

export default connect(mapStateToProps)(TournamentPage)


// <Container>
//   <Row>
//     <Col>1 of 3</Col>
//     <Col xs={6}>2 of 3 (wider)</Col>
//     <Col>3 of 3</Col>
//   </Row>
//   <Row>
//     <Col>1 of 3</Col>
//     <Col xs={5}>2 of 3 (wider)</Col>
//     <Col>3 of 3</Col>
//   </Row>
// </Container>