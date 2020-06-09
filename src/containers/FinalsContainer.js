import React from 'react';
import MatchUp from '../components/MatchUp'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Row'
import Champion from '../components/Champion'
import RoundCol from '../components/RoundCol'
import '../App.css';


const FinalsContainer= (props) => {
    return ( 
        <div>
            <Row> <Champion champ={props.champ}/></Row>
            <Row>
                {props.round.match_ups.map(m => <div className='finalMatchUp'><MatchUp  key={m.id} matchUp={m} /> </div>)}
            </Row>
         </div>
        )
}

export default FinalsContainer