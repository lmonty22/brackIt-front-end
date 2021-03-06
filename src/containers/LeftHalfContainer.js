import React from 'react';
import RoundCol from '../components/RoundCol'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../App.css';

// Matchups on the left side
const LeftHalfContainer= (props) => {
        return <Row >
        {props.rounds.map(r => {
            return   <Col key={r.id}><RoundCol tUser={props.tUser}  loading={props.loading} start={'left'} end={'right'} key={r.id} round={r} /></Col>})}
        </Row>
}

export default LeftHalfContainer