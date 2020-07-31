
const URL = 'http://localhost:3000/'
// const URL = 'https://brackit-backend.herokuapp.com/'

// takes an updated tournament and replaces it as the current tournament in store
function updatedTournament(tournament){
  return {type: "UPDATED_TOURNAMENT", payload: tournament}
}

// sets current user in store
function setCurrentUser(user_data){
  return {type: "NEW_CURRENT_USER", payload: user_data}
}

// removes current user from store and clears localstorage
function logout(){
  localStorage.clear()
  return {type: "CLEAR_USER"}
}

// finds user based on local storage token
function findUser(token){
  return async(dispatch) => {
    try {
      const response = await fetch(URL + `relogin`, {
        headers: {'Authenticate': token}
      })
      const user = await response.json()
      dispatch(setCurrentUser(user))
    }
    catch (err) {
      console.log(err)
    }
  }
}


// sends patch request to update a team name, returns the whole tournament to replace current tournament

function updateTeamName(teamId, newTeamName, tournamentId){
  return async(dispatch) => {
    try {
      const response = await fetch(URL+`/teams/${teamId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name: newTeamName, tournament: tournamentId})
      })
      const t = await response.json()
      dispatch(updatedTournament(t))
    }
    catch (err){
      console.log(err)
    }
  }
}


// update searchTerm in store to display search results 
function newSearchTerm(string){
  return {type: 'NEW_SEARCH_TERM', payload: string}
}

// Post new user to the backend
function postUser(obj){
  return async(dispatch) => {
   try{
      const response = await fetch(URL + '/users', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(obj)
    })
    const data = await response.json()
    localStorage.setItem("token", data.token)
    dispatch(setCurrentUser(data.user_data))
  }
  catch(err){
    console.log(err)
  }
  }
}


// login error (password and username do not match )
function errorMessages(errors){
  return {type: "LOGIN_ERROR", payload: errors}
}

// login user, post new login to the backend, if error, call errorMessages, if successful, setCurrentUser

function login(userInfo){
  return async(dispatch) => {
    try{
      const resp = await fetch(URL + '/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userInfo)
      })
      const data = await resp.json()
      console.log(data)
      if (data.error_message){
        dispatch(errorMessages(data.error_message))
      }else {
        localStorage.setItem('token', data.token)
        dispatch(setCurrentUser(data.user_data))
        dispatch(errorMessages([]))
      }
    }
    catch(err) {
      console.log(err)
    }
  }
}

// remove a team from a matchup, sends back the whole tournament, update current tournament
function removeTeamFromMatchUp(obj){
  return async(dispatch) => {
    try {
      const res = await  fetch(URL+`/match_ups/${obj.match_up_id}/remove`, {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(obj)
      })
      const uT = await res.json()
      dispatch(updatedTournament(uT))
    }
    catch (err) {
      console.log(err)
    }
  }
}


// update a matchup score, sents back whole tournament, update current tournament 
function matchUpScore(matchUpId, team_slot, score){
  let teamObj = {}
  if (team_slot === 'team_a'){
    teamObj['team_a_score'] = score
  }
  if (team_slot === 'team_b'){
    teamObj['team_b_score'] = score
  }
  return (dispatch) => {
    fetch( URL + `/match_ups/${matchUpId}`, {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(teamObj)
    }).then(response => response.json())
    .then(uT => {
      dispatch(updatedTournament(uT))
    })
  }
}

// match up winner determined, sends back the whole tournament, update tournament 
function matchUpWinner(matchUp, winnerId){
  let obj = {
    winner_id: winnerId
  }
  return async(dispatch) => {
    try {
      const response =  await fetch(URL + `/match_ups/${matchUp.id}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
      })
      const uT = await response.json()
      dispatch(updatedTournament(uT))
      dispatch(updateTournaments(uT))
    }
    catch (err){
      console.log(err)
    }
  }
}


// remove current tournament, on unmount 
function removeCurrentTournament(){
  return {type: "REMOVE_TOURNAMENT"}
}


// set a current tournament on the tournament page 
function setTournament(tournament){
  return {type: "SET_TOURNAMENT", payload: tournament}
}

// fetch a tournament upon going to a tournament page
function fetchTournament(tournamentId){
  return async (dispatch) => {
    try { 
      const response = await fetch(URL+`/tournaments/${tournamentId}`)
      const t= await response.json()
      dispatch(setTournament(t))
    }
  catch (err){
    console.log(err)
  }
  }
}

// set tournaments array in store, only tournament level data, nothing nested expect user and champion
function fetchedTournaments(torunaments){
    return {type: "FETCHED_TOURNAMENTS", payload: torunaments}
  }

  // fetch a tournaments list (not all nested data, just tournament level) to display list items 
function fetchingTournaments(){
    return (dispatch) => {
      fetch(URL+'tournaments')
      .then(res => res.json())
      .then(tournaments => {
        dispatch(fetchedTournaments(tournaments))
      })
    }
  }

  // add new tournament to the tournaments list
  function newTournament(tournament){
    return {type: "NEW_TOURNAMENT", payload: tournament}
  }

  // Post new tournament to the backend, get back basic details to add to tournaments list 
  function postTournament(tournamentDetails, userId){
    let tournamentObj = {
      name: tournamentDetails.name,
      user_id: userId, 
      number_of_teams: tournamentDetails.numberOfTeams,
      team_names: [...tournamentDetails.teamNames],
      public: !tournamentDetails.private, 
      shuffle: tournamentDetails.shuffle
    }

    return (dispatch) => {
      fetch(URL+'/tournaments', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(tournamentObj)
      })
      .then(res => res.json())
      .then(tournament => {
        dispatch(newTournament(tournament))
        dispatch(setTournament(tournament))
      })
    }
  }

  //update tournament in tournament list 
  function updateTournaments(tournament){
    return {type: 'UPDATE_TOURNAMENTS', payload: tournament}
  }

  // update tournaemnt from private to public, remove winner or change tournament name
  function patchTournament(tournamentId, obj){
    return (dispatch) => {
    fetch(URL+`/tournaments/${tournamentId}`,{ 
    method: 'PATCH', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(obj)
    })
    .then(res => res.json())
    .then(tournament => {
      dispatch(updatedTournament(tournament))
      dispatch(updateTournaments(tournament))
    })
  }
}
  

  // remove tournament from tournaments array in store 
  function deletedTournament(bracketID){
    return {type:'DELETE_TOURNAMENT', payload: bracketID}
  }

  // delete a tournament 
  function deleteTournament(bracketID){
    return (dispatch) => {
      fetch(URL+`/tournaments/${bracketID}`, 
      {method: 'DELETE'
      })
        dispatch(deletedTournament(bracketID))
    }
  }

  // add a tournament followed to the user's tournament followeds
  function addFollowedTournament(follow){
    return {type:'ADD_TOURNAMENT_TO_FOLLOWS', payload: follow}
  }

  // remove a torunament from the user's tournament followeds 
  function removeFollowedTournament(follow){
    return {type:"REMOVE_TOURNAMENT_FROM_FOLLOWS", payload: follow}
  }

  // add a new follow to the backend, then add to followeds in store
  function followTournament(tournamentId, userId){
    return(dispatch) => {
      fetch(URL+'/followers', {
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

  // delete follow on backend, then remove followed in store
  function unfollowTournament(follow){
    return (dispatch) => {
      fetch(URL+`/followers/${follow.id}`, {
        method: "DELETE"
      })
      dispatch(removeFollowedTournament(follow))
    }
  }

  
  
  export { fetchingTournaments, matchUpWinner, postTournament, 
    login, postUser, findUser, logout, newSearchTerm, deleteTournament, 
    updateTeamName, fetchTournament, removeCurrentTournament, removeTeamFromMatchUp,
    followTournament, unfollowTournament,  matchUpScore, patchTournament};
  