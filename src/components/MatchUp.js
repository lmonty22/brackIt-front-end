import React from 'react';
import {Button, Row, Form, Popover, OverlayTrigger, Badge} from 'react-bootstrap'
import {matchUpWinner, updateTeamName} from '../redux/actions'
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
            teamNameB: ''
        }
    }

    componentDidMount(){
        if (this.props.matchUp.team_a){
            this.setState({
                teamNameA: this.props.matchUp.team_a.name
            })
        }
        if( this.props.matchUp.team_b){
            this.setState({
                teamNameB: this.props.matchUp.team_b.name
            })
        }
    }

    // Team name is not in state after the advance before a refresh. 
    // componentDidUpdate(prevProps){
    //     if (prevProps.matchUp.team_a != this.props.team_a){
    //         this.setState({
    //             teamNameA: this.props.matchUp.team_a.name
    //         })
    //     }
    //     if( prevProps.matchUp.team_b != this.props.matchUp.team_b){
    //         this.setState({
    //             teamNameB: this.props.matchUp.team_b.name
    //         })
    //     }
    // }

    onChangeA= (e) => {
        this.setState({
            teamNameA: e.currentTarget.value}
        )
    }
    onChangeB = (e) =>{
        this.setState({
            teamNameB: e.currentTarget.value}
        )
    }

    render(){
        let nextRound = this.props.round_number + 1
        let nextMatchUp = getNextMatchUp(this.props.matchUp.match_up_number)


        if (this.props.currentUser && this.props.currentUser.id === this.props.tUser){
        if (this.props.matchUp.winner_id){
        return (<div className={`matchup R${this.props.round_number}-M${this.props.matchUp.match_up_number}`}> 
                <Row  >
                    <Button type="button" className={`teamButton `} style={this.props.matchUp.winner_id === this.props.matchUp.team_a_id? {fontWeight: 'bold'}: {textDecoration: 'line-through'}} variant={"dark"} > {this.props.matchUp.team_a.name}</Button>  
                </Row>
                <Row >
                    <Button type="button" className={`teamButton `} style={this.props.matchUp.winner_id === this.props.matchUp.team_b_id? {fontWeight: 'bold'}: {textDecoration: 'line-through'}}  variant={"light"} >{this.props.matchUp.team_b.name}</Button>
                </Row>
                <SteppedLineTo borderColor={'grey'} from={`R${this.props.round_number}-M${this.props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={this.props.start}  fromAnchor={this.props.end}  orientation='h' />
                </div>)}
        else if (!this.props.matchUp.team_a_id || !this.props.matchUp.team_b_id){
        return (<div className={`matchup R${this.props.round_number}-M${this.props.matchUp.match_up_number}`}>
                 <Row >
                    {this.props.matchUp.team_a?  
                        <OverlayTrigger  trigger="click" overlay={
                            <Popover id={`popover-positioned-${this.props.end}`}>
                            <Popover.Title as="h3">{this.props.matchUp.team_a.name}</Popover.Title>
                            <Popover.Content>
                              <Form.Control type="input" onChange={this.onChangeA} value={this.state.teamNameA} />
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
                              <Form.Control type="input" placeholder="teamName" onChange={this.onChangeB} value={this.state.teamNameB} />
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
        return (<div className={`matchup R${this.props.round_number}-M${this.props.matchUp.match_up_number}`}>
                 <Row  > <OverlayTrigger  trigger="click" overlay={
                        <Popover id={`popover-positioned-${this.props.end}`}>
                        <Popover.Title as="h3">{this.props.matchUp.team_a.name}</Popover.Title>
                        <Popover.Content>
                          <Form.Control type="input" placeholder="teamName" onChange={this.onChangeA} value={this.state.teamNameA} />
                          <br></br>
                          <Button className={'btn-dark'} onClick={() => this.props.matchUpWinner(this.props.matchUp, this.props.matchUp.team_a.id)} >Advance Team to Next Round</Button>
                        </Popover.Content>
                      </Popover>
                 } key={'right'} placement={this.props.end} rootCloseEvent={'mousedown'} >
                    <Button type="button" className={`btn btn-dark teamButton `}> {this.props.matchUp.team_a.name}</Button> 
                   </OverlayTrigger>
                </Row>
                <Row  >
                <OverlayTrigger  trigger="click" overlay={
                        <Popover id={`popover-positioned-${this.props.end}`}>
                        <Popover.Title as="h3">{this.props.matchUp.team_b.name}</Popover.Title>
                        <Popover.Content>
                          <Form.Control type="input" placeholder="teamName" onChange={this.onChangeB} value={this.state.teamNameB} />
                          <br></br>
                          <Button className={'btn-dark'}onClick={() => this.props.matchUpWinner(this.props.matchUp, this.props.matchUp.team_b.id)} >Advance Team to Next Round</Button>
                        </Popover.Content>
                      </Popover>
                 } key={'right'} placement={this.props.end} rootCloseEvent={'mousedown'} >
                    <Button type="button" className={`btn btn-light teamButton `}> {this.props.matchUp.team_b.name}</Button> 
                   </OverlayTrigger>
                </Row>
                <SteppedLineTo borderColor={'grey'} from={`R${this.props.round_number}-M${this.props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={this.props.start}  fromAnchor={this.props.end}  orientation='h' />
        </div>)}
        }else {
            if (this.props.matchUp.winner_id){
                return (<div className={`matchup R${this.props.round_number}-M${this.props.matchUp.match_up_number}`}> 
                        <Row  > 
                            <Badge  className={`teamButton badge-dark`} style={this.props.matchUp.winner_id === this.props.matchUp.team_a_id? {fontWeight: 'bold'}: {textDecoration: 'line-through'}} > {this.props.matchUp.team_a.name}</Badge>  
                        </Row>
                        <Row >
                            <Badge  className={`teamButton badge-light`} style={this.props.matchUp.winner_id === this.props.matchUp.team_b_id? {fontWeight: 'bold'}: {textDecoration: 'line-through'}}  >{this.props.matchUp.team_b.name}</Badge>
                        </Row>
                        <SteppedLineTo borderColor={'grey'} from={`R${this.props.round_number}-M${this.props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={this.props.start}  fromAnchor={this.props.end}  orientation='h' />
                        </div>)}
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
                return (<div className={`matchup R${this.props.round_number}-M${this.props.matchUp.match_up_number}`}>
                         <Row  >
                            <Badge  className={`badge-dark teamButton `} > {this.props.matchUp.team_a.name}</Badge> 
                        </Row>
                        <Row  >
                            <Badge  className={`badge-light teamButton `} > {this.props.matchUp.team_b.name}</Badge>       
                        </Row>
                        <SteppedLineTo borderColor={'grey'} from={`R${this.props.round_number}-M${this.props.matchUp.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={this.props.start}  fromAnchor={this.props.end}  orientation='h' />
                </div>)}


        }
    }
}

// need to build in functionality so only the user who created the tournament can advance players
const mapStateToProps = (state) => {
    return { currentUser: state.currentUser}
}
const mapDispatchToProps = (dispatch) => {
    return {matchUpWinner: (matchUp, winnerId) => {dispatch(matchUpWinner(matchUp, winnerId))},
    updateTeamName: (teamId, newTeamName, tournamentId) => {dispatch(updateTeamName(teamId, newTeamName, tournamentId))}}
}



export default connect(mapStateToProps, mapDispatchToProps)(MatchUp)
