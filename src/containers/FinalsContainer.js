import React from 'react';
import MatchUp from '../components/MatchUp'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Row'
import Champion from '../components/Champion'


const FinalsContainer= (props) => {
    return (
        <Col className="final"> 
             {/* <Row>   
             <Champion champ={props.champ} />
            </Row> */}
            <Row>
             {props.round.match_ups.map(m => <MatchUp key={m.id} matchUp={m} />)}
             </Row>
        </Col>
    )
}

export default FinalsContainer