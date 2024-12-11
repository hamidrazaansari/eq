import React, { useEffect, useState } from 'react'
import '../assets/css/dashboard.css'
import TrainerProfile from '../assets/image/trainer-profile.png'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import parse from 'html-react-parser'
import moment from 'moment';



function MyBooking() {
    const [data, setData] = useState('')
    const token = localStorage.getItem('authToken');

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
  console.log(data);
  

    return (
        <div>
            <div className="my-booking">
                <div class="accordion" id="accordionExample">
                    {data && data.map((order , index)=>{
                        return(
                            <div className="accordion-item" key={index}>
                            <h2 className="accordion-header" id={`heading${index}`}>
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
                                            <p  className='maincategory'>{order.category?.name}</p>
                                            <p >Start From: <span> {moment(order.activatioDate?.activatioDate).format('DD-MM-YYYY')}</span></p>
                                            <p >Expire in: <span className='text-danger'> 20Days</span></p>

                                        </div>
                                        <div  className='d-flex align-items-end justify-content-end flex-column '>
                                        <h3>₹{order.totalAmount}</h3>
                                            <button className='mb-2'>{order.plan?.name}</button>
                                        </div>
                                    </div>
                                </button>
                            </h2>
                            <div
                                id={`collapse${index}`} // Unique id for each item's collapse
                                className="accordion-collapse collapse" // No "show" class by default
                                aria-labelledby={`heading${index}`}
                                data-bs-parent="#accordionExample"
                            >                                <div class="accordion-body">
    
                                    <div className="booking-info">
                                        <div class="row">
                                            <div className="col-lg-3">
                                                <div className="features-box" style={{ backgroundColor: "#FBFFE9" }}>
                                                    <h2>Class Format</h2>
                                                    <p>Online</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="features-box" style={{ backgroundColor: "#E9F7FF" }}>
                                                    <h2>Group Sessions</h2>
                                                    <p>{order.groupSession}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="features-box" style={{ backgroundColor: "#FFF7E9" }}>
                                                    <h2>PT Sessions</h2>
                                                    <p>{order.ptSession}</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-3">
                                                <div className="features-box" style={{ backgroundColor: "#FFE9E9" }}>
                                                    <h2>Plan Duration</h2>
                                                    <p>{order.planDuration}</p>
                                                </div>
                                            </div>
    
                                            <div className="col-4">
                                                <div className="status-box">
                                                    <h2>Status</h2>
                                                    {order.bookingStatus === "BOOKED" ?<button>Booked</button> : order.bookingStatus === "CANCELLED" ? <button className='bg-danger text-light'>Cancelled</button> : order.bookingStatus === "EXPIRED" ? <button className='bg-secondary text-light'>Expired</button> : order.bookingStatus === "ACTIVE" ? <button >Active</button> :'' }
                                                    
                                                </div>
                                                <div className="Trainer-box">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <h2>Trainer</h2>
                                                        <button>Assigned</button>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <img src={TrainerProfile} alt="trainer  Profile" />
                                                        <div>
                                                            <h3>Gunjan Kamra</h3>
                                                            <p>Certified Yoga Teacher </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="program-date">
                                                    <div className="d-flex align-items-center justify-content-center">
                                                        <div style={{ borderRight: "2px solid #00000087", marginRight: "20px", paddingRight: "20px", textAlign: "center" }}>
                                                            <h2>Booking Date </h2>
                                                            <p>02-11-24</p>
                                                        </div>
                                                        <div style={{ textAlign: "center" }} >
                                                            <h2>Expiry Date </h2>
                                                            <p>02-11-24</p>
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
                                                          {parse(order.programPlan?.features)}
                                                        </div>
                                                    </Tab>
                                                    <Tab eventKey="profile" title="Invoice">
                                                        <div className="pricing">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <p>Personalized Training Program</p>
                                                                <p>₹{order.salePrice}</p>
                                                            </div>
                                                            <div className="d-flex justify-content-between align-items-center ">
                                                                <p>Suscription</p>
                                                                <p>₹{order.subscriptionDiscountAmount}</p>
                                                            </div>
                                                            {/* <div className="d-flex justify-content-between align-items-center ">
                                                                <p>Discount</p>
                                                                <p>Nil</p>
                                                            </div> */}
                                                            <hr />
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <h5>Sub Total</h5>
                                                                <h5>₹{order.totalAmount}</h5>
                                                            </div>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <p>Tax & Fees</p>
                                                                <p>0.00</p>
                                                            </div>
                                                            <hr />
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <h5>Total Amount</h5>
                                                                <h5>₹{order.totalAmount}</h5>
                                                            </div>
                                                        </div>
                                                    </Tab>
    
                                                </Tabs>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
    
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-6">
    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )

                    })}
                </div>



            </div>
        </div>
    )
}

export default MyBooking