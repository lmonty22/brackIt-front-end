import React from 'react';
import RoundCol from '../components/RoundCol'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../App.css';

// matchups on the right side
const RightHalfContainer= (props) => {
        return <Row>
        {props.rounds.reverse().map(r => {
            return  <Col key={r.id}> <RoundCol tUser={props.tUser} loading={props.loading} start={'right'} end={'left'} key={r.id} round={r} /></Col>})}
        </Row>
}

export default RightHalfContainer