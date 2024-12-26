import React, { useState } from 'react'
import { IoMdHelpCircleOutline } from "react-icons/io";
import { useLocation , useNavigate } from 'react-router-dom'; 


function Injury() {
    const [isInjured , setInjured] = useState(true)
    const location = useLocation();
    const goals = location.state?.goalIds
    const ageRange = location.state?.selectedRange

    const navigate = useNavigate()
    
    const prevStep = ()=>{
        navigate('/agerange')

    }
    const nextStep = ()=>{
        navigate('/experience' , {state:{goals ,ageRange ,isInjured }})
    }
    
    const handleClick = (value) => {
        setInjured(value); 
    };
    return (
        <div>
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
                                className={`permisson-btn ${isInjured === true ? 'active' : ''}`}
                                onClick={()=>handleClick(true)}
                            >
                                Yes
                            </button>
                            <button
                                className={`permisson-btn ${isInjured === false ? 'active' : ''}`}
                                onClick={()=>handleClick(false)}

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
        </div>
    )
}

export default Injury