import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Container } from 'react-bootstrap';

const Champion = (props) => {
    return (
        <Jumbotron fluid className='champion' >
                {props.champ? <h1> 🏆 {props.champ.name} 🏆 </h1> : <h1>🏆</h1>}
        </Jumbotron>)
}

export default Champion

