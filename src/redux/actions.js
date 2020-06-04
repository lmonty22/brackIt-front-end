
const URL = 'http://localhost:3000/'

function matchUpWinner(matchUp, winnerId){
  let obj = {
    ...matchUp,
    winner_id: winnerId
  }
  return (dispatch) => {
    fetch(`http://localhost:3000//match_ups/${obj.id}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(obj)
    }).then(response => response.json())
    .then(uT => {
      dispatch(updatedTournament(uT))
    })
  }
}

function updatedTournament(tournament){
    return {type: "UPDATED_TOURNAMENT", payload: tournament}
}


function fetchedTournaments(torunaments){
    return {type: "FETCHED_TOURNAMENTS", payload: torunaments}
  }
  
function fetchingTournaments(){
    return (dispatch) => {
      fetch(URL+'tournaments')
      .then(res => res.json())
      .then(tournaments => {
        dispatch(fetchedTournaments(tournaments))
      })
    }
  }
  
  export { fetchingTournaments, matchUpWinner };
  