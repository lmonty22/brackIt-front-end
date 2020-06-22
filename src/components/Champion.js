import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Champion = (props) => {
    return (
        <Jumbotron fluid className='champion' >
                {props.champ? <h1> <span role="img" aria-label='trophy'>🏆</span> {props.champ.name}<span role='img' aria-label='trophy'>🏆</span> </h1> : 
                <h1><span role='img' aria-label="trophy">🏆</span></h1>}
        </Jumbotron>)
}

export default Champion

