import React, { useState, useEffect } from 'react';
import '../assets/css/process.css'
import { IoMdHelpCircleOutline } from "react-icons/io";
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import getImageURL from '../utills/getImageURL';
import { useNavigate , useLocation } from 'react-router-dom';


function TimeSlot() {
        const [timeSlots, setTimeSlots] = useState('');
        const [activeSlot, setActiveSlot] = useState('');
        const navigate = useNavigate()
        const location = useLocation();
        const goals = location.state?.goals;
        const ageRange = location.state?.ageRange;
        const isInjured = location.state?.isInjured;
        const yogaExperiences = location.state?.experienceId;
        

        
        useEffect(()=>{
            async function fetchTimeSlots() {
                try {
                    const response = await axios.get(`${API_URL}/timeSlots?displayOrder=ASC`, {
    
                    });
                    setTimeSlots(response.data.body);
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                }
            }
            fetchTimeSlots();
        } , [])

        const handleSlotClick = (slot) => {
            setActiveSlot(slot); 
        };

        const prevStep = ()=>{
            navigate('/experience')

        }
        const nextStep = ()=>{
            navigate('/budget' , {state:{goals , ageRange , isInjured , yogaExperiences ,activeSlot}})
        }
    
    return (
        <div>
            <div className="step5">
                <div className="container">
                    <div className="process-header">
                        <div className="d-flex justify-content-between">
                            <div></div>
                            <button className='help-btn'><IoMdHelpCircleOutline /> Help</button>
                        </div>
                        <div className="row mt-3 px-5">
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step active-step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                        </div>
                    </div>
                </div>
                <div className="item-container">
                    <div className="container">
                        <div className='process-heading'>
                            <h2 className='mb-0'>Time Slots In IST</h2>
                            <p className='text-center mb-5'>Lorem ipsum dolor sit amet, consectetur</p>
                        </div>
                        <div className="row d-flex align-items-center justify-content-center mx-auto" style={{ width: "60%" }}>

                            {
                               timeSlots && timeSlots.map((slot) => {
                                    const imageUrl = slot.image ? getImageURL(slot.image) : '';

                                    return (
                                        <div className="col" key={slot._id}>
                                            <div
                                                className={`item ${activeSlot === slot._id ? 'active-item' : ''}`}
                                                onClick={() => handleSlotClick(slot._id)}>

                                                <img src={imageUrl} alt={slot.title} />
                                                <p className='mb-0'>{slot.title}</p>
                                                {slot.isGroupAvailable ? <span>Group Available</span> : ''}
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>

                <div className="process-footer">
                    <div className="container">
                        <div className="d-flex justify-content-between">
                            <button className='back' onClick={prevStep}>Back</button>
                            <button onClick={nextStep} disabled={activeSlot === ''}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimeSlot