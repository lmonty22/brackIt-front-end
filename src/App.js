import React from 'react';
import './App.css';
import NavBar from './components/NavBar'
import TournamentPage from './containers/TournamentPage'
import { Route, Switch} from "react-router-dom"
import {connect} from 'react-redux'
import {fetchingTournaments} from './redux/actions'


class App extends React.Component{
   
  componentDidMount = ()=> {
    this.props.fetchingTournaments()
  }

  render() {
  return (
    <div className="App">
      <NavBar />
      <Switch>
          <Route exact path="/tournaments/:id" component={TournamentPage} />
          <Route exact path="/" render= {() => {return (<div>This is the homepage...</div>)}}/>
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

export default connect(mapDispatchToProps)(App);
