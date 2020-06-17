import {withRouter} from 'react-router-dom'

const URL = 'http://localhost:3000/'

function updatedTournament(tournament){
  return {type: "UPDATED_TOURNAMENT", payload: tournament}
}

function setCurrentUser(user_data){
  return {type: "NEW_CURRENT_USER", payload: user_data}
}

function logout(){
  localStorage.clear()
  return {type: "CLEAR_USER"}
}

function findUser(token){
  return (dispatch) => {
  fetch("http://localhost:3000/relogin", {
        headers: {
          "Authenticate": token
        }
      })
      .then(res => res.json())
      .then(data => {
        dispatch(setCurrentUser(data))
      })
  }

}

function updateTeamName(teamId, newTeamName, tournamentId){
  return (dispatch) => {
    fetch(URL+`/teams/${teamId}`, {
      method: 'PATCH',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({name: newTeamName, tournament: tournamentId})
    }).then(res => res.json())
    .then(tournament => {
      dispatch(updatedTournament(tournament))
    })
  }
}

function newSearchTerm(string){
  return {type: 'NEW_SEARCH_TERM', payload: string}
}

function postUser(obj){
  return (dispatch) => {
    fetch(URL+'users', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(obj)
  }).then(response => response.json())
  .then(data => {
    localStorage.setItem("token", data.token)
    dispatch(setCurrentUser(data.user_data))
    })
  }
}

function errorMessages(errors){
  return {type: "LOGIN_ERROR", payload: errors}
}

function login(userInfo){
  return (dispatch) => {
    fetch(URL +'/login', {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userInfo)
  }).then(response => response.json())
  .then( data => {
     if (data.error_message){
       dispatch(errorMessages(data.error_message))
     }else{
      localStorage.setItem("token", data.token)
      dispatch(setCurrentUser(data.user_data))
      dispatch(errorMessages([]))
     }
  })
  }
}

function removeTeamFromMatchUp(obj){
  return (dispatch) => {
    fetch(URL+`/match_ups/${obj.match_up_id}/remove`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(obj)
    }).then(res => res.json())
    .then(uT => {
      dispatch(updatedTournament(uT))
    })
  }

}

function matchUpScore(matchUpId, team_slot, score){
  let teamObj = {}
  if (team_slot === 'team_a'){
    teamObj['team_a_score'] = score
  }
  if (team_slot === 'team_b'){
    teamObj['team_b_score'] = score
  }
  return (dispatch) => {
    fetch(`http://localhost:3000//match_ups/${matchUpId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(teamObj)
    }).then(response => response.json())
    .then(uT => {
      dispatch(updatedTournament(uT))
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

function removeCurrentTournament(){
  return {type: "REMOVE_TOURNAMENT"}
}



function setTournament(tournament){
  return {type: "SET_TOURNAMENT", payload: tournament}
}

function fetchTournament(tournamentId){
  return (dispatch) => {
    fetch(URL+`/tournaments/${tournamentId}`)
    .then(res => res.json())
    .then(tournament => {
      dispatch(setTournament(tournament))
    })
  }
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

  function postTournament(tournamentDetails, userId){
    return (dispatch) => {
      fetch(URL+'tournaments', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({...tournamentDetails, 
        user_id: userId})
      })
      .then(res => res.json())
      .then(tournament => {
        dispatch(newTournament(tournament))
      })
    }
  }

  function deletedTournament(bracketID){
    return {type:'DELETE_TOURNAMENT', payload: bracketID}
  }

  function deleteTournament(bracketID){
    return (dispatch) => {
      fetch(URL+`tournaments/${bracketID}`, 
      {method: 'DELETE'
      })
        dispatch(deletedTournament(bracketID))
    }
  }

  function addFollowedTournament(follow){
    return {type:'ADD_TOURNAMENT_TO_FOLLOWS', payload: follow}
  }

  function removeFollowedTournament(follow){
    return {type:"REMOVE_TOURNAMENT_FROM_FOLLOWS", payload: follow}
  }

  function followTournament(tournamentId, userId){
    return(dispatch) => {
      fetch(URL+'followers', {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_follower_id: userId,
          tournament_followed_id: tournamentId
        })
      }).then(res => res.json())
      .then(follow => 
        dispatch(addFollowedTournament(follow))
        )
    }
  }

  function unfollowTournament(follow){
    return (dispatch) => {
      fetch(URL+`followers/${follow.id}`, {
        method: "DELETE"
      })
      dispatch(removeFollowedTournament(follow))
    }
  }

  
  
  export { fetchingTournaments, matchUpWinner, postTournament, 
    login, postUser, findUser, logout, newSearchTerm, deleteTournament, 
    updateTeamName, fetchTournament, removeCurrentTournament, removeTeamFromMatchUp,
    followTournament, unfollowTournament,  matchUpScore};
  