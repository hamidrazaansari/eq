import React, { useState , useEffect } from 'react';
import Booking from '../assets/image/booking.png';
import User from '../assets/image/user.png';
import Coach from '../assets/image/coach.png';
import Support from '../assets/image/support.png';
import Exit from '../assets/image/exit.png';
import NavBar from '../components/NavBar';
import '../assets/css/dashboard.css';
import { GoArrowLeft } from "react-icons/go";
import MyTrainer from '../components/MyTrainer';
import MyBooking from '../components/MyBooking';
import { useIsLogin } from '../context/Authcontext';
import MyProfile from '../components/MyProfile';
import { useNavigate , useLocation } from 'react-router-dom';
import { toast , ToastContainer } from 'react-toastify';

function Dashboard() {
  // State to track the active sidebar item
  const [activeSection, setActiveSection] = useState('');

  const {setIsLogin} = useIsLogin()
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const section = location.state?.section || 'My Profile';
    setActiveSection(section);
  }, [location.state]);

  // Handle user logout
  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem("authToken"); // Clear token from storage
      navigate("/signin"); 
  };

  return (
    <>
    <ToastContainer/>
      <NavBar />
      <div className='dahboard'>
        <div className="container">
          <div className="row">
            <div className="col-3">
              <div className="sidbar">
                <ul>
                <li
                    className={activeSection === 'My Profile' ? 'active' : ''}
                    onClick={() => setActiveSection('My Profile')}
                  >
                    <img src={User} alt="" />
                    <p>My Profile</p>
                  </li>

                  <li
                    className={activeSection === 'My Bookings' ? 'active' : ''}
                    onClick={() => setActiveSection('My Bookings')}
                  >
                    <img src={Booking} alt="" />
                    <p>My Bookings</p>
                  </li>

                  <li
                    className={activeSection === 'My Trainer' ? 'active' : ''}
                    onClick={() => setActiveSection('My Trainer')}
                  >
                    <img src={Coach} alt="" />
                    <p>My Trainer</p>
                  </li>
                  <li
                    className={activeSection === 'Help & Support' ? 'active' : ''}
                    onClick={() => setActiveSection('Help & Support')}
                  >
                    <img src={Support} alt="" />
                    <p>Help & Support</p>
                  </li>
                  <li onClick={()=> handleLogout()}>
                    <img src={Exit} alt="" />
                    <p>Logout</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-9">
              <div className="header">
                <h2> <GoArrowLeft /> {activeSection}</h2>
              </div>
              {/* Dynamic Content Rendering */}
              <div className="content">
                {activeSection === 'My Profile' && (
                  <MyProfile/>
                )}

                {activeSection === 'My Trainer' && (
                  <div>
                    <MyTrainer/>
                  </div>
                )}

                {activeSection === 'My Bookings' && (
                  <div>
                   <MyBooking/>
                  </div>
                )}

                {activeSection === 'Help & Support' && (
                  <div>
                    <h3>Help & Support</h3>
                    <p>Reach out to us for assistance.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </>
  );
}

export default Dashboard;
