import { browserHistory } from 'react-router'

const URL = 'http://localhost:3000/'


function setCurrentUser(user_data){
  return {type: "NEW_CURRENT_USER", payload: user_data}
}

function login(userInfo){
  return (dispatch) => {
    fetch(URL +'/login', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userInfo)
  }).then(response => response.json())
  .then( data => {
    dispatch(setCurrentUser(data.user_data))
  })
  }
}

function matchUpWinner(matchUp, winnerId){
  let obj = {
    winner_id: winnerId
  }
  return (dispatch) => {
    fetch(`http://localhost:3000//match_ups/${matchUp.id}`, {
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

  function newTournament(tournament){
    return {type: "NEW_TOURNAMENT", payload: tournament}
  }

  function postTournament(tournamentDetails){
    return (dispatch) => {
      fetch(URL+'tournaments', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(tournamentDetails)
      })
      .then(res => res.json())
      .then(tournament => {
        dispatch(newTournament(tournament))
      })
    }
  }
  
  export { fetchingTournaments, matchUpWinner, postTournament, login };
  