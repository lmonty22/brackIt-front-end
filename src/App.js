import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import TournamentPage from './containers/TournamentPage'
import { Route, Switch, withRouter, Redirect} from "react-router-dom"
import {connect} from 'react-redux'
import {fetchingTournaments} from './redux/actions'
import HomePage from './containers/HomePage'
import CreateTournamentForm from './components/CreateTournamentForm'
import Spinner from 'react-bootstrap/Spinner'
import Login from './components/Login'
import UserTournamentPage from './containers/UserTournamentPage';
import CreateUserForm from './components/CreateUserform'
import {findUser} from './redux/actions'


class App extends React.Component{

  constructor(){
    super()
    this.state = { 
      loading: true
    }
  }
   
  componentDidMount = ()=> {
    if(localStorage.getItem("token")){
      this.props.findUser(localStorage.getItem("token"))
    }
    this.props.fetchingTournaments()
  
  }

  componentDidUpdate = () => {
    if (this.props.tournaments && this.state.loading){
      this.setState({
        loading: false
      })
    }
  }

  render() {
  return (
    <div className="App">
      <NavBar />
       {this.state.loading? <div className='spinnerDiv'><Spinner animation="border" className='spinner-info' /></div>:<Switch>
          <Route exact path="/tournaments/:id" render={(props) => {
            return <TournamentPage {...props} />}} />
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/createtournament" render={() => this.props.currentUser? <CreateTournamentForm/>: <Redirect to={'/login'} />} />
          <Route exact path="/login" render={() => !this.props.currentUser? <Login/> : <Redirect to="/mytournaments"/>}/>
          <Route exact path="/mytournaments" render={() => this.props.currentUser? <UserTournamentPage /> : <Redirect to="/login"/>}/>
          <Route exact path='/signup' render={() => !this.props.currentUser? <CreateUserForm /> : <Redirect to="/mytournaments"/>}/>
          <Route render={()=> <div>404 No Route Found</div> } />
      </Switch> 
      }
    </div>
  );
}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    tournaments: state.tournaments,
    currentTournament: state.currentTournament
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingTournaments: () => {dispatch( fetchingTournaments())},
    findUser: (token) => {dispatch(findUser(token))}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
