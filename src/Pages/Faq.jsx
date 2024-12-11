import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import ProgImg from '../assets/image/personalize-prog.png'
import '../assets/css/personalize-prog.css'
import Slider from 'react-slick'
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import Accordion from 'react-bootstrap/Accordion';





// Custom Prev Arrow
const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button className="custom-prev-btn" onClick={onClick}>
            <HiOutlineArrowLongLeft />
        </button>
    );
};

// Custom Next Arrow
const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <button className="custom-next-arrow" onClick={onClick}>
            <HiOutlineArrowLongRight />
        </button>
    );
};


function Faq() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />
    };

    return (
        <div className='personalize-program' >
            <NavBar />

            <section className='faq'>
                <div className="container">
                    <h1>Frequently Asked Questions</h1>
                    <div className="accordion-box">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>Who all can benefit from this offering?</Accordion.Header>
                                <Accordion.Body>Anyone can join. Whether you are at a beginner or advanced level, we will customize the sessions for you to make them relevant.</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>What are the payment options available?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>If you have any major pre-existing health conditions,can i purchase this plan</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>what if i`ve never done yoga before? can i still join these sessions?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header>Will there be a community?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header>Who is going to assist with queries?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="6">
                                <Accordion.Header>what if i`ve never done yoga before? can i still join these sessions?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </div>


            </section>
            <div className="container">
            <div className="row my-5">
                <div className="col-12 p-3">
                    <div className="recall">
                        <h2>Need help finding the right plans?</h2>
                        <p>Request a callback to get your quires answered</p>
                        <button>Request a call</button>
                    </div>
                </div>
            </div>
            </div>
            <section >
                <div className="container px-5">
                    <div className="other-plan">
                        <h2 className='other-plan-heading'>See Others plans</h2>

                        <Slider {...settings}>
                            <div className="slide">
                                <div className="program-box">
                                    <img src={ProgImg} alt="Personal Training Trail" />
                                    <h3>Hybrid Training Program</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur hjgg adipiscing elit, sed do eiusmod tempor lorem </p>
                                    <button className='BookNowBtn '>Explore plan</button>

                                </div>
                            </div>
                            <div className="slide">
                                <div className="program-box">
                                    <img src={ProgImg} alt="Personal Training Trail" />
                                    <h3>Corporate Wellness Program</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur hjgg adipiscing elit, sed do eiusmod tempor lorem </p>
                                    <button className='BookNowBtn '>Explore plan</button>

                                </div>
                            </div>
                            <div className="slide">
                                <div className="program-box">
                                    <img src={ProgImg} alt="Personal Training Trail" />
                                    <h3>Group Training Program</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur hjgg adipiscing elit, sed do eiusmod tempor lorem </p>
                                    <button className='BookNowBtn '>Explore plan</button>

                                </div>
                            </div>
                            <div className="slide">
                                <div className="program-box">
                                    <img src={ProgImg} alt="Personal Training Trail" />
                                    <h3>Hybrid Training Program</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur hjgg adipiscing elit, sed do eiusmod tempor lorem </p>
                                    <button className='BookNowBtn '>Explore plan</button>

                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}

export default Faq