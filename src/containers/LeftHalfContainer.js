import React from 'react';
import RoundCol from '../components/RoundCol'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../App.css';

const LeftHalfContainer= (props) => {
        return <Row >
        {props.rounds.map(r => {
            return   <Col className={`roundLeft lr${r.round_numer}`} key={r.id} ><RoundCol start={'left'} end={'right'} key={r.id} round={r} /></Col>})}
        </Row>
}

export default LeftHalfContainer