import { shallow, mount, render } from 'enzyme';
import react from 'React'
import reducer from './reducer.js'

describe('reducer', () => {
    it ('handles @@INIT', () => {
        const action = {type: '@@INIT'}
        expect(reducer(undefined, action)).toEqual(
            {tournaments: null, 
              currentUser: null,
              currentTournament: null, 
              errors: [],
              searchTerm: ''  
            })
    })
    it ('handles a new currentTournament', () => {
        const action = {type: 'SET_TOURNAMENT', payload: {name: 'Best Tourney', number_of_teams: 8}}
        const result = reducer({
            currentTournament: null  
          }, action)
        expect(result.currentTournament).toBeDefined()
        expect(result.currentTournament.name).toEqual('Best Tourney')
        expect(result.currentTournament.number_of_teams).toEqual(8)
    })
    it ('handles a currentTournament update', () => {
        const action = {type: 'UPDATED_TOURNAMENT', payload: {name: 'Best Tourney 2', number_of_teams: 4}}
        const result = reducer({
            currentTournament: {name: 'Best Tourney', number_of_teams: 8}  
          }, action)
        expect(result.currentTournament).toBeDefined()
        expect(result.currentTournament.name).toEqual('Best Tourney 2')
        expect(result.currentTournament.number_of_teams).toEqual(4)
    })
    it ('handles removing currentTournament', () => {
        const action = {type: 'REMOVE_TOURNAMENT'}
        const result = reducer({
            currentTournament: {name: 'Best Tourney 2', number_of_teams: 4}  
          }, action)
        expect(result.currentTournament).toEqual(null)
    })
    it ('handles fetchedtournaments', () => {
        const action = {type: 'FETCHED_TOURNAMENTS', payload: [{id: 1, name: 'tourney1'}, {id: 2, name: 'tourney2'}]}
        const result = reducer({
            tournaments: null
          }, action)
        expect(result.tournaments.length).toEqual(2)
    })
    it ('handles new tournament', () => {
        const action = {type: 'NEW_TOURNAMENT', payload: {id: 3, name: 'tourney3'}}
        const result = reducer({
            tournaments: [{id: 1, name: 'tourney1'}, {id: 2, name: 'tourney2'}]
        }, action)

        expect(result.tournaments.length).toEqual(3)
    })
    it ('handles delete tournament', () => {
        const action = {type: 'DELETE_TOURNAMENT', payload: 2}
        const result = reducer({
            tournaments: [{id: 1, name: 'tourney1'}, {id: 2, name: 'tourney2'}, {id: 3, name: 'tourney3'}]
        }, action)

        expect(result.tournaments.length).toEqual(2)
    })
    it ('handles new currentUser', () => {
        const action = {type: 'NEW_CURRENT_USER', payload: {username: 'lmonty22', followers: []}}
        const result = reducer({
            currentUser: null
        }, action)
        expect(result.currentUser.username).toEqual('lmonty22')
        expect(result.currentUser.followers.length).toEqual(0)
    })
    it ('handles add tournament to follows', ()=> {
        const action = {type: 'ADD_TOURNAMENT_TO_FOLLOWS', payload: {id: 4, name: 'New Tourney Follow'} }
        const result = reducer({
            currentUser: {username: 'lmonty22', followers: []}
        }, action)
        expect(result.currentUser.followers.length).toEqual(1)
    })
    it ('handles remove tournament from follows', () => {
        const action = {type: 'REMOVE_TOURNAMENT_FROM_FOLLOWS', payload: {id: 4, name: 'New Tourney Follow'}}
        const result = reducer({
            currentUser: {username: 'lmonty22', followers: [ {id: 4, name: 'New Tourney Follow'}]}
        }, action)
        expect(result.currentUser.followers.length).toEqual(0)
        expect(result.currentUser.followers).toEqual([])
    })
    it ('handles clear user', () => {
        const action = {type: 'CLEAR_USER'}
        const result = reducer({
            currentUser: {username: 'lmonty22', followers: []}
        }, action)
        expect(result.currentUser).toEqual(null)
    })
    it ('handles errors', () => {
        const action = {type: 'LOGIN_ERROR', payload: ['Username and Password do not match']}
        const result = reducer({
            errors: []
        }, action)
        expect(result.errors.length).toEqual(1)
        expect(result.errors[0]).toEqual('Username and Password do not match')
    })

    it ('handles searchTerm', () => {
        const action= {type: 'NEW_SEARCH_TERM', payload: 'Mack'}
        const result = reducer({
            searchTerm: ''
        }, action)
        expect(result.searchTerm).toEqual('Mack')
    })
});
