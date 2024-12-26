import React, { useState, useEffect } from 'react';
import '../assets/css/process.css'
import { IoMdHelpCircleOutline } from "react-icons/io";
import SelectSearch from 'react-select-search';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import getImageURL from '../utills/getImageURL';


const Process = () => {
    const [step, setStep] = useState(1);
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [selectedRange, setSelectedRange] = useState(null);
    const [isActive, setIsActive] = useState('Yes');
    const [activeExperience, setActiveExperience] = useState('Only Yoga Experience');
    const [activeSlot, setActiveSlot] = useState('');
    const [activeBudget, setActiveBudget] = useState('2000 - 3000');
    const [goal, setGoal] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [yogaExperiences, setYogaExperiences] = useState('');
    const [timeSlots, setTimeSlots] = useState('');
    const [budgets, setBudgets] = useState('');



    // Fetch profile data
    useEffect(() => {
        async function fetchGoals() {
            try {
                const response = await axios.get(`${API_URL}/goals`, {

                });
                setGoal(response.data.body);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }
        async function fetchAgeRange() {
            try {
                const response = await axios.get(`${API_URL}/ageRanges?displayOrder=ASC`, {

                });
                setAgeRange(response.data.body);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }

        async function fetchYogaExperiences() {
            try {
                const response = await axios.get(`${API_URL}/yogaExperiences?displayOrder=ASC`, {

                });
                setYogaExperiences(response.data.body);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }

        async function fetchTimeSlots() {
            try {
                const response = await axios.get(`${API_URL}/timeSlots?displayOrder=ASC`, {

                });
                setTimeSlots(response.data.body);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }
        async function fetchBudgets() {
            try {
                const response = await axios.get(`${API_URL}/budgets?displayOrder=ASC`, {

                });
                setBudgets(response.data.body);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }
        fetchGoals();
        fetchAgeRange();
        fetchYogaExperiences();
        fetchTimeSlots();
        fetchBudgets();
    }, []);




    const handleSlotClick = (slot) => {
        setActiveSlot(slot); // Set the clicked slot as active
    };

    const handleButtonClick = (experience) => {
        setActiveExperience(experience); // Update state with the clicked button
    };

    const handleClick = (value) => {
        setIsActive(value); // Update state based on button clicked
    };

    const handleSelect = (value) => {
        setSelectedRange(value); 
    };
    const options = [
        { name: '+91 (India)', value: 'sv' },
        { name: '+1 (USA)', value: 'e' },
        { name: '+44 (UK)', value: 'en' },
        { name: '+61 (Australia)', value: 'n' },
        { name: '+81 (Japan)', value: 'een' },

    ];

    // Toggle goal selection
    const toggleGoal = (id) => {
        if (selectedGoals.includes(id)) {
            // If already selected, remove it
            setSelectedGoals(selectedGoals.filter(goal => goal !== id));
        } else if (selectedGoals.length < 3) {
            // Only add if less than 3 are selected
            setSelectedGoals([...selectedGoals, id]);
        }
    };

    // Move to the next step
    const nextStep = () => {
        setStep(prevStep => prevStep + 1);
    };

    // Move to the previous step
    const prevStep = () => {
        setStep(prevStep => prevStep - 1);
    };

    return (
        <div className="process-page">
            {step === 1 && (
                <div className="step1">
                    <div className="container">
                        <div className="process-header">
                            <div className="d-flex justify-content-between">
                                <div></div>
                                <button className="help-btn">
                                    <IoMdHelpCircleOutline /> Help
                                </button>
                            </div>
                            <div className="row mt-3 px-5">
                                <div className="col-2"><div className="step active-step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                            </div>
                        </div>
                    </div>
                    <div className="item-container">
                        <div className="container">
                            <div className="process-heading">
                                <h2 className="mb-0">Choose Your Goal?</h2>
                                <p className="text-center">( Select Top 3 Goals )</p>
                            </div>

                            <div className="row mx-auto d-flex align-items-center justify-content-center px-5">
                                {goal && goal.map((goals) => {
                                    const imageUrl = goals.image ? getImageURL(goals.image) : '';

                                    return (
                                        <div className="col d-flex align-items-center justify-content-center" key={goals._id}>
                                            <div
                                                className={`item ${selectedGoals.includes(goals._id) ? 'active-item' : ''}`}
                                                onClick={() => toggleGoal(goals._id)}
                                            >
                                                <img src={imageUrl} alt={goals.title} />
                                                <p>{goals.title}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                    <div className="process-footer">
                        <div className="container">
                            <button
                                onClick={nextStep}
                                disabled={selectedGoals.length === 0} // Disable when no goals are selected
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {step === 2 && (
                <div className="step2">
                    <div className="container">
                        <div className="position-sticky">
                            <div className="d-flex justify-content-between">
                                <div></div>
                                <button className='help-btn'><IoMdHelpCircleOutline /> Help</button>
                            </div>
                            <div className="row mt-3 px-5">
                                <div className="col-2"><div className="step "></div></div>
                                <div className="col-2"><div className="step active-step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                            </div>
                        </div>
                    </div>
                    <div className="item-container">
                        <div className="container">
                            <div className="process-heading">
                                <h2 className='mb-5'>Choose Your Age Range?</h2>
                            </div>
                            <div className="age-range-form">
                                {/* Each range box with label, input, and custom radio button */}

                                {ageRange?.map((age, ind) => {
                                    return (
                                        <div className="range-box" onClick={() => handleSelect(age.title)}>
                                            <input
                                                type="radio"
                                                id={`age${ind + 1}`}
                                                name="ageRange"
                                                checked={selectedRange === age.title}
                                                onChange={() => handleSelect(age.title)}
                                            />
                                            <span className="custom-radio"></span>
                                            <label htmlFor={`age${ind + 1}`}>{age.title}</label>
                                        </div>
                                    )
                                })}

                            </div>
                        </div>
                    </div>
                    <div className="process-footer">
                        <div className="container">
                            <div className="d-flex justify-content-between">
                                <button className='back' onClick={prevStep}>Back</button>
                                <button
                                    onClick={nextStep}
                                    disabled={selectedRange === null} // Disable when no goals are selected
                                >
                                    Next
                                </button>                
                           </div>
                        </div>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="step2">
                    <div className="container">
                        <div className="position-sticky">
                            <div className="d-flex justify-content-between">
                                <div></div>
                                <button className='help-btn'><IoMdHelpCircleOutline /> Help</button>
                            </div>
                            <div className="row mt-3 px-5">
                                <div className="col-2"><div className="step "></div></div>
                                <div className="col-2"><div className="step"></div></div>
                                <div className="col-2"><div className="step active-step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                            </div>
                        </div>
                    </div>
                    <div className="item-container">
                        <div className="container">
                            <div className='process-heading'>
                                <h2 className='mb-5' >Are You Recovering From Any Injury?</h2>
                            </div>
                            <div className="injury-permision">
                                <button
                                    className={`permisson-btn ${isActive === 'Yes' ? 'active' : ''}`}
                                    onClick={() => handleClick('Yes')}
                                >
                                    Yes
                                </button>
                                <button
                                    className={`permisson-btn ${isActive === 'No' ? 'active' : ''}`}
                                    onClick={() => handleClick('No')}
                                >
                                    No
                                </button>
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
            )}

            {step === 4 && (
                <div className="step2">
                    <div className="container">
                        <div className="position-sticky">
                            <div className="d-flex justify-content-between">
                                <div></div>
                                <button className='help-btn'><IoMdHelpCircleOutline /> Help</button>
                            </div>
                            <div className="row mt-3 px-5">
                                <div className="col-2"><div className="step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                                <div className="col-2"><div className="step active-step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                                <div className="col-2"><div className="step"></div></div>
                            </div>
                        </div>
                    </div>
                    <div className="item-container">
                        <div className="container">
                            <div className='process-heading'>
                                <h2 className='mb-5'>Do You Have Any Prior Workout
                                    And Yoga Experience?</h2>
                            </div>
                            <div className="injury-permision">
                                {yogaExperiences?.map((exp) => {
                                    return (
                                        <button
                                            className={`permisson-btn ${activeExperience === exp.title ? 'active' : ''}`}
                                            onClick={() => handleButtonClick(exp.title)}
                                        >
                                            {exp.title}
                                        </button>
                                    )
                                })}

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
            )}

            {step === 5 && (
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
                                    timeSlots?.map((slot) => {
                                        const imageUrl = slot.image ? getImageURL(slot.image) : '';

                                        return (
                                            <div className="col">
                                                <div
                                                    className={`item ${activeSlot === slot.title ? 'active-item' : ''}`}
                                                    onClick={() => handleSlotClick(slot.title)}
                                                >
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
            )}

            {step === 6 && (
                <div className="step2">
                    <div className="container">
                        <div className="position-sticky">
                            <div className="d-flex justify-content-between">
                                <div></div>
                                <button className='help-btn'><IoMdHelpCircleOutline /> Help</button>
                            </div>
                            <div className="row mt-3 px-5">
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
                                    budgets?.map((item) => {
                                        const budgetLabel =
                                            (item.minimum === 0 ? 'Under' : item.minimum) +
                                            ' - ' +
                                            (item.maximum === 0 ? 'Above' : item.maximum);

                                        const isActive = activeBudget === budgetLabel;
                                        return (

                                            <button
                                                className={`permisson-btn ${isActive ? 'active' : ''}`}
                                                onClick={() => handleBudgetClick(budgetLabel)}
                                            >
                                                <p>{budgetLabel}</p>
                                                <span style={{fontSize:"14px"}}>{item.shortDescription}</span>
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
                                <button onClick={nextStep}>Show Me My Available Plan</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {step === 7 && (
                <div className="step7">
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
                                    <input type="text" id='name' className='input-field' placeholder='Enter Your Name' />
                                </div>
                                <div className='range-box'>
                                    <input type="text" className='input-field' placeholder='Enter Your Email' />
                                </div>
                                <div className="range-box">
                                    <SelectSearch
                                        options={options}
                                        search

                                    />

                                    <input
                                        type="text"
                                        id="phone-input"
                                        className="phone-input"
                                        placeholder="Type Your Whatsapp Number"
                                    />
                                </div>
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
            )}

            {step === 8 && (
                <div className="step2">
                    <div className="container">
                        <div className="position-sticky">
                            <div className="d-flex justify-content-between">
                                <div></div>
                                <button className='help-btn'><IoMdHelpCircleOutline /> Help</button>
                            </div>
                        </div>
                    </div>
                    <div className="item-container">
                        <div className="container">
                            <div className='process-heading'>
                                <h2 className='mb-0'>Preview</h2>
                                <p className='text-center mb-5'>"Unlocking the Secrets: A Sneak Peek into What’s Next!"</p>
                            </div>
                            <div className="preview">
                                <div className='range-box'>
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <p >Choose Your Goal</p>
                                        <p >Weight Mangement</p>
                                    </div>
                                </div>
                                <div className='range-box'>
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <p >Choose Your Age</p>
                                        <p >30-39</p>
                                    </div>
                                </div>
                                <div className='range-box'>
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <p >Do You Have Any Injury</p>
                                        <p >Yes</p>
                                    </div>
                                </div>
                                <div className='range-box'>
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <p >Do You Have Any Prior Yoga Experience</p>
                                        <p >Yes</p>
                                    </div>
                                </div>
                                <div className='range-box'>
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <p >Time Slots</p>
                                        <p >9AM - 10 AM</p>
                                    </div>
                                </div>
                                <div className='range-box'>
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <p >Budget</p>
                                        <p >5000-10000</p>
                                    </div>
                                </div>
                                <div className='range-box'>
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <p >Name</p>
                                        <p >Rakesh Juel</p>
                                    </div>
                                </div>
                                <div className='range-box'>
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <p >Email id</p>
                                        <p >rakeshjueal2@gmail.com</p>
                                    </div>
                                </div>
                                <div className='range-box'>
                                    <div className="w-100 d-flex align-items-center justify-content-between">
                                        <p >Whatsapp Nuber</p>
                                        <p >947682******</p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center justify-content-center">
                                    <Link to={'/program'}><button className='submit-btn mt-4 mb-4'>Show Me My Customized Plans</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default Process;
