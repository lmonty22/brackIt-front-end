import React from 'react';
import { connect } from "react-redux";
import TournamentListItem from '../components/TournamentListItem'
import Row from 'react-bootstrap/Row'

const TournamentsContainer = (props) => {
    return (<Row>{props.tournaments.map(t => <TournamentListItem key={t.id} tournament={t}/>)} </Row>)
}

const mapStateToProps = (state) => {
   return  {tournaments: state.tournaments}
}
export default connect(mapStateToProps)(TournamentsContainer)