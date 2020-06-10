import React from 'react';
import RoundCol from '../components/RoundCol'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../App.css';

const RightHalfContainer= (props) => {
        return <Row>
        {props.rounds.reverse().map(r => {
            return  <Col className={`roundRight Rr${r.round_numer}`}key={r.id}> <RoundCol start={'right'} end={'left'} key={r.id} round={r} /></Col>})}
        </Row>
}

export default RightHalfContainer