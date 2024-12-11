import React, { useState } from 'react';
import '../assets/css/process.css'
import { IoMdHelpCircleOutline } from "react-icons/io";
import Process1 from '../assets/image/process1.png';
import Process2 from '../assets/image/process2.png';
import Process3 from '../assets/image/process3.png';
import Process4 from '../assets/image/process4.png';
import Process5 from '../assets/image/process5.png';
import Process6 from '../assets/image/process6.png';
import Process7 from '../assets/image/process7.png';
import Process8 from '../assets/image/process8.png';
import Process9 from '../assets/image/process9.png';
import Process10 from '../assets/image/process10.png';
import Process11 from '../assets/image/process11.png';
import Process12 from '../assets/image/process12.png';
import Process13 from '../assets/image/process13.png';
import Process14 from '../assets/image/process14.png';
import Process15 from '../assets/image/process15.png';
import Process16 from '../assets/image/process16.png';
import Process17 from '../assets/image/process17.png';
import Process18 from '../assets/image/process18.png';
import Process19 from '../assets/image/process19.png';
import SunRise from '../assets/image/sun-rises.png';
import Sunny from '../assets/image/sunny.png';
import SunSet from '../assets/image/sunset.png';
import SelectSearch from 'react-select-search';
import { Link } from 'react-router-dom';



const Process = () => {
    const [step, setStep] = useState(1);
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [selectedRange, setSelectedRange] = useState(null);
    const [isActive, setIsActive] = useState('Yes');
    const [activeExperience, setActiveExperience] = useState('Only Yoga Experience');
    const [activeSlot, setActiveSlot] = useState('');
    const [activeBudget, setActiveBudget] = useState('2000 - 3000'); 


    const handleBudgetClick = (budget) => {
        setActiveBudget(budget); // Set the clicked budget as active
    };

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
        setSelectedRange(value); // Set the currently selected range
    };
    const options = [
        {name: '+91 (India)', value: 'sv'},
        {name: '+1 (USA)', value: 'e'},
        {name: '+44 (UK)', value: 'en'},
        {name: '+61 (Australia)', value: 'n'},
        {name: '+81 (Japan)', value: 'een'},

    ];

    // List of goal items
    const goals = [
        { id: 1, text: 'Prental & postnatal yoga', img: Process1 },
        { id: 2, text: 'Weight Management', img: Process2 },
        { id: 3, text: 'Stress Management', img: Process3 },
        { id: 4, text: 'Celeb Training', img: Process4 },
        { id: 5, text: 'Hormonal Health & PCOS', img: Process5 },
        { id: 6, text: 'Senior Citizens', img: Process6 },
        { id: 7, text: 'Therapeutic Issues', img: Process7 },
        { id: 8, text: 'Alignment Correction', img: Process8 },
        { id: 9, text: 'Dancer’s Training', img: Process17 },
        { id: 10, text: 'Advanced Yoga Training', img: Process10 },
        { id: 12, text: 'Toning & Strengthening', img: Process11 },
        { id: 12, text: 'Athletic Training', img: Process12 },
        { id: 13, text: 'Cancer Recovery', img: Process13 },
        { id: 14, text: 'Injury and Surgery Recovery', img: Process14 },
        { id: 15, text: 'Menopausal Aid', img: Process15 },
        { id: 16, text: 'Face Yoga', img: Process16 },
        { id: 17, text: 'Bridal Prep', img: Process1 },
        { id: 18, text: 'Yoga For Conception', img: Process9 },
        { id: 19, text: 'Kids Yoga Training', img: Process18 },
        { id: 20, text: 'Depression And Anxiety Recovery', img: Process19 }
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
                                <button className='help-btn'><IoMdHelpCircleOutline /> Help</button>
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
                            <div className='process-heading'>
                                <h2 className='mb-0'>Choose Your Goal?</h2>
                                <p className='text-center'>( Select Top 3 Goals )</p>
                            </div>

                            <div className="row mx-auto d-flex align-items-center justify-content-center px-5">
                                {goals.map((goal) => (
                                    <div className="col d-flex align-items-center justify-content-center" key={goal.id}>
                                        <div
                                            className={`item ${selectedGoals.includes(goal.id) ? 'active-item' : ''}`}
                                            onClick={() => toggleGoal(goal.id)}
                                        >
                                            <img src={goal.img} alt={goal.text} />
                                            <p>{goal.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="process-footer">
                        <div className="container">
                            <button onClick={nextStep}>Next</button>
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
                                <div className="range-box" onClick={() => handleSelect('Under 16')}>
                                    <input
                                        type="radio"
                                        id="age1"
                                        name="ageRange"
                                        checked={selectedRange === 'Under 16'}
                                        onChange={() => handleSelect('Under 16')}
                                    />
                                    <span className="custom-radio"></span>
                                    <label htmlFor="age1">Under 16</label>
                                </div>

                                <div className="range-box" onClick={() => handleSelect('18-29')}>
                                    <input
                                        type="radio"
                                        id="age2"
                                        name="ageRange"
                                        checked={selectedRange === '18-29'}
                                        onChange={() => handleSelect('18-29')}
                                    />
                                    <span className="custom-radio"></span>
                                    <label htmlFor="age2">18-29</label>
                                </div>

                                <div className="range-box" onClick={() => handleSelect('30-39')}>
                                    <input
                                        type="radio"
                                        id="age3"
                                        name="ageRange"
                                        checked={selectedRange === '30-39'}
                                        onChange={() => handleSelect('30-39')}
                                    />
                                    <span className="custom-radio"></span>
                                    <label htmlFor="age3">30-39</label>
                                </div>

                                <div className="range-box" onClick={() => handleSelect('40-49')}>
                                    <input
                                        type="radio"
                                        id="age4"
                                        name="ageRange"
                                        checked={selectedRange === '40-49'}
                                        onChange={() => handleSelect('40-49')}
                                    />
                                    <span className="custom-radio"></span>
                                    <label htmlFor="age4">40-49</label>
                                </div>

                                <div className="range-box" onClick={() => handleSelect('50-59')}>
                                    <input
                                        type="radio"
                                        id="age5"
                                        name="ageRange"
                                        checked={selectedRange === '50-59'}
                                        onChange={() => handleSelect('50-59')}
                                    />
                                    <span className="custom-radio"></span>
                                    <label htmlFor="age5">50-59</label>
                                </div>

                                <div className="range-box" onClick={() => handleSelect('Above 60')}>
                                    <input
                                        type="radio"
                                        id="age6"
                                        name="ageRange"
                                        checked={selectedRange === 'Above 60'}
                                        onChange={() => handleSelect('Above 60')}
                                    />
                                    <span className="custom-radio"></span>
                                    <label htmlFor="age6">Above 60</label>
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
                                <button
                                    className={`permisson-btn ${activeExperience === 'Only Yoga Experience' ? 'active' : ''}`}
                                    onClick={() => handleButtonClick('Only Yoga Experience')}
                                >
                                    Only Yoga Experience
                                </button>
                                <button
                                    className={`permisson-btn ${activeExperience === 'Only Workout Experience' ? 'active' : ''}`}
                                    onClick={() => handleButtonClick('Only Workout Experience')}
                                >
                                    Only Workout Experience
                                </button>
                                <button
                                    className={`permisson-btn ${activeExperience === 'No Experience' ? 'active' : ''}`}
                                    onClick={() => handleButtonClick('No Experience')}
                                >
                                    No Experience
                                </button>
                                <button
                                    className={`permisson-btn ${activeExperience === 'Experience Of Both' ? 'active' : ''}`}
                                    onClick={() => handleButtonClick('Experience Of Both')}
                                >
                                    Experience Of Both
                                </button>                            </div>

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
                                <div className="col">
                                    <div
                                        className={`item ${activeSlot === '5 AM - 7 AM' ? 'active-item' : ''}`}
                                        onClick={() => handleSlotClick('5 AM - 7 AM')}
                                    >
                                        <img src={SunRise} alt="5 AM - 7 AM" />
                                        <p className='mb-0'>5 AM - 7 AM</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div
                                        className={`item ${activeSlot === '7 AM - 9 AM' ? 'active-item' : ''}`}
                                        onClick={() => handleSlotClick('7 AM - 9 AM')}
                                    >
                                        <img src={SunRise} alt="7 AM - 9 AM" />
                                        <p className='mb-0'>7 AM - 9 AM</p>
                                        <span>Group Available</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div
                                        className={`item ${activeSlot === '9 AM - 12 AM' ? 'active-item' : ''}`}
                                        onClick={() => handleSlotClick('9 AM - 12 AM')}
                                    >
                                        <img src={SunRise} alt="9 AM - 12 AM" />
                                        <p className='mb-0'>9 AM - 12 AM</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div
                                        className={`item ${activeSlot === '12 PM - 3 PM' ? 'active-item' : ''}`}
                                        onClick={() => handleSlotClick('12 PM - 3 PM')}
                                    >
                                        <img src={Sunny} alt="12 PM - 3 PM" />
                                        <p className='mb-0'>12 PM - 3 PM</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div
                                        className={`item ${activeSlot === '3 PM - 5 PM' ? 'active-item' : ''}`}
                                        onClick={() => handleSlotClick('3 PM - 5 PM')}
                                    >
                                        <img src={Sunny} alt="3 PM - 5 PM" />
                                        <p className='mb-0'>3 PM - 5 PM</p>
                                    </div>
                                </div>
                                <div className="col">
                                    <div
                                        className={`item ${activeSlot === '5 PM - 8 PM' ? 'active-item' : ''}`}
                                        onClick={() => handleSlotClick('5 PM - 8 PM')}
                                    >
                                        <img src={SunSet} alt="5 PM - 8 PM" />
                                        <p className='mb-0'>5 PM - 8 PM</p>
                                        <span>Group Available</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <div
                                        className={`item ${activeSlot === '8 PM - 10 PM' ? 'active-item' : ''}`}
                                        onClick={() => handleSlotClick('8 PM - 10 PM')}
                                    >
                                        <img src={SunSet} alt="8 PM - 10 PM" />
                                        <p className='mb-0'>8 PM - 10 PM</p>
                                    </div>
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
                                <button
                                    className={`permisson-btn ${activeBudget === 'Under - 2000' ? 'active' : ''}`}
                                    onClick={() => handleBudgetClick('Under - 2000')}
                                >
                                    <p>Under - 2000</p>
                                    <span>Pre- Recorded Session Available</span>
                                </button>

                                <button
                                    className={`permisson-btn ${activeBudget === '2000 - 3000' ? 'active' : ''}`}
                                    onClick={() => handleBudgetClick('2000 - 3000')}
                                >
                                    <p>2000 - 3000</p>
                                    <span>Personalised diet consultation available</span>
                                </button>

                                <button
                                    className={`permisson-btn ${activeBudget === '3000 - 6000' ? 'active' : ''}`}
                                    onClick={() => handleBudgetClick('3000 - 6000')}
                                >
                                    <p>3000 - 6000</p>
                                    <span>Guided Group Programs Available</span>
                                </button>

                                <button
                                    className={`permisson-btn ${activeBudget === '6000 - 10,000' ? 'active' : ''}`}
                                    onClick={() => handleBudgetClick('6000 - 10,000')}
                                >
                                    <p>6000 - 10,000</p>
                                    <span>Hybrid and Selected PT Programs Available</span>
                                </button>

                                <button
                                    className={`permisson-btn ${activeBudget === '10,000+' ? 'active' : ''}`}
                                    onClick={() => handleBudgetClick('10,000+')}
                                >
                                    <p>10,000+</p>
                                    <span>PT And TrainWithGunj Programs Available</span>
                                </button>

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
