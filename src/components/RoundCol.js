import React from 'react';
import MatchUp from './MatchUp'
import '../App.css';
import Container from 'react-bootstrap/Container'

const RoundCol = (props ) => {
    return (<Container >
        {props.round.match_ups.map(m =>
            <div key={m.id} className={`roundCol${props.round.round_number}${m.match_up_number}`}>
            <div className={`round${props.round.round_number}`}></div>
             <MatchUp tUser={props.tUser} loading={props.loading} round_number={props.round.round_number}  start={props.start} end={props.end} key={m.id} matchUp={m} />
             <div className={`round${props.round.round_number}`}></div>
             </div>
             )}
        </Container>)
}

export default RoundCol