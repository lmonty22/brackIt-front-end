import React from 'react';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {matchUpWinner} from '../redux/actions'
import {connect} from 'react-redux'

const MatchUp = (props) => (
        props.matchUp.winner? 
        <div> 
                <Row>
                    <button type="button" class="btn btn-light" disabled> {props.matchUp.team_a.name}</button>  
                </Row>
                <Row>
                    <button type="button" class="btn btn-light" disabled>{props.matchUp.team_b.name}</button>
                </Row>
        </div>:
        <div >
                <Row>
                    {props.matchUp.team_a?  <button type="button" class="btn btn-light" onClick={() => props.matchUpWinner(props.matchUp, props.matchUp.team_a.id)}> {props.matchUp.team_a.name}</button> : 
                        <button type="button" class="btn btn-light" disabled>TBD</button>
                    }
                </Row>
                <Row> 
                    {props.matchUp.team_b?  <button  type="button" class="btn btn-dark" onClick={() => props.matchUpWinner(props.matchUp, props.matchUp.team_b.id)} > {props.matchUp.team_b.name}</button> : 
                        <button type="button" class="btn btn-dark" disabled>TBD</button>
                    }
                </Row>
        </div>
)

const mapDispatchToProps = (dispatch) => {
    return {matchUpWinner: (matchUp, winnerId) => {dispatch(matchUpWinner(matchUp, winnerId))}}
}



export default connect(null, mapDispatchToProps)(MatchUp)
