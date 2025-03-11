import React , {useState} from 'react'
import DashboardSidebar from './DashboardSidebar';
import { GoArrowLeft } from "react-icons/go";
import NavBar from './NavBar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";

function ImportantLinks() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div>
            <div className='trainer'>
                <NavBar />
                <div className='myTrainer'>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 ">
                                <DashboardSidebar isActive={"MyProfile"} handleClose={handleClose} show={show} />
                            </div>
                            <div className="col-lg-9">
                                <div className="header d-flex justify-content-between align-items-center">
                                    <h2>
                                        <GoArrowLeft onClick={() => navigate(-1)} /> My Booking
                                    </h2>
                                    <button onClick={handleShow} className='sidebar-menu'><BsThreeDotsVertical /></button>
                                </div>
                                <div className="my-Links">
                                    <button onClick={() => navigate('/onboarding-registration')} style={{ backgroundColor: "#FBFFE9" }}>Onboarding Registration Form</button>
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