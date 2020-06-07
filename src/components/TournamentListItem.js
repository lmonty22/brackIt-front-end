import React from 'react';
import {Link} from 'react-router-dom'


const TournamentListItem = (props) => (
    <li><Link to={`/tournaments/${props.tournament.id}`}>{props.tournament.name}</Link></li>
)


export default TournamentListItem