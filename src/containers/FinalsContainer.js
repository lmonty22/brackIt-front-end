import React from 'react';
import MatchUp from '../components/MatchUp'
import Row from 'react-bootstrap/Row'
import Champion from '../components/Champion'


const FinalsContainer= (props) => {
    return (
        <div> <Row>
             {props.round.match_ups.map(m => <MatchUp key={m.id} matchUp={m} />)}
        </Row>
            <Row>   
             <Champion champ={props.champ} />
            </Row>
        </div>
    )
}

export default FinalsContainer