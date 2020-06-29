# BrackIt - Front End

## Summary

This is a tournament bracket generator designed to allow users to generate and manage tournament BrackIts while their friends follow along. Users can create BrackIts with 4, 8, 16, 32 or 64 teams. Tournaments can be private (unsearchable) or public. First round matchups can be random by selecting 'shuffle teams' or the tournament creator can manually decide first round match ups when entering team names. You may record scores, advance teams and edit team names, and edit tournament details, throughout the Torurnament and finally crown a champion. 

Additional features allow you to search for (public) tournaments and follow tournaments. 

## Instructions

1. Clone down the [BrackIt Backend Repo](https://github.com/lmonty22/brackIt-backend) and follow the backend Readme instructions first!

2. Run 
`npm install`

3. Run
`npm start`

4. Allow React to run on port 3001 (the backend repo should be running on port:3000).

5. Open http://localhost:3001


## Reducer Tests

1. Run reducer tests by running npm test. 

2. If you do not have enzyme test suite installed. Run 
`npm i --save-dev enzyme enzyme-adapter-react-16`

## Other Dependencies

- React-Redux 

- Redux-Thunk 

- UI is styled with [react-bootstrap](https://react-bootstrap.github.io/)

- Tournament bracket lines are drawn using [react-lineto](https://www.npmjs.com/package/react-lineto)



