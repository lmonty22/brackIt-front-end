import React from 'react';
import RoundCol from '../components/RoundCol'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const LeftHalfContainer= (props) => {
        return <Row>
        {props.rounds.map(r => {
            return  <Col> <RoundCol  round={r}/></Col>})}
        </Row>
}

export default LeftHalfContainer