import React from 'react';
import { connect } from "react-redux";
import TournamentListItem from '../components/TournamentListItem'
import Row from 'react-bootstrap/Row'
import '../App.css';
import DeleteModal from '../components/Delete'

// Main tournaments container on home page. This interacts with the search term in the nav bar 
class TournamentsContainer extends React.Component{

    constructor(){
        super()
        this.state={
            showDeleteModal: false,
            tournamentDelete: null
        }
    }

    // open delete modal 
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
return (
    <div className='tournamentsContainer'>
      <DeleteModal tournamentDelete={this.state.tournamentDelete} show={this.state.showDeleteModal} handleClose={this.handleClose} />
    {this.props.searchTerm.length > 0? <Row><h4>Showing results for {this.props.searchTerm}</h4> </Row>: null}
    <Row>{this.props.tournaments.filter(t => t.public).map(t => <TournamentListItem handleDelete={this.handleShow} key={t.id} tournament={t}/>)} </Row>
    </div>
    )
}
}   

const mapStateToProps = (state) => {
   return  {searchTerm: state.searchTerm,
       tournaments: state.tournaments.filter(t => t.name.toLowerCase().includes(state.searchTerm.toLowerCase()) || t.user.username.toLowerCase().includes(state.searchTerm.toLowerCase()))}
}
export default connect(mapStateToProps)(TournamentsContainer)