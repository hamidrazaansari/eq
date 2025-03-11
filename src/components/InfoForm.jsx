import React, { useState, useEffect } from 'react'
import SelectSearch from 'react-select-search';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import '../assets/css/process.css'
import { FaArrowRotateRight } from "react-icons/fa6";
import Reload from '../assets/image/reload.png'
import CountryCode from './CountryCode';



function InfoForm() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [countryCode, setCountryCode] = useState("");
    const [mobile, setMobile] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')

    const options = [
        { name: '+91', value: '+91' },
        { name: '+1', value: '+1' },
        { name: '+44', value: '+44' },
        { name: '+61', value: '+61' },
        { name: '+81', value: '+81' },
    ];


    const location = useLocation();
    const navigate = useNavigate();
    const goals = location.state?.goals;
    const ageRange = location.state?.ageRange;
    const isInjured = location.state?.isInjured;
    const yogaExperience = location.state?.yogaExperiences;
    const timeSlot = location.state?.timeSlot;
    const budget = location.state?.budget;


    const handleChange = (value) => {
        setCountryCode(value);
    };

    const prevStep = () => {
        navigate('/budget')
    }

    const nextStep = () => {
        navigate('/budget', { state: { goals, ageRange, isInjured, yogaExperience, timeSlot, budget } })
    }

    const handleLeadProcess = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post(`${API_URL}/buildPlanLeads`,
                {
                    name: name,
                    email: email,
                    countryCode: countryCode,
                    mobile: mobile,
                    goals: goals,
                    ageRange: ageRange,
                    isInjured: isInjured,
                    yogaExperience: yogaExperience,
                    timeSlot: timeSlot,
                    budget: budget
                });


            setTimeout(() => {
                navigate('/build-plan-details', { state: { buildePlan: response.data.body } })
            }, 1000)


            setLoading(false)

        } catch (error) {
            console.error('Error fetching profile data:', error);
            setError(error.response.data?.errors)
        }
        finally {
            setLoading(false)
        }
    }

    const CountryCodeChange = (countryCode) => {
        setCountryCode(countryCode)
    }


    return (
        <div>
            <div className="step7">
                {
                    loading ?
                        <>
                            <div className="newLoading">
                                <img src={Reload} alt="reload" />
                            </div>
                        </>
                        :
                        ''
                }
                <div className="container">
                    <div className="position-sticky">
                        <div className="d-flex justify-content-between">
                            <div></div>
                            {/* <button className='help-btn'><IoMdHelpCircleOutline /> Help</button> */}
                        </div>
                    </div>
                </div>
                <div className="item-container">
                    <div className="container">
                        <div className='process-heading'>
                            <h2 className='mb-0'>Please fill out this information</h2>
                            <p className='text-center mb-5'>Lorem ipsum dolor sit amet, consectetur</p>
                        </div>
                        <div className="age-range-form">
                            <div className='range-box'>

                                <input type="text" id='name' className='input-field' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
                                {error.name && (
                                    <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px", left: "0px" }}>
                                        {error.name}
                                    </div>
                                )}
                            </div>
                            <div className='range-box'>
                                <input type="email" className='input-field' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                {error.email && (
                                    <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px", left: "0px" }}>
                                        {error.email}
                                    </div>
                                )}
                            </div>
                            <div className="d-flex select-search">
                                <CountryCode
                                    CountryCodeChange={CountryCodeChange}
                                    defaultCountryCode={countryCode}
                                />
                                {error.countryCode && (
                                    <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "402px", width: "100px" }}>
                                        {error.countryCode}
                                    </div>
                                )}
                                <div className="range-box mt-0">
                                    <input
                                        type="text"
                                        id="phone-input"
                                        className="phone-input"
                                        placeholder="Type Your Whatsapp Number"
                                        maxLength={10}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                        }}
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}
                                    />
                                    {error.mobile && (
                                        <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px", left: "0px" }}>
                                            {error.mobile}
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="process-footer">
                    <div className="container">
                        <div className="d-flex justify-content-between">
                            <button className='back' onClick={prevStep}>Back</button>
                            <button onClick={handleLeadProcess}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InfoForm