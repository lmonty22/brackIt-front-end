import { combineReducers } from "redux";

const tournamentsReducer = (state = null, action)=> {
    switch(action.type){
        case "FETCHED_TOURNAMENTS":
            return action.payload
        case "UPDATED_TOURNAMENT":
            let newArray = state.map(t => {
                if (t.id === action.payload.id){
                return action.payload
                }
                return t
            }
            )
            return newArray
        case "NEW_TOURNAMENT":
            let newStateArray = [...state, action.payload]
            return newStateArray
        case "DELETE_TOURNAMENT":
            let newTournamentsArray = [...state].filter(t => t.id !== action.payload)
            return newTournamentsArray
        default: 
            return state
        }
}

const currentUserReducer= (state = null, action) => {
    switch(action.type){
    case "NEW_CURRENT_USER":
        return action.payload
    case "CLEAR_USER":
        return null
    default: 
        return state
    }
}


const errorsReducer = (state= [], action) => {
    switch(action.type){
        case "LOGIN_ERROR":
            return action.payload
        default:
            return state
    }
}

const searchTermReducer = (state= '', action) => {
    switch(action.type){
    case "NEW_SEARCH_TERM":
        return action.payload
    default:
        return state
    }

}


const rootReducer = combineReducers({
    tournaments: tournamentsReducer,
    currentUser: currentUserReducer,
    errors: errorsReducer,
    searchTerm: searchTermReducer,
  });
  
  export default rootReducer;