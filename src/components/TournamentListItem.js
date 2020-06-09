import React from 'react';
import {Link} from 'react-router-dom'
import {Card} from 'react-bootstrap'


const TournamentListItem = (props) => (
    <Card style={{ width: '18rem' }}>
        <Card.Body>
            <Card.Title>{props.tournament.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">@{props.tournament.user.username}</Card.Subtitle>
            <Card.Text>{props.tournament.number_of_teams} team tourney</Card.Text>
            <Card.Link as={Link} to={`/tournaments/${props.tournament.id}`}>View Tournament</Card.Link>
        </Card.Body>
    </Card>
)


export default TournamentListItem