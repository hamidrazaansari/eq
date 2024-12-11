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



function Hero() {
    const [inView, setInView] = useState(false);

    const scrollContainerRef = useRef(null);


    const handleEnterViewport = () => {
        setInView(true); // Trigger the counter up when the section enters view
    };

    const handleExitViewport = () => {
        setInView(false); 
    };

    return (
        <div>
            <NavBar />
            <section className="hero">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="texts">
                                <h1 className='heading'>Equilibrium <span>Mind & Yoga</span></h1>
                                <p className='para'>Online Yoga Classes, Diet Mentoring & Lifestyle Correction</p>
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

                                <ScrollAnimation animateIn="fadeInUp">
                                <p>(also addressed as GUNJ by her clients), is a celebrity yoga trainer and an advocate of yoga for great physical, mental and emotional wellbeing. </p>
                                </ScrollAnimation>

                                <ScrollAnimation animateIn="fadeInUp">
                                <p>Gunjan quit her 8-year-long stint with the corporate to follow her dream. She founded “Equilibrium - Mind & Yoga” in March 2020 and never looked back. </p>
                                </ScrollAnimation>

                                <ScrollAnimation animateIn="fadeInUp">
                                <p>Through the power of Yoga, she helps people get fitter physically and emotionally and helps them live harmonious, peaceful, and healthy life. </p>
                                </ScrollAnimation>

                                <ScrollAnimation animateIn="fadeInUp">
                                <p>According to Gunjan, yoga is not just limited to achieving a certain posture. It is about the journey to that posture - being one-minded and conscious of every breath in that journey.</p>
                                </ScrollAnimation>   
                                
                                <ScrollAnimation animateIn="fadeInUp">
                                <button className='read-more-btn'>Read More</button>
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
                                    <p>Successfully served </p>
                                    <p> the client’s needs</p>
                                </div>
                                <div className="col-lg-3 d-flex align-items-center justify-content-center flex-column">
                                    <h3>
                                        {inView && (
                                            <CountUp end={80} />
                                        )} +</h3>
                                    <p>Celebrities and </p>
                                    <p>Influencers Trained </p>
                                </div>
                                <div className="col-lg-3 d-flex align-items-center justify-content-center flex-column">
                                    <h3>
                                        {inView && (
                                            <CountUp end={1000} />
                                        )} +</h3>
                                    <p>Corporate </p>
                                    <p>Session Conducted </p>
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
                <Program/>
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
                               <Link to={'/process'}> <button className='get-started-btn'>Get Started</button></Link>
                            </ScrollAnimation>
                        </div>
                    </div>
                </div>
            </section>

            <section className='testimonials'>
                <ScrollAnimation animateIn="fadeInUp">
                    <h2>Testimonials</h2>
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
            <Footer/>
        </div>
    )
}

export default Hero