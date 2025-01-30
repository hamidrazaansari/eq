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



function MyTrainer() {
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

  return (

    data && data.map((item) => {
      const imageUrl = item.trainer?.profilePhoto ? getImageURL(item.trainer?.profilePhoto) : '';

      if (item.trainer === null) {
        return (' ')
      }
      else {
        return (
          <div className='trainer'>
            <NavBar/>
          <div className="myTrainer">
            <div className="container">
              <div className="row">
                <div className="col-3">
                  <DashboardSidebar />
                </div>
                <div className="col-9">
                  <div className="header">
                    <h2>
                      <GoArrowLeft /> My Trainers
                    </h2>
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
          <Footer/>
          </div>

        )
      }

    })

  )
}

export default MyTrainer