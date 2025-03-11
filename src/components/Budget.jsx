import React, { useState, useEffect } from 'react';
import '../assets/css/process.css'
import { IoMdHelpCircleOutline } from "react-icons/io";
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import { useNavigate , useLocation } from 'react-router-dom';


function Budget() {
    const [budgets, setBudgets] = useState('');
    const [budget, setBudget] = useState('');
    const [activeBudget, setActiveBudget] = useState('2000 - 3000');


        const location = useLocation();
        const navigate = useNavigate();
        const goals = location.state?.goals;
        const ageRange = location.state?.ageRange;
        const isInjured = location.state?.isInjured;
        const yogaExperiences = location.state?.yogaExperiences;
        const timeSlot = location.state?.activeSlot;
                

    useEffect(() => {
        async function fetchBudgets() {
            try {
                const response = await axios.get(`${API_URL}/budgets?displayOrder=ASC`, {

                });
                setBudgets(response.data.body);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }
        fetchBudgets()
    }, [])

    const handleBudgetClick = (budget , budgetId) => {
        setActiveBudget(budget); 
        setBudget(budgetId)
    };

    const prevStep = ()=>{
        navigate('/timeslot')

    }
    const nextStep = ()=>{
        navigate('/info' , {state:{goals , ageRange , isInjured , yogaExperiences  , timeSlot , budget }})
    }



    return (
        <div>
            <div className="step2">
                <div className="container">
                    <div className="position-sticky">
                        <div className="d-flex justify-content-between">
                            <div></div>
                            <button className='help-btn'><IoMdHelpCircleOutline /> Help</button>
                        </div>
                        <div className="row mt-3 px-5 mobile-padding">
                            <div className="col-2"><div className="step "></div></div>
                            <div className="col-2"><div className="step "></div></div>
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step active-step"></div></div>
                        </div>
                    </div>
                </div>
                <div className="item-container">
                    <div className="container">
                        <div className='process-heading'>
                            <h2 className='mb-0'>Choose Your Budget</h2>
                            <p className='text-center mb-5'>Lorem ipsum dolor sit amet, consectetur</p>
                        </div>
                        <div className="injury-permision">
                            {
                                budgets && budgets.map((item) => {
                                    const budgetLabel =
                                        (item.minimum === 0 ? 'Under' : item.minimum) +
                                        ' - ' +
                                        (item.maximum === 0 ? 'Above' : item.maximum);

                                    const isActive = activeBudget === budgetLabel;
                                    return (

                                        <button
                                        key={item._id}
                                            className={`permisson-btn ${isActive ? 'active' : ''}`}
                                            onClick={() => handleBudgetClick(budgetLabel , item._id)}
                                        >
                                            <p>{budgetLabel}</p>
                                            <span style={{ fontSize: "14px" }}>{item.shortDescription}</span>
                                        </button>
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
                            <button onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Budget