import React from 'react';
import TournamentsContainer from "./TournamentsContainer"
import Carousel from 'react-bootstrap/Carousel'
import Row from 'react-bootstrap/row'
import skiball from '../assets/skiball.jpg'
import soccer from '../assets/soccer.jpg'
import bags from '../assets/bags.jpg'
import basketball from '../assets/basketball.jpg'

import '../App.css'


const HomePage = () => {
    return (
        <div>

        <Row>
         <Carousel interval={3000}>
         <Carousel.Item>
            <img
            className="d-block w-100"
            src={skiball}
            alt="skiball"
            />
        </Carousel.Item>
         <Carousel.Item>
            <img
            className="d-block w-100"
            src={basketball}
            alt="basketball"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100 "
            src={bags}
            alt="cornhole"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={soccer}
            alt="soccer"
            />
        </Carousel.Item>
        </Carousel>
        </Row>
        
        <Row>
        <TournamentsContainer key={'tournamentContainer'}/>
        </Row>
        </div>
    )
}

export default HomePage