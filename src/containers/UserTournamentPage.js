import React from 'react';
import { connect } from "react-redux";
import TournamentListItem from '../components/TournamentListItem'
import Row from 'react-bootstrap/Row';


const UsersTournamentPage = (props) => {
    return (<div><h4>Welcome {props.currentUser.username}</h4>
            {props.userTournaments.length > 0? <Row>{props.userTournaments.map(t => <TournamentListItem key={t.id} tournament={t}/>)}</Row> : <div>You have no tourneys</div>}
    </div>)
    }

const mapStateToProps = (state) => {
   return  {currentUser: state.currentUser, userTournaments: state.tournaments.filter( t => t.user_id === state.currentUser.id) }
}

export default connect(mapStateToProps)(UsersTournamentPage)