import React from 'react';
import MatchUp from './MatchUp'

const RoundCol = (props ) => {
    return (<div>
        {props.round.match_ups.map(m => <MatchUp key ={m.key} matchUp={m} />)}
    </div>)
}

export default RoundCol