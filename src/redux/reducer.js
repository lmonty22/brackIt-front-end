import { combineReducers } from "redux";

const tournamentsReducer = (state = [], action)=> {
    switch(action.type){
    case "FETCHED_TOURNAMENTS":
        return action.payload
    default: 
        return state
    }
   
}


const rootReducer = combineReducers({
    tournaments: tournamentsReducer
  });
  
  export default rootReducer;