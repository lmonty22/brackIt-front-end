import React from 'react';
import RoundCol from '../components/RoundCol'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const LeftHalfContainer= (props) => {
        return <Row >
        {props.rounds.map(r => {
            return  <Col key={r.id}> <RoundCol key={r.id} round={r}/></Col>})}
        </Row>
}

export default LeftHalfContainer