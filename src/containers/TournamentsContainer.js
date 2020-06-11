import React from 'react';
import { connect } from "react-redux";
import TournamentListItem from '../components/TournamentListItem'
import Row from 'react-bootstrap/Row'
import '../App.css';
import Button from 'react-bootstrap/button'

const TournamentsContainer = (props) => {
return (
    <div>
    {props.searchTerm.length > 0? <Row><h4>Showing results for {props.searchTerm}</h4> </Row>: null}
    <Row>{props.tournaments.map(t => <TournamentListItem key={t.id} tournament={t}/>)} </Row>
    </div>
    )
}

const mapStateToProps = (state) => {
   return  {searchTerm: state.searchTerm,
       tournaments: state.tournaments.filter(t => t.name.toLowerCase().includes(state.searchTerm.toLowerCase()) || t.user.username.toLowerCase().includes(state.searchTerm.toLowerCase()))}
}
export default connect(mapStateToProps)(TournamentsContainer)