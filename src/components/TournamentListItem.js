import React from 'react';
import {Link} from 'react-router-dom'
import {Card, Button, ButtonGroup} from 'react-bootstrap'
import { connect } from "react-redux";
import {deleteTournament, followTournament, unfollowTournament} from '../redux/actions'
import '../App.css'

const TournamentListItem = (props) => (
    <Card >
        <Card.Body>
            <Card.Title>{props.tournament.name}</Card.Title>
             <Card.Subtitle className="mb-2 text-muted">@{props.tournament.user.username}</Card.Subtitle>
            {props.tournament.champion_id? <Card.Subtitle>{props.tournament.champion.name}🏆</Card.Subtitle>: null}
            <Card.Text>{props.tournament.number_of_teams} teams</Card.Text>
             <ButtonGroup aria-label="Basic example">
                <Button className='btn-light' as={Link} to={`/tournaments/${props.tournament.id}`}>View Tournament</Button>
                {props.currentUser && props.tournament.user_id !== props.currentUser.id && !props.currentUser.followers.find(f => f.tournament_followed_id === props.tournament.id)? <Button className={'btn-dark'} onClick={() => props.followTournament(props.tournament.id, props.currentUser.id)} >Follow Tournament </Button>: null}
             {props.currentUser && props.tournament.user_id !== props.currentUser.id && props.currentUser.followers.find(f => f.tournament_followed_id === props.tournament.id)? <Button className={'btn-dark'} onClick={() => props.unfollowTournament(props.currentUser.followers.find(f => f.tournament_followed_id === props.tournament.id))} >Unfollow Tournament </Button>: null}
            {props.currentUser && props.currentUser.id === props.tournament.user_id? <Button  className={'btn-dark'}onClick={() => props.handleDelete(props.tournament.id)}>Delete</Button>: null}
            </ButtonGroup>
        </Card.Body>
    </Card>
)

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}

const mapDispatchToProps = (dispatch) => {
    return {delete: (tournamentID) => {dispatch(deleteTournament(tournamentID))},
            followTournament: (tournamentId, userId) => {dispatch(followTournament(tournamentId, userId))},
            unfollowTournament: (follow) => {dispatch(unfollowTournament(follow))}}
}


 
export default connect(mapStateToProps, mapDispatchToProps)(TournamentListItem)