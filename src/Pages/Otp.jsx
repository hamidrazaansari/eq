import React, { useState  , useRef , useEffect} from 'react'
import SignImage from '../assets/image/signin-image.png'
import '../assets/css/signin.css'
import LogoImg from '../assets/image/logo.png'
import { Link , useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import {API_URL} from '../utills/BaseUrl'
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { useIsLogin } from '../context/Authcontext';



function Otp() {
  const [otps, setOtp] = useState(["", "", "", ""]);
  const [loading  , setLoading] = useState(false);
  const [sendingOTP  , setSendingOTP] = useState(false);
  const [time, setTime] = useState(30);

  const inputRefs = useRef([]);

  const { setIsLogin } = useIsLogin();

  
  const location = useLocation();
  const navigate = useNavigate();

    const email = location.state?.email
    const purpose = location.state?.purpose

    useEffect(() => {
      if (time > 0) {
        const timer = setTimeout(() => setTime(time - 1), 1000);
        return () => clearTimeout(timer); // Cleanup the timeout
      }
    }, [time]);

    const handleChange = (element, index) => {
        const value = element.value.replace(/[^0-9]/g, ""); 
        if (value) {
          const newOtp = [...otps];
          newOtp[index] = value;
          setOtp(newOtp);
    
          // Move focus to the next input if available
          if (index < 3) {
            inputRefs.current[index + 1].focus();
          }
        }
      };
    
      const handleKeyDown = (e, index) => {
        // On backspace, clear the current input and move to previous if it's already empty
        if (e.key === "Backspace") {
          const newOtp = [...otps];
          
          if (newOtp[index] === "") {
            if (index > 0) {
              inputRefs.current[index - 1].focus(); // Move focus to the previous input
            }
          } else {
            newOtp[index] = ""; // Clear current input
          }
          
          setOtp(newOtp);
        }
      };
      const otp = otps.join("");

      // handleVerify Account **************************************
      const handleVerifyAccount = async () => {
        setLoading(true)
        const token = location.state?.token;
      
        try {
          const response = await axios.post(
            `${API_URL}/users/verifyAccount`,
            {otp},
            {
              headers: {
                'Authorization': `Bearer ${token}`,
              }
            }
          );
          setLoading(false)
            toast.success(response.data.message)
            const userToken = response.data.body.token;            
            // Store token in localStorage and state
            localStorage.setItem("authToken", userToken);
            setIsLogin(true)
            setTimeout(()=>{
              navigate(-2)
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

      // handle Verify OTP *********************
      const handleVeriyOTP = async(e)=>{
        e.preventDefault()
        setLoading(true)      
        try {
          const response = await axios.post(
            `${API_URL}/users/verifyOtp`,
            { email, otp},
          );
          setLoading(false)
            toast.success(response.data.message)
            console.log(response)

            setIsLogin(true)
            setTimeout(()=>{
              navigate('/reset-password' , { state:{token: response.data.body.token},   replace: true  } )
            }, 800)

        } catch (error) {
          if (error.response) {
            console.error('Server responded with status:', error.response.status);
            console.error('Response data:', error.response.data);
            setIsLogin(false)
          }
        }
      }
    

      // function to handle resend otp
      
      const handleResendOtp = async(e)=>{
        setSendingOTP(true)
        e.preventDefault();        
    try
    {    const response = await axios.post(`${API_URL}/users/findAccount` , {email})
        toast.success('OTP has been sent to your Email')
        const userToken = response.data.body.token;            
        // Store token in localStorage and state
        localStorage.setItem("authToken", userToken);
        setSendingOTP(false)

      }
   catch (error) {
    if (error.response) {
      console.error('Server responded with status:', error.response.status);
      console.error('Response data:', error.response.data);

    }
     
  }
  finally{
    setSendingOTP(false)
  }
}
    return (
        <div className='otp'>
          <ToastContainer/>
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
                            <MdOutlineMarkEmailRead className='my-4'/>
                            <h2>Please Check Your Email </h2>
                            <p>We've sent a code to {email}</p>


                            <div className='otp-container'>
                                {otps.map((value, index) => (
                                    <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    maxLength="1"
                                    value={value}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                        className='input'
                                    />
                                ))}
                            </div>

                            <div className="others d-flex justify-content-between flex-column w-100">
                              {/* <span className='float-end text-danger'>Expire in: 1:30 min</span> */}
                              <p className='text-center mx-auto'>Didn't get the code?

                                {
                                  time === 0 ? sendingOTP ? 
                                  <div className='d-flex align-items-center justify-content-center'> 
                                      <div class="spinner-border spinner-border-sm text-Light" role="status" >
                                      </div>
                                      <span className='ms-2'>Loading...</span>
                                  </div>
                                   : <Link className='ms-2' onClick={handleResendOtp}>Click to Resend.</Link> : 
                                   <p className='text-danger ms-2'>00:{time}</p>

                                }

                      
                                </p>
                                
                              <div className=' d-flex justify-content-between flex-column'>
                            <button  className=' mx-auto' onClick={purpose === 'verifyOTP'? handleVeriyOTP : handleVerifyAccount} disabled={loading}>
                            {loading ? 
                                    <div className='d-flex align-items-center justify-content-center'> 
                                        <div class="spinner-border text-Light" role="status" >
                                        </div>
                                        <span className='ms-2'>Loading...</span>
                                    </div>
                                     : purpose === 'verifyOTP'? 'Verify OTP' : 'Verify Account'
                            }
                              </button>
                              </div>
                            </div>
                            <div className="line"></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Otp