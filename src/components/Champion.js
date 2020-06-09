import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron'
import { Container } from 'react-bootstrap';

const Champion = (props) => {
    return <div className='champ'>
        <Jumbotron fluid>
            <Container >
            <h4>The champion is... </h4>
                {props.champ? <h1>{props.champ.name}</h1> : null }
             </Container>
        </Jumbotron>
        </div>
}

export default Champion

