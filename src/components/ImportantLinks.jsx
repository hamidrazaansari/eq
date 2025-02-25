import React from 'react'
import DashboardSidebar from './DashboardSidebar';
import { GoArrowLeft } from "react-icons/go";
import NavBar from './NavBar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';

function ImportantLinks() {
    const navigate = useNavigate()
    return (
        <div>
            <div className='trainer'>
                <NavBar />
                <div className='myTrainer'>
                    <div className="container">
                        <div className="row">
                            <div className="col-3">
                                <DashboardSidebar />
                            </div>
                            <div className="col-9">
                                <div className="header">
                                    <h2>
                                        <GoArrowLeft /> My Links
                                    </h2>
                                </div>
                                <div className="my-Links">
                                    <button onClick={()=> navigate('/onboarding-registration')} style={{ backgroundColor: "#FBFFE9" }}>Onboarding Registration Form</button>
                                    {/* <button onClick={()=> navigate('/booking-time-slot')}  style={{ backgroundColor: "#E9F7FF" }}>Booking Time Slot</button>
                                    <button onClick={()=> navigate('/onboarding-step')} style={{ backgroundColor: "#FFF7E9" }}>Onboarding Steps</button> */}
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

export default ImportantLinks