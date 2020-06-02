import React from 'react'
import { connect } from "react-redux";

const TournamentPage = (props) => {
    return (!props.tournament? <div>No Tourney to see here.</div> : 
        <div>A bracket will go here....</div>
    )
}

// const mapStateToProps = (state, ownProps) => ({
//     tournament: state.tournaments.map(t => t.find(params.match)
       
// })

// export default connect(mapStateToProps)(TournamentPage)
export default TournamentPage