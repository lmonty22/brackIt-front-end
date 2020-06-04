import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import TournamentPage from './containers/TournamentPage'
import { Route, Switch} from "react-router-dom"
import {connect} from 'react-redux'
import {fetchingTournaments} from './redux/actions'
import HomePage from './containers/HomePage'



class App extends React.Component{
   
  componentDidMount = ()=> {
    this.props.fetchingTournaments()
  }

  render() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
          <Route exact path="/tournaments/:id" render={(props) => {return <TournamentPage {...props} />}} />
          <Route exact path="/" render= {HomePage}/>
      </Switch>
    </div>
  );
}
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchingTournaments: () => {dispatch( fetchingTournaments() )}
  }
}

export default connect(null, mapDispatchToProps)(App);
