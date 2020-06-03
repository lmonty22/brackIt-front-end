import React from 'react';
import MatchUp from './MatchUp'

const RoundCol = (props ) => {
    console.log(props)
    return (<div>
        This is round number {props.round.round_number}
        {props.round.match_ups.map(m => <MatchUp matchUp={m} />)}
    </div>)
}

export default RoundCol