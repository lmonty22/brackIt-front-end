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


class App extends React.Component{

  constructor(){
    super()
    this.state = { 
      loading: true
    }
  }
   
  componentDidMount = ()=> {
    this.props.fetchingTournaments()
    this.setState({
      loading: false
    })
  }

  render() {
  return (
    <div className="App">
      <NavBar />
      {this.state.loading?   <Spinner animation="border" variant="info" />:<Switch>
          <Route exact path="/tournaments/:id" render={(props) => {return <TournamentPage {...props} />}} />
          <Route exact path="/" component={HomePage}/>
          <Route exact path="/createtournament" render={() => this.props.currentUser? <CreateTournamentForm/>: <Redirect to="/login"/>} />
          <Route exact path="/login" render={() => !this.props.currentUser? <Login/> : <Redirect to="/mytournaments"/>}/>
          <Route exact path="/mytournaments" render={() => this.props.currentUser? <UserTournamentPage /> : <Redirect to="/login"/>}/>
          <Route render={()=> <div>404 No Route Found</div> } />
      </Switch>
      }
    </div>
  );
}
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingTournaments: () => {dispatch( fetchingTournaments() )}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
