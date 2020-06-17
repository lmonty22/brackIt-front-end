import React from 'react';
import { connect } from "react-redux";
import TournamentListItem from '../components/TournamentListItem'
import Row from 'react-bootstrap/Row';
import '../App.css';



const UsersTournamentPage = (props) => {
    return (<div className='usersTournamentsPage'><h1 style={{color: '#102542'}}>Welcome @{props.currentUser.username}</h1>
            {props.userTournaments.length > 0? <Row>{props.userTournaments.map(t => <TournamentListItem key={t.id} tournament={t}/>)}</Row> : <div>You have no tourneys</div>}
            {props.currentUser.followers.length > 0? <Row>{props.currentUser.followers.map(f=> <TournamentListItem key={f.tournament_followed.id} tournament={f.tournament_followed}/>)}</Row>: <div>You are not following any tournaments</div>}
    </div>)
    }


const mapStateToProps = (state) => {
   return  {currentUser: state.currentUser, userTournaments: state.tournaments.filter( t => t.user_id === state.currentUser.id) }
}

export default connect(mapStateToProps)(UsersTournamentPage)