import React, { useState } from 'react'
import SignImage from '../assets/image/signin-image.png'
import google from '../assets/image/google.png'
import '../assets/css/signin.css'
import LogoImg from '../assets/image/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { API_URL } from '../utills/BaseUrl'



function Forgot() {
  const [email, setEmail] = useState('');
  const [loading  , setLoading] = useState(false);

const navigate = useNavigate();

//   const togglePasswordVisibility = () => {
//     setPasswordVisible(!passwordVisible);
//   };

  const handleForgot = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/users/findAccount`, { email });
      if (response.status === 200) {
        toast.success('OTP has been sent to your Email ');
        // Navigate to OTP page and pass the email
        setTimeout(()=>{
          navigate('/otp', { state: { email, purpose: "verifyOTP" }, replace: true });
        } , 800)
      }
      
      // Success alert
    } catch (error) {

      if (error.response && error.response.data.errors) {
        const errorData = error.response.data.errors;
        // Se specific errors for each field
        console.log(errorData);
      } 
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className='signin'>
      <ToastContainer />
      <div className="logo">
        <img src={LogoImg} alt="" />
      </div>
      <div className="container-fluid">

        <div className="row">
          <div className="col-6 p-0 signin-image">
            <img src={SignImage} alt="yoga imag" />
          </div>
          <div className="col-6 p-0 d-flex align-items-center justify-content-center">
            <div className="sign-in">

              <div className="input">
              <h2>Forgot Password?</h2>
              <p className='my-4'>Enter the email address you used when you joined and we`ll send
              you instructions to reset your password.</p>
              <p className='mb-4'>For security reasons, we do NOT store your password. So rest
              assured that we will never send your password via email.</p>
                <label htmlFor="email">Email address <span>*</span></label>
                <input type="email" id='email' className='input-field' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                {/* {errors.email && <div style={{ color: 'red', marginTop: '5px',fontSize:"13px" ,textAlign:"center" }}>{errors.email}</div>} */}
              </div>

              <div className="others">
                <button onClick={handleForgot}  disabled={loading}>
                {loading ?
                      <div className='d-flex align-items-center justify-content-center'>
                        <div class="spinner-border spinner-border-sm text-Light" role="status" >
                        </div>
                        <span className='ms-2'>Loading...</span>
                      </div>
                      : 'Send Request Instructions'
                }
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forgot