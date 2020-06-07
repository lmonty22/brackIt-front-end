import React from 'react';
import MatchUp from './MatchUp'
import Col from 'react-bootstrap/Col'
import '../App.css';
import Container from 'react-bootstrap/Container'

const RoundCol = (props ) => {
    return (<Container >
        {props.round.match_ups.map(m =>
            <div>
            <div className={`round${props.round.round_number}`}></div>
             <MatchUp key={m.id} matchUp={m} />
             <div className={`round${props.round.round_number}`}></div>
             </div>
             )}
        </Container>)
}

export default RoundCol