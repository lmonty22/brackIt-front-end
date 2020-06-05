import { combineReducers } from "redux";

const tournamentsReducer = (state = [], action)=> {
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
        console.log(action)
        let newStateArray = [...state, action.payload]
        console.log(newStateArray)
        return newStateArray
    default: 
        return state
    }
   
}


const rootReducer = combineReducers({
    tournaments: tournamentsReducer
  });
  
  export default rootReducer;