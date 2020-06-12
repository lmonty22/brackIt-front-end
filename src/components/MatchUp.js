import React from 'react';
import {Button, Row} from 'react-bootstrap'
import {matchUpWinner} from '../redux/actions'
import {connect} from 'react-redux'
import LineTo, { SteppedLineTo} from 'react-lineto';
import '../App.css'

const getNextMatchUp = (currentMatchUp) => {
    if (currentMatchUp % 2 === 0){
        return (currentMatchUp/2)
    }else{
        return (currentMatchUp + 1)/ 2
    }
}

const MatchUp = (props) => {
        let nextRound = props.round_number + 1
        let nextMatchUp = getNextMatchUp(props.matchUp.match_up_number)


        if (props.currentUser && props.currentUser.id === props.tUser){
        if (props.matchUp.winner_id){
        return (<div className={`matchup R${props.round_number}-M${props.matchUp.match_up_number}`}> 
                <Row  >
                    <Button type="button" className={`teamButton `} style={props.matchUp.winner_id === props.matchUp.team_a_id? {fontWeight: 'bold'}: {textDecoration: 'line-through'}} variant={"dark"} > {props.matchUp.team_a.name}</Button>  
                </Row>
                <Row >
                    <Button type="button" className={`teamButton `} style={props.matchUp.winner_id === props.matchUp.team_b_id? {fontWeight: 'bold'}: {textDecoration: 'line-through'}}  variant={"light"} >{props.matchUp.team_b.name}</Button>
                </Row>
                <SteppedLineTo borderColor={'grey'} from={`R${props.round_number}-M${props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={props.start}  fromAnchor={props.end}  orientation='h' />
                </div>)}
        else if (!props.matchUp.team_a_id || !props.matchUp.team_b_id){
        return (<div className={`matchup R${props.round_number}-M${props.matchUp.match_up_number}`}>
                 <Row >
                    {props.matchUp.team_a?  <button type="button" className={`btn btn-dark teamButton `} onClick={() => alert("You cannot advance a team that does not have an opponent in their current matchup.")}> {props.matchUp.team_a.name}</button> : 
                        <Button type="button" className={`btn btn-dark teamButton`} disabled>&nbsp; </Button>
                    }
                </Row>
                <Row  >
                    {props.matchUp.team_b?  <button  type="button" className={`btn btn-light teamButton `} onClick={() => alert("You cannot advance a team that does not have an opponent in their current matchup.")} > {props.matchUp.team_b.name}</button> : 
                        <Button type="button" className={`btn btn-light teamButton` } disabled> &nbsp;  </Button>
                    }
                </Row>
                <SteppedLineTo  borderColor={'grey'} from={`R${props.round_number}-M${props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={props.start}  fromAnchor={props.end}  orientation='h' />
         </div>)
        }
        else{
        return (<div className={`matchup R${props.round_number}-M${props.matchUp.match_up_number}`}>
                 <Row  >
                    <Button type="button" className={`btn btn-dark teamButton `} onClick={() => props.matchUpWinner(props.matchUp, props.matchUp.team_a.id)}> {props.matchUp.team_a.name}</Button> 
                </Row>
                <Row  >
                    <Button  type="button" className={`btn btn-light teamButton `} onClick={() => props.matchUpWinner(props.matchUp, props.matchUp.team_b.id)} > {props.matchUp.team_b.name}</Button>       
                </Row>
                <SteppedLineTo borderColor={'grey'} from={`R${props.round_number}-M${props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={props.start}  fromAnchor={props.end}  orientation='h' />
        </div>)}
        }else {
            if (props.matchUp.winner_id){
                return (<div className={`matchup R${props.round_number}-M${props.matchUp.match_up_number}`}> 
                        <Row  >
                            <Button type="button" className={`teamButton `} style={props.matchUp.winner_id === props.matchUp.team_a_id? {fontWeight: 'bold'}: {textDecoration: 'line-through'}} variant={"dark"} > {props.matchUp.team_a.name}</Button>  
                        </Row>
                        <Row >
                            <Button type="button" className={`teamButton `} style={props.matchUp.winner_id === props.matchUp.team_b_id? {fontWeight: 'bold'}: {textDecoration: 'line-through'}}  variant={"light"} >{props.matchUp.team_b.name}</Button>
                        </Row>
                        <SteppedLineTo borderColor={'grey'} from={`R${props.round_number}-M${props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={props.start}  fromAnchor={props.end}  orientation='h' />
                        </div>)}
                else if (!props.matchUp.team_a_id || !props.matchUp.team_b_id){
                return (<div className={`matchup R${props.round_number}-M${props.matchUp.match_up_number}`}>
                         <Row >
                            {props.matchUp.team_a?  <button type="button" className={`btn btn-dark teamButton `}> {props.matchUp.team_a.name}</button> : 
                                <Button type="button" className={`btn btn-dark teamButton`} disabled>&nbsp; </Button>
                            }
                        </Row>
                        <Row  >
                            {props.matchUp.team_b?  <button  type="button" className={`btn btn-light teamButton `}  > {props.matchUp.team_b.name}</button> : 
                                <Button type="button" className={`btn btn-light teamButton` } disabled> &nbsp;  </Button>
                            }
                        </Row>
                        <SteppedLineTo  borderColor={'grey'} from={`R${props.round_number}-M${props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={props.start}  fromAnchor={props.end}  orientation='h' />
                 </div>)
                }
                else{
                return (<div className={`matchup R${props.round_number}-M${props.matchUp.match_up_number}`}>
                         <Row  >
                            <Button type="button" className={`btn btn-dark teamButton `} > {props.matchUp.team_a.name}</Button> 
                        </Row>
                        <Row  >
                            <Button  type="button" className={`btn btn-light teamButton `} > {props.matchUp.team_b.name}</Button>       
                        </Row>
                        <SteppedLineTo borderColor={'grey'} from={`R${props.round_number}-M${props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={props.start}  fromAnchor={props.end}  orientation='h' />
                </div>)}


        }
}

// need to build in functionality so only the user who created the tournament can advance players
const mapStateToProps = (state) => {
    return { currentUser: state.currentUser}
}
const mapDispatchToProps = (dispatch) => {
    return {matchUpWinner: (matchUp, winnerId) => {dispatch(matchUpWinner(matchUp, winnerId))}}
}



export default connect(mapStateToProps, mapDispatchToProps)(MatchUp)
