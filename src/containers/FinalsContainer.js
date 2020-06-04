import React from 'react';
import MatchUp from '../components/MatchUp'
import Row from 'react-bootstrap/Row'


const FinalsContainer= (props) => {
    return<Row>
             {props.round.match_ups.map(m => <MatchUp matchUp={m} />)}
        </Row>

}

export default FinalsContainer