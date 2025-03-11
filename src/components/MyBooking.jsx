import React, { useEffect, useState } from 'react'
import '../assets/css/dashboard.css'
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import moment from 'moment';
import { Link } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';

import { GoArrowLeft } from "react-icons/go";
import Footer from './Footer';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";


function MyBooking() {
    const [data, setData] = useState('')
    const token = localStorage.getItem('authToken');
        const [show, setShow] = useState(false);
    
        const handleShow = () => setShow(true);
        const handleClose = () => setShow(false);
    
        const navigate = useNavigate()

    // Fetch profile data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${API_URL}/bookings/myBookings`, {
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
    }, []);


    return (
        <div className='myBookingMain'>
            <NavBar/>
            <div className="container">
                <div className="row">
                <div className="col-lg-3 ">
                        <DashboardSidebar isActive={"MyProfile"} handleClose={handleClose} show={show} />
                    </div>
                    <div className="col-lg-9">
                        <div className="header d-flex justify-content-between align-items-center">
                            <h2>
                                <GoArrowLeft onClick={()=>navigate(-1)} /> My Booking
                            </h2>
                            <button onClick={handleShow} className='sidebar-menu'><BsThreeDotsVertical/></button>
                        </div>
                        <div className="my-booking">
                            {data && data.map((order, index) => {
                                return (
                                    <Link className="accordion-header" id={`heading${index}`} to={`booking-details/${order._id}`}>
                                        <button
                                            className="accordion-button collapsed" // Add "collapsed" class to collapse by default
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${index}`} // Unique target for each item
                                            aria-expanded="false" // Set expanded to false
                                            aria-controls={`collapse${index}`}
                                        >
                                            <div className="header">
                                                <div>
                                                    <h2>{order.program?.name}</h2>
                                                    <p className='maincategory'>{order.category?.name}</p>
                                                    <p >Booking Date: <span> {moment(order.activatioDate?.activatioDate).format('DD-MM-YYYY')}</span></p>
                                                    <p>Plan : {order.plan?.name}</p>
                                                    {/* <p >Expire in: <span className='text-danger'> 20Days</span></p> */}
                                                    <div className="d-flex align-items-center">
                                                        <p className='me-1'>Status: </p>
                                                        {order.bookingStatus === "BOOKED" ? <span className='text-success  status-button'>Booked</span> : order.bookingStatus === "CANCELLED" ? <span className=' text-danger'>Cancelled</span> : order.bookingStatus === "EXPIRED" ? <span className=' text-secondary'>Expired</span> : order.bookingStatus === "ACTIVE" ? <span  style={{color:"#f9b115"}}>Active</span> : ''}
                                                    </div>

                                                </div>
                                                <div className='d-flex align-items-end justify-content-lg-end  flex-column '>
                                                    <h3>₹{order.totalAmount}</h3>

                                                    <button className='mb-2'>View Details</button>
                                                </div>
                                            </div>
                                        </button>
                                    </Link>
                                )

                            })}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default MyBooking