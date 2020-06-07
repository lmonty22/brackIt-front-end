import React from 'react';
import { connect } from "react-redux";
import TournamentListItem from '../components/TournamentListItem'

const TournamentsContainer = (props) => {
    return (<ul>{props.tournaments.map(t => <TournamentListItem key={t.id} tournament={t}/>)} </ul>)
}

const mapStateToProps = (state) => {
   return  {tournaments: state.tournaments}
}
export default connect(mapStateToProps)(TournamentsContainer)