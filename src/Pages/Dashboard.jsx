import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import NavBar from '../components/NavBar';
import MyTrainer from '../components/MyTrainer';
import MyBooking from '../components/MyBooking';
import MyProfile from '../components/MyProfile';
import { useIsLogin } from '../context/Authcontext';
import { GoArrowLeft } from "react-icons/go";
import '../assets/css/dashboard.css';
import DashboardSidebar from '../components/DashboardSidebar';

function Dashboard() {
  const [activeSection, setActiveSection] = useState('');
  const { setIsLogin } = useIsLogin();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const section = location.state?.section || 'My Profile';
    setActiveSection(section);
  }, [location.state]);

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.removeItem("authToken");
    navigate("/signin");
  };

  return (
    <>
      <ToastContainer />
      <NavBar />
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-3">
              <DashboardSidebar
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                handleLogout={handleLogout}
              />
            </div>
            <div className="col-9">
              <div className="header">
                <h2>
                  <GoArrowLeft /> {activeSection}
                </h2>
              </div>
              <div className="content">
                {activeSection === 'My Profile' && <MyProfile />}
                {activeSection === 'My Trainer' && <MyTrainer />}
                {activeSection === 'My Bookings' && <MyBooking />}
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
