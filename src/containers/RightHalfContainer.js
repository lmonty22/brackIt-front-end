import React from 'react';
import RoundCol from '../components/RoundCol'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const RightHalfContainer= (props) => {
        return <Row>
        {props.rounds.reverse().map(r => {
            return  <Col> <RoundCol round={r} /></Col>})}
        </Row>
}

export default RightHalfContainer