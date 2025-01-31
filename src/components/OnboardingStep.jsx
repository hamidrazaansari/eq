import React from 'react'
import DashboardSidebar from './DashboardSidebar';
import { GoArrowLeft } from "react-icons/go";
import NavBar from './NavBar';
import Footer from './Footer';
function OnboardingStep() {
    return (
        <div >
            <div className='trainer'>
                <NavBar />
                <div className='myTrainer'>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="item-container" style={{marginTop:"100px" , overflow:"hidden"}}>
                                    <div className="container">
                                        <div className='process-heading'>
                                            <h2 className='mb-0'>Preview</h2>
                                        </div>
                                        <div className="preview">
                                            <div className='range-box'>
                                                <div className="w-100 d-flex align-items-center justify-content-between">
                                                    <p >Book The Time Slot</p>
                                                    <button>Done</button>

                                                </div>
                                            </div>
                                            <div className='range-box'>
                                                <div className="w-100 d-flex align-items-center justify-content-between">
                                                    <p >LMC</p>
                                                    <button>Done</button>
                                                </div>
                                            </div>
                                            <div className='range-box'>
                                                <div className="w-100 d-flex align-items-center justify-content-between">
                                                    <p >Download Onboarding PDF</p>
                                                    <button>Done</button>
                                                </div>
                                            </div>
                                            <div className='range-box'>
                                                <div className="w-100 d-flex align-items-center justify-content-between">
                                                    <p >CHC Call</p>
                                                    <button>Done</button>
                                                </div>
                                            </div>
                                            <div className='range-box'>
                                                <div className="w-100 d-flex align-items-center justify-content-between">
                                                    <p >Call With Nutritionist</p>
                                                    <button>Done</button>

                                                </div>
                                            </div>
                                            <div className='range-box'>
                                                <div className="w-100 d-flex align-items-center justify-content-between">
                                                    <p >Welcome Call With Gunj</p>
                                                    <button>Done</button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>

        </div>
    )
}

export default OnboardingStep