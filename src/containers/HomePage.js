import React from 'react';
import TournamentsContainer from "./TournamentsContainer"
import skiball from '../assets/skiball.jpg'
import pingpong from '../assets/pingpong.jpg'
import basketball from '../assets/basketball.jpg'
import chess from '../assets/chess.jpg'
import {connect} from 'react-redux'
import logo from '../assets/BrackIt.png'
import '../App.css'
import { Jumbotron, Button, Carousel, Row } from 'react-bootstrap';


const HomePage = (props) => {
    return (
        <div>
        {props.searchTerm.length === 0? 
        <Row>
         <Carousel interval={5000}>
         <Carousel.Item>
            <img
            className="d-block w-100"
            src={basketball}
            alt="basketball hoop at sunset"
            height="700"
            />
        </Carousel.Item>
         <Carousel.Item>
            <img
            className="d-block w-100"
            src={skiball}
            alt="skiball machines"
            height="700"
            />
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={chess}
            alt="chess board"
            height="700"
            />
        </Carousel.Item>
        
        <Carousel.Item>
            <img
            className="d-block w-100"
            src={pingpong}
            alt="pingpong table"
            height="700"
            />
        </Carousel.Item>
        </Carousel>
         <Jumbotron className='intro-box'>
             <img src={logo}
                height='100px'
                width='300px'
                alt='brackit logo'
            ></img>
            {!props.currentUser? 
             <div style={{fontWeight: 'bold'}}>
            Welcome to BrackIt, a platform designed to help your tournament run smoothly.
            Whether you're hosting a cornhole tournament, or playing video games online, we want to be there for you. <Button variant='light' onClick={props.handleLoginShow}> Login </Button> or <Button variant='dark' onClick={props.handleCreateShow}>Sign Up</Button> to start generating BrackIts 
            and sharing your BrackIts with friends.
            Have fun!  
             </div>:
              <div style={{fontWeight: 'bold'}}>
            Welcome to BrackIt, a platform designed to help your tournament run smoothly.
            Whether you're hosting a cornhole tournament, or playing video games online, we want to be there for you. Login or Sign Up to start generating BrackIts 
            and sharing your BrackIts with friends.
            Have fun! </div>}
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
    return  {searchTerm: state.searchTerm,
            currentUser: state.currentUser}
 }
 export default connect(mapStateToProps)(HomePage)
