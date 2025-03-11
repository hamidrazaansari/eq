import React, { useEffect, useState } from 'react'
import TrainerProfile from '../assets/image/trainer-profile.png'
import '../assets/css/dashboard.css'
import { IoMdStar } from "react-icons/io";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import getImageURL from '../utills/getImageURL';
import DashboardSidebar from './DashboardSidebar';
import { GoArrowLeft } from "react-icons/go";
import NavBar from './NavBar';
import Footer from './Footer';
import { FaUserSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { BsThreeDotsVertical } from "react-icons/bs";



function MyTrainer() {
  const [data, setData] = useState('')
          const [show, setShow] = useState(false);
      
          const handleShow = () => setShow(true);
          const handleClose = () => setShow(false);
      
          const navigate = useNavigate()

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

  return (
    <>

      {data && data.every(item => item.trainer === null) ? (
        <div className='trainer'>
          <NavBar />
          <div className='myTrainer'>
            <div className="container">
              <div className="row">
              <div className="col-lg-3">
                        <DashboardSidebar isActive="MyProfile" handleClose={() => setShow(false)} show={show} />
                    </div>
                    <div className="col-lg-9">
                        <div className="header d-flex justify-content-between align-items-center">
                            <h2>
                                <GoArrowLeft onClick={() => navigate(-1)} /> My Trainer
                            </h2>
                            <button onClick={() => setShow(true)} className='sidebar-menu'>
                                <BsThreeDotsVertical />
                            </button>
                        </div>
                  <div className="noTrainer">
                    <FaUserSlash />
                    <h2>Trainer Not Assigned Yet</h2>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
        data && data.map((item) => {
          const imageUrl = item.trainer?.profilePhoto ? getImageURL(item.trainer?.profilePhoto) : '';

          return (
            item.trainer && (
              <div className='trainer'>
                <NavBar />
                <div className="myTrainer">
                  <div className="container">
                    <div className="row">
                    <div className="col-lg-3 ">
                        <DashboardSidebar isActive={"MyProfile"} handleClose={handleClose} show={show} />
                    </div>
                    <div className="col-lg-9">
                        <div className="header d-flex justify-content-between align-items-center">
                            <h2>
                                <GoArrowLeft onClick={()=>navigate(-1)} /> My Trainers
                            </h2>
                            <button onClick={handleShow} className='sidebar-menu'><BsThreeDotsVertical/></button>
                        </div>
                        <div className="trainer-banner">
                          <Link to={`/trainer-details/${item.trainer?._id}`}>
                            <div className="banner-header">
                              <img src={imageUrl} alt={item.trainer?.name} />
                              <h2>{item.trainer?.name}</h2>
                              <p>{item.trainer?.bio} </p>
                            </div>
                            <div className="banner-footer">
                              {/* <button><span>5<IoMdStar /></span> 52 People Coached</button> */}
                            </div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Footer />
              </div>
            )
          );
        })
      )}
    </>
  )
}

export default MyTrainer