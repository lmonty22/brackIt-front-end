import React from 'react';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const MatchUp = (props) => {
    return (<div>
        <Row>
            {props.matchUp.team_a?  <button type="button" class="btn btn-light"> {props.matchUp.team_a.name}</button> : 
                <button type="button" class="btn btn-light" disabled>TBD</button>
            }
        </Row>
        <Row> 
             {props.matchUp.team_b?  <button type="button" class="btn btn-dark"> {props.matchUp.team_b.name}</button> : 
                <button type="button" class="btn btn-dark" disabled>TBD</button>
            }
        </Row>
    </div>)
}

export default MatchUp
