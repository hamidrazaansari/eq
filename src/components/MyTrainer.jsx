import React from 'react'
import TrainerProfile from '../assets/image/trainer-profile.png'
import '../assets/css/dashboard.css'
import { IoMdStar } from "react-icons/io";


function MyTrainer() {
  return (
    <div>
        <div className="trainer-banner">
            <div className="banner-header">
                <img src={TrainerProfile} alt="" />
                <h2>Gunjan Kamra</h2>
                <p>Certified Yoga Teacher </p>
            </div>
            <div className="banner-footer">
                    <button><span>5<IoMdStar/></span> 52 People Coached</button>
            </div>
        </div>
        <div className="main-content">
            <div className="about-trainer">
                <h3>About </h3>
                <p>Gunjan Kamra, is a celebrity yoga trainer and an advocate of yoga for great physical, mental and emotional wellbeing. 
                Gunjan quit her 8-year-long stint with the corporate to follow her dream. She founded “Equilibrium - Mind & Yoga” in March 2020 and never looked back. </p>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <div className="trainer-interest In">
                        <h2>Interested In</h2>
                        <div className="btn-box">
                            <button className='intrest-btn'>Boxing</button>
                            <button className='intrest-btn'>Fitness</button>
                            <button className='intrest-btn'>Fitness</button>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="Speciality In">
                        <h2>Speciality In</h2>
                        <div className="btn-box">
                        <button className='Speciality-btn'>Boxing</button>
                            <button className='Speciality-btn'>Fitness</button>
                            <button className='Speciality-btn'>Fitness</button>                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="Certifications In">
                        <h2>Certifications</h2>
                        <div className="btn-box">
                            <button>Ace certified</button>
                            <button>CPA/AED</button>
                            <button>ACE certification</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="teachingExperience">
                        <h2>Teaching Experience</h2>
                        <p className='mt-4'>Years of Experience : 08 years</p>
                        <p>Types of Classes : Group classes, Online sessions.</p>
                        <p>Past Employers : Yoga studio, Organizations</p>
                    </div>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-4">
                    <div className="teachingExperience">
                        <h2>Inspirations</h2>
                        <p className='mt-4'>Yoga is the journey of the self, through the self, to the self." – Bhagavad Gita This emphasizes yoga as a path of self-discovery and inner transformation.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MyTrainer