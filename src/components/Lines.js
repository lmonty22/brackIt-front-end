// import React from 'react';
// import LineTo, { SteppedLineTo} from 'react-lineto';

// const getNextMatchUp = (currentMatchUp) => {
//     if (currentMatchUp % 2 === 0){
//         return (currentMatchUp/2)
//     }else{
//         return (currentMatchUp + 1)/ 2
//     }

// }

// const Lines = (props) => {
//     const leftLines = props.left.map(r => r.match_ups.map(m => {
//         let nextRound = r.round_number + 1
//         let nextMatchUp = getNextMatchUp(m.match_up_number)
//         return ( <SteppedLineTo from={`R${r.round_number}-M${m.match_up_number}`} to={`R${nextRound}-M${nextMatchUp}`} toAnchor={'left'}  fromAnchor={'right'}  orientation='h' />)
//     }))
//     console.log(leftLines)
//     return(
//         leftLines.map( l => l )
//     )
// }

// export default Lines