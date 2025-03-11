import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { IoMdHelpCircleOutline } from "react-icons/io";


function BuildPlanDetails() {
    const location = useLocation()
    const navigate = useNavigate()
    const leadData = location.state?.buildePlan;
    console.log(leadData);

    const handleSubmit = () =>{
        navigate('/customized-plans', {state:{leadData}});
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
                                    <p >{leadData?.goals?.map((item)=>(
                                        <>
                                        {item.title}
                                        </>
                                    ))}</p>
                                </div>
                            </div>
                            <div className='range-box'>
                                <div className="w-100 d-flex align-items-center justify-content-between">
                                    <p >Choose Your Age</p>
                                    <p >{leadData.ageRange?.title}</p>
                                </div>
                            </div>
                            <div className='range-box'>
                                <div className="w-100 d-flex align-items-center justify-content-between">
                                    <p >Do You Have Any Injury</p>
                                    <p >{leadData.isInjured ? 'Yes' : 'No'}</p>
                                </div>
                            </div>
                            <div className='range-box'>
                                <div className="w-100 d-flex align-items-center justify-content-between">
                                    <p >Do You Have Any Prior Yoga Experience</p>
                                    <p className='text-end'>{leadData.yogaExperience?.title}</p>
                                </div>
                            </div>
                            <div className='range-box'>
                                <div className="w-100 d-flex align-items-center justify-content-between">
                                    <p >Time Slots</p>
                                    <p >{leadData.timeSlot?.title}</p>
                                </div>
                            </div>
                            <div className='range-box'>
                                <div className="w-100 d-flex align-items-center justify-content-between">
                                    <p >Budget</p>
                                    <p >{leadData.budget?.minimum} - {leadData.budget?.maximum}</p>
                                </div>
                            </div>
                            <div className='range-box'>
                                <div className="w-100 d-flex align-items-center justify-content-between">
                                    <p >Name</p>
                                    <p >{leadData.name}</p>
                                </div>
                            </div>
                            <div className='range-box'>
                                <div className="w-100 d-flex align-items-center justify-content-between">
                                    <p >Email id</p>
                                    <p >{leadData.email}</p>
                                </div>
                            </div>
                            <div className='range-box'>
                                <div className="w-100 d-flex align-items-center justify-content-between">
                                    <p >Whatsapp Nuber</p>
                                    <p >{leadData.mobile}</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <button className='submit-btn mt-4 mb-4' onClick={handleSubmit}>Show Me My Customized Plans</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuildPlanDetails