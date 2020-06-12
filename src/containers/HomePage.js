import React from 'react';
import TournamentsContainer from "./TournamentsContainer"
import Carousel from 'react-bootstrap/Carousel'
import Row from 'react-bootstrap/row'
import skiball from '../assets/skiball.jpg'
import soccer from '../assets/soccer.jpg'
import basketball from '../assets/basketball.jpg'
import shuffleboard from '../assets/shuffleboard.jpg'
import {connect} from 'react-redux'
import '../App.css'


const HomePage = (props) => {
    return (
        <div>
        {props.searchTerm.length === 0? 
        <Row>
         <Carousel interval={3000}>
         <Carousel.Item>
            <img
            className="d-block w-100"
            src={skiball}
            alt="skiball"
            height="700"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={shuffleboard}
            alt="shuffleboard"
            height="700"
            />
        </Carousel.Item>
         <Carousel.Item>
            <img
            className="d-block w-100"
            src={basketball}
            alt="basketball"
            height="700"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={soccer}
            alt="soccer"
            height="700"
            />
        </Carousel.Item>
        </Carousel>
        </Row> : null }
        
        <Row> 
        <TournamentsContainer key={'tournamentContainer'}/>
        </Row>
        </div>
    )
}


const mapStateToProps = (state) => {
    return  {searchTerm: state.searchTerm}
 }
 export default connect(mapStateToProps)(HomePage)
