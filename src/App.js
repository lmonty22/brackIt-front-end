import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import TournamentPage from './containers/TournamentPage'
import { Route, Switch, withRouter, Redirect} from "react-router-dom"
import {connect} from 'react-redux'
import {fetchingTournaments, fetchTournament} from './redux/actions'
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
      loading: true,
      showLogin: false,
      showCreateUser: false,
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
    if (this.state.activeLogin){
      this.setState({ activeLogin: false})
      this.props.history.push('/mytournaments')
    }
  }

handleClose = () => {
    this.setState({
        showLogin: false
    })
}

handleShow = () => {
  this.setState({
    showLogin: true
  })
}

handleCreateClose = () => {
  this.setState({
  showCreateUser: false
  })
}

handleCreateShow = () => {
this.setState({
  showCreateUser: true
})
}

  render(props) {
  return (
    <div className="App">
      <NavBar handleShowLogin={this.handleShow} handleCreateShow={this.handleCreateShow}/>
      <Login handleCreateShow={this.handleCreateShow} show={this.state.showLogin} handleClose={this.handleClose} /> 
      <CreateUserForm handleLoginShow={this.handleShow} show={this.state.showCreateUser} handleClose={this.handleCreateClose}/> 
       {this.state.loading? <div className='spinnerDiv'><Spinner animation="border" className='spinner-info' /></div>:
       <Switch>
         <Route exact path="/">
             <HomePage handleLoginShow={this.handleShow} handleCreateShow={this.handleCreateShow} />
          </Route>

         {/* <Route exact path="/" render={() => <HomePage handleLoginShow={this.handleShow} handleCreateShow={this.handleCreateShow} />}/> */}
          <Route exact path="/tournaments/:id" render={(props) => {
            return <TournamentPage {...props} />}} />
          <Route exact path="/createtournament" render={() => this.props.currentUser? <CreateTournamentForm/>:  <Redirect to='/' /> } />
          <Route exact path="/mytournaments" render={() => this.props.currentUser? <UserTournamentPage /> : <Redirect to='/' /> } />
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
    fetchTournament: (id) =>{dispatch(fetchTournament(id))},
    findUser: (token) => {dispatch(findUser(token))}
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
