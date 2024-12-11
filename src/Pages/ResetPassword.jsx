import React, { useState } from 'react';
import SignImage from '../assets/image/signin-image.png';
import '../assets/css/signin.css';
import LogoImg from '../assets/image/logo.png';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from 'axios';
import { Link, useNavigate , useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../utills/BaseUrl';


function ResetPassword() {
    const [newpasswordVisible, setNewPasswordVisible] = useState(false);
    const [confpasswordVisible, setConfPasswordVisible] = useState(false);
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [loading , setLoading] = useState(false)
    const location = useLocation();

    const navigate = useNavigate()

    const togglenewPasswordVisibility = () => {
        setNewPasswordVisible(!newpasswordVisible);
      };
    const toggleConfPasswordVisibility = () => {
        setConfPasswordVisible(!confpasswordVisible);
      };

      const token = location.state?.token;
      console.log(token)
      const handleUpdatePass = async (e) => {
        e.preventDefault()
        setLoading(true)
      
        try {
          const response = await axios.put(
            `${API_URL}/users/createNewPassword`,
            {password , cPassword},
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            }
          );
            toast.success(response.data.message)
            setTimeout(()=>{
              navigate( -1, { replace: true });
            }, 800)

        } catch (error) {
          // Log full error details
          console.error('Error:', error);
          if (error.response) {
            console.error('Server responded with status:', error.response.status);
            console.error('Response data:', error.response.data);
            setIsLogin(false)
          }
        }
      };
    

  return (
    <div>
    <div className="signin">
      <ToastContainer />
      <div className="logo">
        <img src={LogoImg} alt="" />
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 p-0 signin-image">
            <img src={SignImage} alt="signin" />
          </div>
          <div className="col-6 p-0 d-flex align-items-center justify-content-center">
            <div className="reset-Pasword">
              <h2>Reset Password</h2>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              <form onSubmit={handleUpdatePass}  className="d-flex align-items-center justify-content-center flex-column">
                <div className="input">
                  <label htmlFor="pass">
                  New Password <span>*</span>
                  </label>
                  <input
                    type={newpasswordVisible ? "text" : "password"}
                    id="pass"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={togglenewPasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "45%",
                      cursor: "pointer",
                    }}
                  >
                    {newpasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <div className="input">
                  <label htmlFor="cpass">
                   Confirm Password <span>*</span>
                  </label>
                  <input
                    type={confpasswordVisible ? "text" : "password"}
                    id="cpass"
                    className="input-field"
                    value={cPassword}
                    onChange={(e) => setCPassword(e.target.value)}
                  />
                  <span
                    onClick={toggleConfPasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "45%",
                      cursor: "pointer",
                    }}
                  >
                    {confpasswordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                <button type='submit'>Update Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ResetPassword