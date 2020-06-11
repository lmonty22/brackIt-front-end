import React from 'react';
import MatchUp from '../components/MatchUp'
import Row from 'react-bootstrap/Row'
import Champion from '../components/Champion'
import '../App.css';


const FinalsContainer= (props) => {
    return ( 
        <div>
            <Row> <Champion champ={props.champ}/></Row>
            <Row>
                {props.round.match_ups.map(m => <div key={m.id}className='finalMatchUp'><MatchUp tUser={props.tUser} loading={props.loading} round_number={props.round.round_number} key={m.id} matchUp={m} /> </div>)}
            </Row>
         </div>
        )
}

export default FinalsContainer