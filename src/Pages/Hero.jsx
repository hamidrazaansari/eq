import React, { useEffect, useState, useRef } from 'react'
import NavBar from '../components/NavBar'
import YogaImg from '../assets/image/yoga.png'
import '../assets/css/hero.css'
import { AiOutlineRightCircle } from "react-icons/ai";
import AboutImg from '../assets/image/about.png'
import CountUp from 'react-countup';
import { Waypoint } from 'react-waypoint';
import WhyChooseUs from '../components/whyChooseUs';
import Community from '../components/Community';
import Footer from '../components/Footer';
import ScrollAnimation from 'react-animate-on-scroll';
import CircularSlider from '../components/CircularSlider';
import Program from '../components/Program';
import { Link } from 'react-router-dom';
import { IoPlayCircleOutline } from "react-icons/io5";
import YogaVid from '../assets/image/yoga-testi-8.mp4'
import { Modal } from 'react-bootstrap';
import { ImCancelCircle } from "react-icons/im";
import { UrlContainer } from '../context/UrlContainer';



function Hero() {
    const [inView, setInView] = useState(false);
    const [show, setShow] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // const { previous, current } = useUrlHistory();

    console.log(localStorage.getItem('urlHistory'));

    const toggleContent = () => {
        setIsExpanded((prev) => !prev);
    };

    // Handlers for showing and hiding the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEnterViewport = () => {
        setInView(true); // Trigger the counter up when the section enters view
    };

    const handleExitViewport = () => {
        setInView(false);
    };

    return (
        <div>
            <UrlContainer/>

            <NavBar />
            <section className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="texts">
                                <h1 className='heading'>Equilibrium Yoga <span>By Gunjan Kamra</span></h1>
                                <p className='para'>Holistic Wellness Solutions For Individuals And Corporates                                </p>
                                <div className="btns">
                                    <button className='bookSeion'>Book A Session</button>
                                    <button className='contactUS'>Contact Us <AiOutlineRightCircle className='ms-2 mb-1' /> </button>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6">
                            <div className="img">
                                <img src={YogaImg} alt="yoga image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className='about-us'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <ScrollAnimation
                                animateIn="fadeInUp"
                            >
                                <img src={AboutImg} alt="yoga image for about" />
                            </ScrollAnimation>
                        </div>
                        <div className="col-lg-6">
                            <ScrollAnimation animateIn="fadeInUp">
                                <h2>About Us</h2>
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="fadeInUp">
                                <h3>Gunjan Kamra</h3>
                            </ScrollAnimation>

                            {/* Always Visible Content */}
                            <ScrollAnimation animateIn="fadeInUp">
                                <p>
                                    Meet Gunjan Kamra, a highly respected yoga instructor and the Founder
                                    & CEO of Equilibrium Yoga by Gunjan Kamra (@eqmindandyoga), based in
                                    Mumbai. Gunjan is recognized as a top-ranked celebrity yoga instructor
                                    and has helped thousands of individuals worldwide embrace healthier,
                                    more balanced lives.
                                </p>
                            </ScrollAnimation>

                            <ScrollAnimation animateIn="fadeInUp">
                                <p>
                                    In March 2020, she launched ‘Equilibrium Yoga by Gunjan Kamra’, an
                                    establishment dedicated to offering holistic wellness solutions for
                                    both individuals and corporates, through customized yoga sessions,
                                    diet consultations, and lifestyle correction services, all aimed at
                                    creating successful and sustainable health and happiness journeys for
                                    our members.
                                </p>
                            </ScrollAnimation>

                            {/* Conditionally Rendered Content */}
                            {isExpanded && (
                                <>
                                        <p>
                                            With over 15 years of experience in yoga practice and 5 years of
                                            teaching, Gunjan has trained over 10,000 individuals, 80+
                                            influencers and celebrities, and 100+ corporate clients. Some of
                                            the high-profile clients she’s worked with include Ekta Kapoor,
                                            Sanya Malhotra, Priya Mani, and Mrunal Thakur. Equilibrium Yoga is
                                            also proud to have partnered with leading organizations like
                                            Adobe, Abbott, Indigo, and Reliance to foster workplace wellness.
                                        </p>

                                        <p>
                                            Gunjan's journey into wellness began after a successful 8-year
                                            career as a business analyst. Today, she combines her expertise as
                                            an advanced yoga practitioner, long-distance runner, and Latin
                                            dance trainer to create programs that are as unique as each
                                            individual. She is also a GS 10K-Women Alumni from IIM-Bangalore.
                                        </p>
                                    </>

                            )}

                                    <ScrollAnimation animateIn="fadeInUp">
                                        <div className="d-flex">
                                            <button className='read-more-btn' onClick={toggleContent}> {isExpanded ? "Read Less" : "Read More"}</button>
                                            <Link ><button className='watch-btn' onClick={handleShow} >Watch The Video <IoPlayCircleOutline /> </button></Link>
                                        </div>
                                    </ScrollAnimation>
                                </div>
                        </div>
                    </div>
            </section>

            <section className='counterup'>
                <Waypoint onEnter={handleEnterViewport} onLeave={handleExitViewport}>

                    <div className="container">
                        <ScrollAnimation animateIn="fadeIn">
                            <div className="row px-5">
                                <div className="col-lg-3 d-flex align-items-center justify-content-center flex-column">
                                    <h3>
                                        {inView && (
                                            <CountUp end={10000} />
                                        )} +</h3>
                                    <p style={{marginRight: "22px"}}>Individuals Trained  </p>
                                    <p> </p>
                                </div>
                                <div className="col-lg-3 d-flex align-items-center justify-content-center flex-column">
                                    <h3>
                                        {inView && (
                                            <CountUp end={100} />
                                        )} +</h3>
                                    <p>Influencers and  </p>
                                    <p>Celebrities Transformed </p>
                                </div>
                                <div className="col-lg-3 d-flex align-items-center justify-content-center flex-column">
                                    <h3>
                                        {inView && (
                                            <CountUp end={1000} />
                                        )} +</h3>
                                    <p>Corporate </p>
                                    <p>Sessions Conducted </p>
                                </div>
                                <div className="col-lg-3 d-flex align-items-center justify-content-center flex-column">
                                    <h3>
                                        {inView && (
                                            <CountUp end={100} />
                                        )} +</h3>
                                    <p>Corporate </p>
                                    <p>Organizations Partnered</p>
                                </div>

                            </div>
                        </ScrollAnimation>
                    </div>
                </Waypoint>
            </section>

            <section className={`programs`} >
                <Program />
            </section>


            <WhyChooseUs />

            <section className='plan'>
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center justify-content-center flex-column">
                            <ScrollAnimation animateIn="fadeInUp">
                                <h2 className='text-center'><span>Build</span> Your<p>Own Plan</p></h2>
                            </ScrollAnimation>
                            <ScrollAnimation animateIn="fadeInUp">
                                <Link to={'/goals'}> <button className='get-started-btn'>Get Started</button></Link>
                            </ScrollAnimation>
                        </div>
                    </div>
                </div>
            </section>

            <section className='testimonials'>
                <ScrollAnimation animateIn="fadeInUp">
                    <h2>Customer Stories</h2>
                </ScrollAnimation>
                <div className="slider-container">
                    <div className="container">
                        <CircularSlider />
                    </div>
                </div>
            </section>
            <section className="community">
                <Community />
            </section>
            <Footer />

            <Modal show={show} className='aboutVideo' onHide={handleClose} centered>
                <Modal.Body>
                    <button className='modleCBtn' onClick={handleClose}><ImCancelCircle /> </button>
                    <video src={YogaVid} controls autoPlay></video>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Hero