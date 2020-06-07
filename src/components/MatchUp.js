import React from 'react';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Badge from 'react-bootstrap/Badge'
import {matchUpWinner} from '../redux/actions'
import {connect} from 'react-redux'
import { SteppedLineTo} from 'react-lineto';



const MatchUp = (props) => {
        if (props.matchUp.winner_id){
        return (<div> 
                <Row className="teamA">
                    <Button type="button" className="teamButton" variant={props.matchUp.winner_id === props.matchUp.team_a_id? "success": "light"} disabled> {props.matchUp.team_a.name}</Button>  
                </Row>
                <Row className="teamB">
                    <Button type="button" className="teamButton" variant={props.matchUp.winner_id === props.matchUp.team_b_id? "success": "dark"} disabled>{props.matchUp.team_b.name}</Button>
                </Row>
        </div>)}
        else if (!props.matchUp.team_a_id || !props.matchUp.team_b_id){
        return (<div >
                <Row className="teamA" >
                    {props.matchUp.team_a?  <button type="button" className="btn btn-light teamButton" onClick={() => alert("You cannot advance a team that does not have an opponent in their current matchup.")}> {props.matchUp.team_a.name}</button> : 
                        <Button type="button" className="btn btn-light teamButton" disabled>&nbsp; </Button>
                    }
                </Row>
                <Row > 
                    {props.matchUp.team_b?  <button  type="button" className="btn btn-dark teamButton" onClick={() => alert("You cannot advance a team that does not have an opponent in their current matchup.")} > {props.matchUp.team_b.name}</button> : 
                        <Button type="button" className="btn btn-dark teamButton" disabled> &nbsp;  </Button>
                    }
                </Row>
         </div>)
        }
        else{
        return (<div >
                <Row className="teamA" >
                    <Button type="button" className="btn btn-light teamButton" onClick={() => props.matchUpWinner(props.matchUp, props.matchUp.team_a.id)}> {props.matchUp.team_a.name}</Button> 
                </Row>
                <Row className="teamB"> 
                    <Button  type="button" className="btn btn-dark teamButton " onClick={() => props.matchUpWinner(props.matchUp, props.matchUp.team_b.id)} > {props.matchUp.team_b.name}</Button>       
                </Row>
        </div>)}
}

const mapDispatchToProps = (dispatch) => {
    return {matchUpWinner: (matchUp, winnerId) => {dispatch(matchUpWinner(matchUp, winnerId))}}
}



export default connect(null, mapDispatchToProps)(MatchUp)
