import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/image/logo.png'
import '../assets/css/NavBar.css'
import AccountImg from '../assets/image/user.png'
import { useIsLogin } from '../context/Authcontext'
import { API_URL } from '../utills/BaseUrl'
import { FaBarsStaggered } from "react-icons/fa6";
import axios from 'axios'
import CategoryMenuDropdown from './CategoryMenuDropdown';
import { TfiMenu } from "react-icons/tfi";


function NavBar() {
  const [profile, setProfile] = useState('');

  const { isLogin } = useIsLogin()

  const token = localStorage.getItem('authToken');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL}/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setProfile(response.data.body);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    }
    fetchData();
  }, [token]);


  return (
    <div>
      <nav class="navbar navbar-expand-lg  fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={'/'}>
            <img src={Logo} alt="Eqilim logo" />
          </Link>

          <div class="offcanvas offcanvas-end" tabIndex="-1" id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="nav-link active" aria-current="page"  >Home</button>
              </li>
              <li className="nav-item">
                <CategoryMenuDropdown />
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/tolktoexpert'}>Talk To A Yoga Expert</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/'}>Corporate Wellness</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={'/faq'}>FAQ</Link>
              </li>

            </ul>
          </div>
          <Link to={'/signup'}><button className={`signup-btn ${isLogin ? 'd-none' : 'd-block'} me-0`} type="submit">Sign Up</button></Link>
          <Link to={'/myProfile'}><button className={`account ${isLogin ? 'd-block' : 'd-none'} `} type="submit"><img src={AccountImg} alt="usser" />  <span>{profile.firstName}</span> </button></Link>

          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg" aria-controls="navbarOffcanvasLg" aria-label="Toggle navigation">
            <TfiMenu />
          </button>
        </div>
      </nav>
    </div>
  )
}

export default NavBar