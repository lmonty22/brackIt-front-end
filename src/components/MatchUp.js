import React from 'react';
import {Button, Row, Form, Popover, OverlayTrigger, Badge, Col} from 'react-bootstrap'
import {matchUpWinner, updateTeamName, removeTeamFromMatchUp, matchUpScore} from '../redux/actions'
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

    componentDidUpdate(prevProps){
        if (this.props.currentTournament && prevProps.matchUp && prevProps.matchUp.team_a_id !== this.props.matchUp.team_a_id){
            if (this.props.matchUp.team_a){
                this.setState({
                    teamNameA: this.props.matchUp.team_a.name,
                })
            }else {
                this.setState({
                    teamNameA: ''
                })
            }
           }
        if (this.props.currentTournament && prevProps.matchUp && prevProps.matchUp.team_b_id !== this.props.matchUp.team_b_id){
            if (this.props.matchUp.team_b){
                this.setState({
                    teamNameB: this.props.matchUp.team_b.name
                })
            }else {
                this.setState({
                    teamNameB: ''
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
        let nextRound = this.props.round_number + 1
        let nextMatchUp = getNextMatchUp(this.props.matchUp.match_up_number)

        let lastRound = Math.log2(this.props.currentTournament.number_of_teams)

        if (this.props.currentUser && this.props.currentUser.id === this.props.tUser){
        if (this.props.matchUp.winner_id){
                // owner of tournament and winnder if determined
        return (<div className={`matchup R${this.props.round_number}-M${this.props.matchUp.match_up_number}`}> 
                <Row  >
                    <Button disabled type="button" className={`teamButton btn-dark`} style={this.props.matchUp.winner_id === this.props.matchUp.team_a_id? {fontWeight: 'bold'}: {textDecoration: 'line-through'}} > {this.props.matchUp.team_a_score? <Badge>{this.props.matchUp.team_a_score}</Badge> : null }{this.props.matchUp.team_a.name}</Button>  
                </Row>
                <Row >
                    <Button disabled type="button" className={`teamButton btn-light`} style={this.props.matchUp.winner_id === this.props.matchUp.team_b_id? {fontWeight: 'bold'}: {textDecoration: 'line-through'}} >{this.props.matchUp.team_b_score? <Badge>{this.props.matchUp.team_b_score}</Badge> : null }{this.props.matchUp.team_b.name}</Button>
                </Row>
                <SteppedLineTo borderColor={'grey'} from={`R${this.props.round_number}-M${this.props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={this.props.start}  fromAnchor={this.props.end}  orientation='h' />
                </div>)}
                // owner of tournament and only one team is in the matchUp
        else if (!this.props.matchUp.team_a_id || !this.props.matchUp.team_b_id){
        return (<div className={`matchup R${this.props.round_number}-M${this.props.matchUp.match_up_number}`}>
                 <Row >
                    {this.props.matchUp.team_a?  
                        <OverlayTrigger  trigger="click" overlay={
                            <Popover id={`popover-positioned-${this.props.end}`}>
                            <Popover.Title as="h3">{this.props.matchUp.team_a.name}</Popover.Title>
                            <Popover.Content>
                              <Form.Control type="input" onChange={(e) => this.onChangeA(e, this.props.matchUp.team_a_id)} value={this.state.teamNameA} />
                              {this.props.round_number > 1? <Button onClick={() => this.props.removeTeamFromMatchUp({team_slot: 'team_a', team_id: this.props.matchUp.team_a_id, match_up_id: this.props.matchUp.id, tournament_id: this.props.currentTournament.id})} 
                              className={'btn-info'}  >Remove {this.props.matchUp.team_a.name} from matchup</Button>: null } 
                              <br></br>
                              You may not advance a team that does not have an opponent in their current matchup.
                            </Popover.Content>
                          </Popover>}
                           key={'right'} placement={this.props.end} rootCloseEvent={'mousedown'} >
                    <Button type="button" className={`btn btn-dark teamButton `}> {this.props.matchUp.team_a.name}</Button>
                    </OverlayTrigger>
                     :  <Button type="button" className={`btn btn-dark teamButton`} disabled>&nbsp; </Button>
                        }
                </Row>
                <Row  >
                    {this.props.matchUp.team_b? 
                        <OverlayTrigger  trigger="click" overlay={
                            <Popover id={`popover-positioned-${this.props.end}`}>
                            <Popover.Title as="h3">{this.props.matchUp.team_b.name}</Popover.Title>
                            <Popover.Content>
                              <Form.Control type="input" onChange={(e) => this.onChangeB(e, this.props.matchUp.team_b_id)} value={this.state.teamNameB} /> 
                              {this.props.round_number > 1? <Button onClick={() => this.props.removeTeamFromMatchUp({team_slot: 'team_b', team_id: this.props.matchUp.team_b_id, match_up_id: this.props.matchUp.id, tournament_id: this.props.currentTournament.id})} 
                               className={'btn-info'}  >Remove {this.props.matchUp.team_b.name} from matchup</Button>: null}
                              <br></br>
                              You may not advance a team that does not have an opponent in their current matchup.
                            </Popover.Content>
                          </Popover>}
                           key={'right'} placement={this.props.end} rootCloseEvent={'mousedown'} >
                    <Button type="button" className={`btn btn-light teamButton `}> {this.props.matchUp.team_b.name}</Button>
                    </OverlayTrigger>
                    : 
                        <Button type="button" className={`btn btn-light teamButton` } disabled> &nbsp;  </Button>
                    }
                </Row>
                <SteppedLineTo  borderColor={'grey'} from={`R${this.props.round_number}-M${this.props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={this.props.start}  fromAnchor={this.props.end}  orientation='h' />
         </div>)
        }
        else{
            // If owner of the tournament and both teams are included in the match Up..but no winner allow entry of scores and advancing. 
        return (<div className={`matchup R${this.props.round_number}-M${this.props.matchUp.match_up_number}`}>
                 <Row  > <OverlayTrigger  trigger="click" overlay={
                        <Popover id={`popover-positioned-${this.props.end}`}>
                        <Popover.Title as="h3">{this.props.matchUp.team_a.name} {this.props.matchUp.team_a_score} vs. {this.props.matchUp.team_b.name} {this.props.matchUp.team_b_score}</Popover.Title>
                        <Popover.Content>
                            <Row>
                                    <p>Edit Team Names</p>
                            </Row>
                            <Row>
                                <Col>
                                      <Form.Control type="input" onChange={(e) => this.onChangeA(e, this.props.matchUp.team_a_id)} value={this.state.teamNameA} /> 
                                      {this.props.round_number > 1? <Button style={{fontSize: '10px'}} onClick={() => this.props.removeTeamFromMatchUp({team_slot: 'team_a', team_id: this.props.matchUp.team_a_id, match_up_id: this.props.matchUp.id, tournament_id: this.props.currentTournament.id})} 
                            className={'btn-info'}  >Remove {this.props.matchUp.team_a.name} from matchup</Button>: null }
                                </Col>
                                <Col>
                                      <Form.Control type="input"  onChange={(e) => this.onChangeB(e, this.props.matchUp.team_b_id)} value={this.state.teamNameB} />
                                      {this.props.round_number > 1? <Button style={{fontSize: '10px'}} onClick={() => this.props.removeTeamFromMatchUp({team_slot: 'team_b', team_id: this.props.matchUp.team_b_id, match_up_id: this.props.matchUp.id, tournament_id: this.props.currentTournament.id})} 
                            className={'btn-info'}  >Remove {this.props.matchUp.team_b.name} from matchup</Button>: null }
                                </Col>
                            </Row>
                            <Row> <p>Scores</p></Row>
                            <Row>
                                <Col>
                                    <div className='scoreDiv'>
                                     <p>{this.props.matchUp.team_a.name}</p>
                                     <Form.Control onChange={(e) => this.teamAScoreChange(e, this.props.matchUp.id) } value={this.state.teamAScore} type="input"  />
                                    <Button  style={{fontSize: '10px'}} className={'btn-dark'} onClick={() => this.props.matchUpWinner(this.props.matchUp, this.props.matchUp.team_a.id)} >{this.props.round_number < lastRound? `Advance ${this.props.matchUp.team_a.name} to Next Round`: `Crown ${this.props.matchUp.team_a.name} the Champion!` }</Button>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                     <p>{this.props.matchUp.team_b.name}</p>
                                     <Form.Control onChange={(e) => this.teamBScoreChange(e, this.props.matchUp.id) } value={this.state.teamBScore} type="input"  />
                                     <Button style={{fontSize: '10px'}} className={'btn-dark'} onClick={() => this.props.matchUpWinner(this.props.matchUp, this.props.matchUp.team_b.id)} >{this.props.round_number < lastRound? `Advance ${this.props.matchUp.team_b.name} to Next Round`: `Crown ${this.props.matchUp.team_b.name} the Champion!` }</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Popover.Content>
                        </Popover>
                 } key={'right'} placement={this.props.end} rootCloseEvent={'mousedown'} >
                    <Button type="button" className={`btn btn-dark teamButton `}> {this.props.matchUp.team_a_score? <Badge>{this.props.matchUp.team_a_score}</Badge>: null}{this.props.matchUp.team_a.name} </Button> 
                   </OverlayTrigger>
                </Row>

                <Row  > <OverlayTrigger  trigger="click" overlay={
                        <Popover id={`popover-positioned-${this.props.end}`}>
                        <Popover.Title as="h3">{this.props.matchUp.team_a.name} {this.props.matchUp.team_a_score} vs. {this.props.matchUp.team_b.name} {this.props.matchUp.team_b_score}</Popover.Title>
                        <Popover.Content>
                            <Row>
                                    <p>Edit Team Names</p>
                            </Row>
                            <Row>
                                <Col>
                                      <Form.Control type="input" onChange={(e) => this.onChangeA(e, this.props.matchUp.team_a_id)} value={this.state.teamNameA} /> 
                                      {this.props.round_number > 1? <Button style={{fontSize: '10px'}} onClick={() => this.props.removeTeamFromMatchUp({team_slot: 'team_a', team_id: this.props.matchUp.team_a_id, match_up_id: this.props.matchUp.id, tournament_id: this.props.currentTournament.id})} 
                            className={'btn-info'}  >Remove {this.props.matchUp.team_a.name} from matchup</Button>: null }
                                </Col>
                                <Col>
                                      <Form.Control type="input"  onChange={(e) => this.onChangeB(e, this.props.matchUp.team_b_id)} value={this.state.teamNameB} />
                                      {this.props.round_number > 1? <Button style={{fontSize: '10px'}} onClick={() => this.props.removeTeamFromMatchUp({team_slot: 'team_b', team_id: this.props.matchUp.team_b_id, match_up_id: this.props.matchUp.id, tournament_id: this.props.currentTournament.id})} 
                            className={'btn-info'}  >Remove {this.props.matchUp.team_b.name} from matchup</Button>: null }
                                </Col>
                            </Row>
                            <Row> <p>Scores</p></Row>
                            <Row>
                                <Col>
                                    <div className='scoreDiv'>
                                     <p>{this.props.matchUp.team_a.name}</p>
                                     <Form.Control onChange={(e) => this.teamAScoreChange(e, this.props.matchUp.id) } value={this.state.teamAScore} type="input"  />
                                    <Button  style={{fontSize: '10px'}} className={'btn-dark'} onClick={() => this.props.matchUpWinner(this.props.matchUp, this.props.matchUp.team_a.id)} >{this.props.round_number < lastRound? `Advance ${this.props.matchUp.team_a.name} to Next Round`: `Crown ${this.props.matchUp.team_a.name} the Champion!` }</Button>
                                    </div>
                                </Col>
                                <Col>
                                    <div>
                                     <p>{this.props.matchUp.team_b.name}</p>
                                     <Form.Control onChange={(e) => this.teamBScoreChange(e, this.props.matchUp.id) } value={this.state.teamBScore} type="input"  />
                                     <Button style={{fontSize: '10px'}} className={'btn-dark'} onClick={() => this.props.matchUpWinner(this.props.matchUp, this.props.matchUp.team_b.id)} >{this.props.round_number < lastRound? `Advance ${this.props.matchUp.team_b.name} to Next Round`: `Crown ${this.props.matchUp.team_b.name} the Champion!` }</Button>
                                    </div>
                                </Col>
                            </Row>
                        </Popover.Content>
                        </Popover>
                 } key={'right'} placement={this.props.end} rootCloseEvent={'mousedown'} >
                    <Button type="button" className={`btn btn-light teamButton `}> {this.props.matchUp.team_b_score? <Badge>{this.props.matchUp.team_b_score}</Badge>: null}{this.props.matchUp.team_b.name} </Button> 
                   </OverlayTrigger>
                </Row>


                <SteppedLineTo borderColor={'grey'} from={`R${this.props.round_number}-M${this.props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={this.props.start}  fromAnchor={this.props.end}  orientation='h' />
        </div>)}
                    // if not owner of the tournament 
        }else {
                     // not owner of tournament and winner is determined. 
            if (this.props.matchUp.winner_id){
                return (<div className={`matchup R${this.props.round_number}-M${this.props.matchUp.match_up_number}`}> 
                        <Row  > 
            <Badge  className={`teamButton badge-dark`} style={this.props.matchUp.winner_id === this.props.matchUp.team_a_id? {fontWeight: 'bold'}: {textDecoration: 'line-through'}} > {this.props.matchUp.team_a_score? <Badge>{this.props.matchUp.team_a_score}</Badge> : null }{this.props.matchUp.team_a.name}</Badge>  
                        </Row>
                        <Row >
            <Badge  className={`teamButton badge-light`} style={this.props.matchUp.winner_id === this.props.matchUp.team_b_id? {fontWeight: 'bold'}: {textDecoration: 'line-through'}}>{this.props.matchUp.team_b_score? <Badge> {this.props.matchUp.team_b_score}</Badge>: null}{this.props.matchUp.team_b.name}</Badge>
                        </Row>
                        <SteppedLineTo borderColor={'grey'} from={`R${this.props.round_number}-M${this.props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={this.props.start}  fromAnchor={this.props.end}  orientation='h' />
                        </div>)}

                        // only one team is in the match up. 
                else if (!this.props.matchUp.team_a_id || !this.props.matchUp.team_b_id){
                return (<div className={`matchup R${this.props.round_number}-M${this.props.matchUp.match_up_number}`}>
                         <Row >
                            {this.props.matchUp.team_a?  <Badge  className={`badge-dark teamButton `}> {this.props.matchUp.team_a.name}</Badge> : 
                                <Badge className={'badge-dark teamButton'}>&nbsp; </Badge>
                            }
                        </Row>
                        <Row  >
                            {this.props.matchUp.team_b?  <Badge className={`badge-light teamButton `}  > {this.props.matchUp.team_b.name}</Badge> : 
                                <Badge className={`badge-light teamButton`}> &nbsp; </Badge>
                            }
                        </Row>
                        <SteppedLineTo  borderColor={'grey'} from={`R${this.props.round_number}-M${this.props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={this.props.start}  fromAnchor={this.props.end}  orientation='h' />
                 </div>)
                }
                else{
                        // both teams are in the match up but no winnter. 
                return (<div className={`matchup R${this.props.round_number}-M${this.props.matchUp.match_up_number}`}>
                         <Row  >
                            <Badge  className={`badge-dark teamButton `} >  {this.props.matchUp.team_a_score? <Badge>{this.props.matchUp.team_a_score}</Badge> : null }{this.props.matchUp.team_a.name}</Badge> 
                        </Row>
                        <Row  >
                            <Badge  className={`badge-light teamButton `} > {this.props.matchUp.team_b_score? <Badge>{this.props.matchUp.team_b_score}</Badge> : null } {this.props.matchUp.team_b.name}</Badge>       
                        </Row>
                        <SteppedLineTo borderColor={'grey'} from={`R${this.props.round_number}-M${this.props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={this.props.start}  fromAnchor={this.props.end}  orientation='h' />
                </div>)}


     } }
    }


// need to build in functionality so only the user who created the tournament can advance players
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
