import React , {useEffect , useState} from 'react';
import Booking from '../assets/image/booking.png';
import User from '../assets/image/user.png';
import Coach from '../assets/image/coach.png';
import Support from '../assets/image/support.png';
import Exit from '../assets/image/exit.png';
import '../assets/css/dashboard.css';
import { Link } from 'react-router-dom';
import { useIsLogin } from '../context/Authcontext';


import { useNavigate, useLocation } from 'react-router-dom';

function DashboardSidebar() {
   const { setIsLogin } = useIsLogin();
    const navigate = useNavigate();
    const location = useLocation();
      
    const handleLogout = () => {
      setIsLogin(false);
      localStorage.removeItem("authToken");
      navigate("/signin");
    };
  return (
    <div className="sidbar">
      <ul>
        <Link to={'/myProfile'}>
        <li className={location.pathname === '/myProfile' ? 'active' : ''}>
          <img src={User} alt="" />
          <p>My Profile</p>
        </li>
        </Link>

        <Link to={'/mybooking'}>
        <li className={location.pathname === '/mybooking' ? 'active' : ''}>
        <img src={Booking} alt="" />
        <p>My Bookings</p>
        </li>
        </Link>
        <Link to={'/myTrainer'}>
        <li className={location.pathname === '/myTrainer' ? 'active' : ''}>
        <img src={Coach} alt="" />
        <p>My Trainer</p>
        </li>
        </Link>
        <Link to={'/myLinks'}>
        <li className={location.pathname === '/myLinks' ? 'active' : ''}>
        <img src={Booking} alt="" />
        <p>My Links</p>
        </li>
        </Link>
        
        <li
        >
          <img src={Support} alt="" />
          <p>Help & Support</p>
        </li>

        <li onClick={handleLogout}>
          <img src={Exit} alt="exit" />
          <p>Logout</p>
        </li>
      </ul>
    </div>
  );
}

export default DashboardSidebar;
