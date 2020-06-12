import React from 'react';
import {Link} from 'react-router-dom'
import {Card, Button} from 'react-bootstrap'
import { connect } from "react-redux";
import {deleteTournament} from '../redux/actions'



const TournamentListItem = (props) => (
    <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{props.tournament.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">@{props.tournament.user.username}</Card.Subtitle>
            <Card.Text>{props.tournament.number_of_teams} team tourney</Card.Text>
            <Card.Link as={Link} to={`/tournaments/${props.tournament.id}`}>View Tournament</Card.Link>
            {props.currentUser && props.currentUser.id === props.tournament.user_id? <Card.Link as={Link} onClick={() => props.delete(props.tournament.id)}>Delete</Card.Link>: null}
        </Card.Body>
    </Card>
)

const mapStateToProps = (state) => {
    return {currentUser: state.currentUser}
}

const mapDispatchToProps = (dispatch) => {
    return {delete: (tournamentID) => {dispatch(deleteTournament(tournamentID))}}
}


 
export default connect(mapStateToProps, mapDispatchToProps)(TournamentListItem)