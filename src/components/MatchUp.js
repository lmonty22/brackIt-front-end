import React from 'react';
import {Button, Row, Form, Popover, OverlayTrigger, Badge, Col} from 'react-bootstrap'
import {matchUpWinner, updateTeamName, removeTeamFromMatchUp, matchUpScore} from '../redux/actions'
import {connect} from 'react-redux'
import { SteppedLineTo} from 'react-lineto';
import '../App.css'

const getNextMatchUp = (currentMatchUp) => {
    if (currentMatchUp % 2 === 0){
        return (currentMatchUp/2)
    }else{
        return (currentMatchUp + 1)/ 2
    }
}

class MatchUp extends React.Component{

    constructor(){
        super()
        this.state={
            teamNameA: '',
            teamNameB: '',
            teamAScore: '',
            teamBScore: ''
        }
    }

    // when a component mounts, we need to set state. 
    componentDidMount(){
        if (this.props.matchUp.team_a){
            this.setState({
                teamNameA: this.props.matchUp.team_a.name,
                teamAScore: this.props.matchUp.team_a_score

            })
        }
        if( this.props.matchUp.team_b){
            this.setState({
                teamNameB: this.props.matchUp.team_b.name,
                teamBScore: this.props.matchUp.team_b_score
            })
        }
     }

    // when a matchup updates... by adding a team_a or team_b.. we need to update state for the form field to work. 
    componentDidUpdate(prevProps){
        if (this.props.currentTournament && prevProps.matchUp && prevProps.matchUp.team_a_id !== this.props.matchUp.team_a_id){
            if (this.props.matchUp.team_a){
                this.setState({
                    teamNameA: this.props.matchUp.team_a.name,
                    teamAScore: this.props.matchUp.team_a_score,
                    teamBScore: this.props.matchUp.team_b_score,
                })
            }else {
                this.setState({
                    teamNameA: '',
                    teamAScore: '',
                    teamBScore: ''
                })
            }
           }
        if (this.props.currentTournament && prevProps.matchUp && prevProps.matchUp.team_b_id !== this.props.matchUp.team_b_id){
            if (this.props.matchUp.team_b){
                this.setState({
                    teamNameB: this.props.matchUp.team_b.name,
                    teamAScore: this.props.matchUp.team_a_score,
                    teamBScore: this.props.matchUp.team_a_score,
                })
            }else {
                this.setState({
                    teamNameB: '',
                    teamAScore: '',
                    teamBScore: ''
                })
            }

        }
    }

    onChangeA= (e, team_a_id) => {
        this.setState({
            teamNameA: e.currentTarget.value}
        )
        this.props.updateTeamName(team_a_id, e.currentTarget.value, this.props.currentTournament.id )
    }
    onChangeB = (e, team_b_id) =>{
        this.setState({
            teamNameB: e.currentTarget.value}
            )
            this.props.updateTeamName(team_b_id, e.currentTarget.value, this.props.currentTournament.id )
        }

    teamAScoreChange = (e, matchUpId) => {
        this.setState({
            teamAScore: e.currentTarget.value
        })
        this.props.matchUpScore(matchUpId, 'team_a', e.currentTarget.value)
    }

    teamBScoreChange = (e, matchUpId) => {
        this.setState({
            teamBScore: e.currentTarget.value
        })
        this.props.matchUpScore(matchUpId, 'team_b', e.currentTarget.value)
    }

    render(){
        const {team_a, team_a_id, id, team_b_id, team_b, team_a_score, team_b_score, match_up_number, winner_id} = this.props.matchUp
        const {round_number, currentTournament, currentUser, tUser, start, end} = this.props
        let nextRound = round_number + 1
        let nextMatchUp = getNextMatchUp(match_up_number)
        let lastRound = Math.log2(currentTournament.number_of_teams)

        if(winner_id){
            // if winner exists. 
            return (<div className={`matchup R${round_number}-M${match_up_number}`}> 
            <Row >
               {currentUser && currentUser.id === tUser?  
                <Button disabled className={`teamButton btn-dark`} style={winner_id === team_a_id? {fontWeight: 'bold'}: {textDecoration: 'line-through'}} > {team_a_score >= 0? <Badge>{team_a_score}</Badge> : null }{team_a.name}</Button>:
                <Badge  className={`teamBadge badge-dark align-middle`} style={winner_id === team_a_id? {fontWeight: 'bold'} : {textDecoration: 'line-through'}} > {team_a_score >= 0? <Badge>{team_a_score}</Badge> : null }{team_a.name}</Badge> } 
            {/* </Row>
            <Row > */}
            {currentUser && currentUser.id === tUser? 
                <Button disabled className={`teamButton btn-light`} style={winner_id === team_b_id? {fontWeight: 'bold'}: {textDecoration: 'line-through'}} >{team_b_score >= 0? <Badge >{team_b_score}</Badge> : null }{team_b.name}</Button>
            :  <Badge  className={`badge-light teamBadge align-middle`} style={winner_id === team_b_id? {fontWeight: 'bold'} : {textDecoration: 'line-through'}} > {team_b_score >= 0? <Badge>{team_b_score}</Badge> : null } {team_b.name}</Badge>       }
            </Row>
            <SteppedLineTo borderColor={'grey'} from={`R${round_number}-M${match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={start}  fromAnchor={end}  orientation='h' />
            </div>)
        }
        else if (!team_a_id || !team_b_id){
            return (<div className={`matchup R${round_number}-M${match_up_number}`}>
                {currentUser && currentUser.id === tUser?
                 <div>
                 <Row >
                    {team_a?  
                        <OverlayTrigger  trigger="click" overlay={
                            <Popover id={`popover-positioned-${end}`}>
                            <Popover.Title as="h3">{team_a.name}</Popover.Title>
                            <Popover.Content>
                              <Form.Control type="input" onChange={(e) => this.onChangeA(e, team_a_id)} value={this.state.teamNameA} />
                              {round_number > 1? <Button onClick={() => this.props.removeTeamFromMatchUp({team_slot: 'team_a', team_id: team_a_id, match_up_id: id, tournament_id: currentTournament.id})} 
                              className={'btn-info'}  >Remove {team_a.name} from matchup</Button>: null } 
                              <br></br>
                              You may not advance a team that does not have an opponent in their current matchup.
                            </Popover.Content>
                          </Popover>}
                           key={'right'} placement={end} rootCloseEvent={'mousedown'} >
                    <Button type="button" className={`btn btn-dark teamButton `}> {team_a.name}</Button>
                    </OverlayTrigger>
                     :  <Button type="button" className={`btn btn-dark teamButton`} disabled>&nbsp; </Button>
                        }
                </Row>
                <Row  >
                    {team_b? 
                        <OverlayTrigger  trigger="click" overlay={
                            <Popover id={`popover-positioned-${end}`}>
                            <Popover.Title as="h3">{team_b.name}</Popover.Title>
                            <Popover.Content>
                              <Form.Control type="input" onChange={(e) => this.onChangeB(e,team_b_id)} value={this.state.teamNameB} /> 
                              {round_number > 1? <Button onClick={() => this.props.removeTeamFromMatchUp({team_slot: 'team_b', team_id: team_b_id, match_up_id: id, tournament_id: currentTournament.id})} 
                               className={'btn-info'}  >Remove {team_b.name} from matchup</Button>: null}
                              <br></br>
                              You may not advance a team that does not have an opponent in their current matchup.
                            </Popover.Content>
                          </Popover>}
                           key={'right'} placement={end} rootCloseEvent={'mousedown'} >
                    <Button  className={`btn-light teamButton `}> {team_b.name}</Button>
                    </OverlayTrigger>
                    : 
                        <Button className={` btn-light teamButton` } disabled> &nbsp;  </Button>
                    }
                </Row>
                </div>
                : <div >
                <Row >
                   {team_a?  <Badge  className={`badge-dark teamBadge `}> {team_a.name}</Badge> : 
                       <Badge className={'badge-dark teamBadge'}>&nbsp; </Badge>
                   }
               </Row>
               <Row  >
                   {team_b?  <Badge className={`badge-light teamBadge `}  > {team_b.name}</Badge> : 
                       <Badge className={`badge-light teamBadge`}> &nbsp; </Badge>
                   }
               </Row> 
               </div>}
                <SteppedLineTo  borderColor={'grey'} from={`R${round_number}-M${match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={start}  fromAnchor={end}  orientation='h' />
         </div>)
        }
        else{
            return (
                <div className={`matchup R${round_number}-M${match_up_number}`}>
                     {currentUser && currentUser.id === tUser?
                     // I wanted to make the code from 193 - 278 half the size, just put the bottons in one div with one popover but it made the divs jump around on clicks. 
                        <div> 
                            <Row  > <OverlayTrigger  trigger="click" overlay={
                        <Popover id={`popover-positioned-${end}`}>
                        <Popover.Title as="h3">{team_a.name} vs. {team_b.name}</Popover.Title>
                        <Popover.Content>
                            <Row><p>Edit Team Names</p> </Row>
                            <Row>
                                <Col>
                                      <Form.Control type="input" onChange={(e) => this.onChangeA(e, team_a_id)} value={this.state.teamNameA} /> 
                                      {round_number > 1? <Button style={{fontSize: '12px'}} onClick={() => this.props.removeTeamFromMatchUp({team_slot: 'team_a', team_id: team_a_id, match_up_id: id, tournament_id: currentTournament.id})} 
                            className={'btn-info'}  >Remove {team_a.name} from matchup</Button>: null }
                                </Col>
                                <Col>
                                      <Form.Control type="input"  onChange={(e) => this.onChangeB(e, this.props.matchUp.team_b_id)} value={this.state.teamNameB} />
                                      {round_number > 1? <Button style={{fontSize: '12px'}} onClick={() => this.props.removeTeamFromMatchUp({team_slot: 'team_b', team_id: team_b_id, match_up_id: id, tournament_id: currentTournament.id})} 
                            className={'btn-info'}  >Remove {team_b.name} from matchup</Button>: null }
                                </Col>
                            </Row>
                            <Row> <p>Scores</p></Row>
                            <Row>
                                <Col>
                                    <div className='scoreDiv'>
                                     <p>{team_a.name}</p>
                                     <Form.Control onChange={(e) => this.teamAScoreChange(e, id) } value={this.state.teamAScore} type="number"  />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                     <p>{team_b.name}</p>
                                     <Form.Control onChange={(e) => this.teamBScoreChange(e, id) } value={this.state.teamBScore} type="number"  />
                                    </div>
                                </Col>
                            </Row>
                        
                            <Row> 
                                <Col>
                                     < Button  style={{fontSize: '12px'}} className={'btn-dark'} onClick={() => this.props.matchUpWinner(this.props.matchUp, team_a.id)} >{round_number < lastRound? `Advance ${team_a.name} to Next Round`: `Crown ${team_a.name} the Champion!` }</Button>
                                </Col>
                                <Col>
                                <Button style={{fontSize: '12px'}} className={'btn-light'} onClick={() => this.props.matchUpWinner(this.props.matchUp, team_b.id)} >{round_number < lastRound? `Advance ${team_b.name} to Next Round`: `Crown ${team_b.name} the Champion!` }</Button>
                                </Col>
                            </Row>
                        </Popover.Content>
                        </Popover>
                 } key={'right'} placement={end} rootCloseEvent={'mousedown'} >
                    <Button type="button" className={`btn btn-dark teamButton `}> {team_a_score >= 0?<Badge >{team_a_score}</Badge>: null}{team_a.name} </Button> 
                   </OverlayTrigger>
                </Row>

                <Row > <OverlayTrigger  trigger="click" overlay={
                        <Popover id={`popover-positioned-${end}`}>
                        <Popover.Title as="h3">{team_a.name}  vs. {team_b.name}</Popover.Title>
                        <Popover.Content>
                            <Row><p>Edit Team Names</p> </Row>
                            <Row>
                                <Col>
                                      <Form.Control type="input" onChange={(e) => this.onChangeA(e, team_a_id)} value={this.state.teamNameA} /> 
                                      {round_number > 1? <Button style={{fontSize: '12px'}} onClick={() => this.props.removeTeamFromMatchUp({team_slot: 'team_a', team_id: team_a_id, match_up_id: id, tournament_id: currentTournament.id})} 
                            className={'btn-info'}  >Remove {team_a.name} from matchup</Button>: null }
                                </Col>
                                <Col>
                                      <Form.Control type="input"  onChange={(e) => this.onChangeB(e, this.props.matchUp.team_b_id)} value={this.state.teamNameB} />
                                      {round_number > 1? <Button style={{fontSize: '12px'}} onClick={() => this.props.removeTeamFromMatchUp({team_slot: 'team_b', team_id: team_b_id, match_up_id: id, tournament_id: currentTournament.id})} 
                            className={'btn-info'}  >Remove {team_b.name} from matchup</Button>: null }
                                </Col>
                            </Row>
                            <Row> <p>Scores</p></Row>
                            <Row>
                                <Col>
                                    <div className='scoreDiv'>
                                     <p>{team_a.name}</p>
                                     <Form.Control onChange={(e) => this.teamAScoreChange(e, id) } value={this.state.teamAScore} type="number"  />
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                     <p>{team_b.name}</p>
                                     <Form.Control onChange={(e) => this.teamBScoreChange(e, id) } value={this.state.teamBScore} type="number"  />
                                    </div>
                                </Col>
                            </Row>
                        
                            <Row> 
                                <Col>
                                     < Button  style={{fontSize: '12px'}} className={'btn-dark'} onClick={() => this.props.matchUpWinner(this.props.matchUp, team_a.id)} >{round_number < lastRound? `Advance ${team_a.name} to Next Round`: `Crown ${team_a.name} the Champion!` }</Button>
                                </Col>
                                <Col>
                                <Button style={{fontSize: '12px'}} className={'btn-light'} onClick={() => this.props.matchUpWinner(this.props.matchUp, team_b.id)} >{round_number < lastRound? `Advance ${team_b.name} to Next Round`: `Crown ${team_b.name} the Champion!` }</Button>
                                </Col>
                            </Row>
                        </Popover.Content>
                        </Popover>
                 } key={'right'} placement={end} rootCloseEvent={'mousedown'} >
                    <Button type="button" className={`btn btn-light teamButton `}> {team_b_score >= 0? <Badge>{team_b_score}</Badge>: null}{team_b.name} </Button> 
                   </OverlayTrigger>
                </Row>
                    </div>
                        : <div> 
                    <Row >
                        <Badge  className={`badge-dark teamBadge `} >  {team_a_score >= 0? <Badge>{team_a_score}</Badge> : null }{team_a.name}</Badge> 
                    </Row>
                    <Row >
                        <Badge  className={`badge-light teamBadge`} > {team_b_score >= 0? <Badge>{team_b_score}</Badge> : null } {team_b.name}</Badge>       
                    </Row>
                    </div> }
                    <SteppedLineTo borderColor={'grey'} from={`R${round_number}-M${match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={start}  fromAnchor={end}  orientation='h' />
                </div>
            )
        }
    }
}


const mapStateToProps = (state) => {
    return { currentUser: state.currentUser,
            currentTournament: state.currentTournament}
}
const mapDispatchToProps = (dispatch) => {
    return {matchUpWinner: (matchUp, winnerId) => {dispatch(matchUpWinner(matchUp, winnerId))},
    updateTeamName: (teamId, newTeamName, tournamentId) => {dispatch(updateTeamName(teamId, newTeamName, tournamentId))},
    removeTeamFromMatchUp: (obj) => dispatch(removeTeamFromMatchUp(obj)),
    matchUpScore: (matchUp, team_slot, score) => dispatch(matchUpScore(matchUp, team_slot, score))}
}



export default connect(mapStateToProps, mapDispatchToProps)(MatchUp)
