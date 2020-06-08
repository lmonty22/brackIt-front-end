import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import TournamentPage from './containers/TournamentPage'
import { Route, Switch, withRouter} from "react-router-dom"
import {connect} from 'react-redux'
import {fetchingTournaments} from './redux/actions'
import HomePage from './containers/HomePage'
import CreateTournamentForm from './components/CreateTournamentForm'
import Spinner from 'react-bootstrap/Spinner'
import Login from './components/Login'



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
          <Route exact path="/createtournament" component={CreateTournamentForm} />
          <Route exact path="/login" component={Login}/>
          <Route render={()=> <div>404 No Route Found</div> } />
      </Switch>
      }
    </div>
  );
}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingTournaments: () => {dispatch( fetchingTournaments() )}
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
