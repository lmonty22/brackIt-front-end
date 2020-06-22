import React from 'react';
import { connect } from "react-redux";
import TournamentListItem from '../components/TournamentListItem'
import Row from 'react-bootstrap/Row';
import '../App.css';
import DeleteModal from '../components/Delete'
import husky from '../assets/husky.jpg'


// Differnet than Tournaments Container because it is maping only the user's tournaments and tournaments followed
// could restructure these components and resue tournaments container to make code more dry. 
class UsersTournamentPage extends React.Component{

        constructor(){
            super()
            this.state={
                showDeleteModal: false,
                tournamentDelete: null
            }
        }

        // show delete modal 
        handleShow = (tournament) => {
            this.setState({
                showDeleteModal: true,
                tournamentDelete: tournament
            })
        }

        // close delete modal 
        handleClose = () => {
            this.setState({
                showDeleteModal: false,
                tournamentDelete: null
            })
        }
        
        
        render(){
        return(
            <div className='usersTournamentsPage'><h1 style={{color: '#102542'}}>Welcome @{this.props.currentUser.username}</h1>
            <DeleteModal tournamentDelete={this.state.tournamentDelete} show={this.state.showDeleteModal} handleClose={this.handleClose} />
            {this.props.userTournaments.length > 0? <div><h3>Your Tournaments</h3><Row>{this.props.userTournaments.map(t => <TournamentListItem handleDelete={this.handleShow} key={t.id} tournament={t}/>)}</Row></div> : null}
            {this.props.currentUser.followers.length > 0? <div><h3>Tournaments You Follow</h3><Row>{this.props.currentUser.followers.map(f=> <TournamentListItem key={f.tournament_followed.id} tournament={f.tournament_followed}/>)}</Row></div>: null}
            {this.props.userTournaments.length === 0 && this.props.currentUser.followers.length === 0 ? <div>
                <img
                alt="husky"
                src={husky}
                width="400"
                height="300"
                className="d-inline-block align-top"
            />
            <h4>You haven't created or followed any tournaments.</h4>
            </div>: null}
            </div>
            )
        }
}


const mapStateToProps = (state) => {
   return  {currentUser: state.currentUser, 
            userTournaments: state.tournaments.filter( t => t.user_id === state.currentUser.id),
            currentTournament: state.currentTournament }
}

export default connect(mapStateToProps)(UsersTournamentPage)