import React from 'react';
import TournamentsContainer from "./TournamentsContainer"
import Carousel from 'react-bootstrap/Carousel'
import Row from 'react-bootstrap/row'
import skiball from '../assets/skiball.jpg'
import soccer from '../assets/soccer.jpg'
import basketball from '../assets/basketball.jpg'
import shuffleboard from '../assets/shuffleboard.jpg'
import {connect} from 'react-redux'
import logo from '../assets/BrackIt.png'
import '../App.css'
import { Jumbotron } from 'react-bootstrap';
import {Link} from 'react-router-dom'


const HomePage = (props) => {
    return (
        <div>
        {props.searchTerm.length === 0? 
        <Row>
         <Carousel interval={5000}>
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
         <Jumbotron className={'intro-box'}>
             <img src={logo}
                height='100px'
                width='300px'
            ></img>
             <div>
         Welcome to BrackIt, a space to generate and share your tournament BrackIt with friends. 
         If you're having a group over for a cornhole tournament, or playing video games online, we want to be there for you. <Link to='/login'>Login</Link> or <Link to='/signup'>Sign Up</Link> to start generating BrackIts or search for tournaments to follow. 
         Have fun! </div>
         </Jumbotron>
            </Row>
        : null }
        
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
