import React, { useEffect, useState } from 'react'
import '../assets/css/dashboard.css'
import TrainerProfile from '../assets/image/trainer-profile.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import parse from 'html-react-parser'
import moment from 'moment';
import NavBar from './NavBar';
import Footer from './Footer';
import { useParams } from 'react-router-dom';
import DashboardSidebar from '../components/DashboardSidebar'
import OnboardingModal from './OnboardingModal';

function MyBookingDetails() {
    const [data, setData] = useState('')
    const [needRefresh, setNeedRefresh] = useState(false);
    const token = localStorage.getItem('authToken');

    const { id } = useParams()

    const handleNeedRefresh = ()=>{
        setNeedRefresh((old)=> !old)
    }

    console.log(needRefresh);
    
    // Fetch profile data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${API_URL}/bookings/myBookings/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setData(response.data?.body);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }
        fetchData();
    }, [needRefresh]);
    

    return (
        <div className='booking-details'>
            <OnboardingModal apiData={data} handleNeedRefresh={handleNeedRefresh}/>
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <DashboardSidebar
                        />
                    </div>
                    <div className="col-9">
                        <div className='my-booking mt-5 py-5'>
                            <div className="container ">
                                <div className="header my-3 mt-4" >
                                    <div>
                                        <h2>{data.program?.name}</h2>
                                        <p className='maincategory'>{data.category?.name}</p>
                                        <p >Booking Date: <span> {moment(data.activatioDate?.activatioDate).format('DD-MM-YYYY')}</span></p>
                                        {/* <p >Expire in: <span className='text-danger'> 20Days</span></p> */}
                                        <div className="d-flex align-items-center">
                                            <p className='me-1'>Status: </p>
                                            {data.bookingStatus === "BOOKED" ? <span className='text-success  status-button'>Booked</span> : data.bookingStatus === "CANCELLED" ? <span className=' text-danger'>Cancelled</span> : data.bookingStatus === "EXPIRED" ? <span className=' text-secondary'>Expired</span> : data.bookingStatus === "ACTIVE" ? <span >Active</span> : ''}
                                        </div>

                                    </div>
                                    <div className='d-flex align-items-end justify-content-end flex-column '>
                                        <h3>₹{data.totalAmount}</h3>
                                        <button className='mb-2'>{data.plan?.name}</button>
                                    </div>
                                </div>
                                <div className="booking-info">
                                    <div class="row">
                                        <div className="col-lg-3">
                                            <div className="features-box" style={{ backgroundColor: "#FBFFE9" }}>
                                                <h2>Onboarding</h2>
                                                <p className='text-success'>Done</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="features-box" style={{ backgroundColor: "#E9F7FF" }}>
                                                <h2>Group Sessions</h2>
                                                <p>{data.groupSession}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="features-box" style={{ backgroundColor: "#FFF7E9" }}>
                                                <h2>PT Sessions</h2>
                                                <p>{data.ptSession}</p>
                                            </div>
                                        </div>
                                        <div className="col-lg-3">
                                            <div className="features-box" style={{ backgroundColor: "#FFE9E9" }}>
                                                <h2>Plan Duration</h2>
                                                <p>{data.planDuration}</p>
                                            </div>
                                        </div>

                                        <div className="col-4">
                                            <div className="status-box">
                                                <h2>Status</h2>
                                                {data.bookingStatus === "BOOKED" ? <button>Booked</button> : data.bookingStatus === "CANCELLED" ? <button className='bg-danger text-light'>Cancelled</button> : data.bookingStatus === "EXPIRED" ? <button className='bg-secondary text-light'>Expired</button> : data.bookingStatus === "ACTIVE" ? <button >Active</button> : ''}
                                            </div>
                                            {data.trainer === null ?
                                                <>
                                                    <div className="status-box">
                                                        <h2>Trainer</h2>
                                                        <button className='bg-secondary text-light'>Not Assigned</button>
                                                    </div>
                                                </> :
                                                <div className="Trainer-box">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h2>Trainer</h2>
                                                        <button>Assigned</button>
                                                    </div>
                                                    <div className="d-flex align-items-start mt-3">
                                                        <img src={TrainerProfile} alt="trainer  Profile" />
                                                        <div>
                                                            <h3>{data.trainer?.name}</h3>
                                                            <p>{data.trainer?.bio}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                            }

                                            <div className="program-date">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <div style={{ borderRight: "2px solid #00000087", marginRight: "20px", paddingRight: "20px", textAlign: "center" }}>
                                                        <h2>Booking Date </h2>
                                                        <p>{moment(data.createdAt?.createdAt).format('DD-MM-YYYY')}</p>
                                                    </div>
                                                    <div style={{ textAlign: "center" }} >
                                                        <h2>Activation Date </h2>
                                                        <p>{data.activatioDate === null ? 'Not Set' : moment(data.activatioDate).format('DD-MM-YYYY')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <Tabs
                                                defaultActiveKey="profile"
                                                id="uncontrolled-tab-example"
                                                className="mb-3"
                                            >
                                                <Tab eventKey="home" title="Features">
                                                    <div className="prepration">
                                                        {
                                                            data.programPlan?.features
                                                                ? parse(data.programPlan.features)
                                                                : "No features available"
                                                        }
                                                    </div>
                                                </Tab>
                                                <Tab eventKey="profile" title="Invoice">
                                                    <div className="pricing">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <p>Personalized Training Program</p>
                                                            <p>₹{data.salePrice}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center ">
                                                            <p>Suscription</p>
                                                            <p>₹{data.subscriptionDiscountAmount}</p>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center ">
                                                            <p>Discount</p>
                                                            <p>Nil</p>
                                                        </div>
                                                        <hr />
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <h5>Sub Total</h5>
                                                            <h5>₹{data.totalAmount}</h5>
                                                        </div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <p>Tax & Fees</p>
                                                            <p>0.00</p>
                                                        </div>
                                                        <hr />
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <h5>Total Amount</h5>
                                                            <h5>₹{data.totalAmount}</h5>
                                                        </div>
                                                    </div>
                                                </Tab>

                                            </Tabs>
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

    )
}

export default MyBookingDetails