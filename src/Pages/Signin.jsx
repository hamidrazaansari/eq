import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import SignImage from "../assets/image/signin-image.png";
import google from "../assets/image/google.png";
import "../assets/css/signin.css";
import LogoImg from "../assets/image/logo.png";
import { ToastContainer, toast } from "react-toastify";
import { API_URL } from "../utills/BaseUrl";
import axios from "axios";
import { useIsLogin } from "../context/Authcontext";


function Signin() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { setIsLogin } = useIsLogin();

  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle user login
  const handleLoginUser = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(`${API_URL}/users/login`, { email, password });

      const userToken = response.data.body.token;

      toast.success(response.data.message)
      // Store token in localStorage and state
      localStorage.setItem("authToken", userToken);
      setIsLogin(true);

      // Success alert and navigation
      setTimeout(() => {
        navigate(-2 , {replace: true} );
      }, 800)
    } catch (error) {
      setIsLogin(false);
      if (error.response && error.response.data.errors) {
        setErrors({
          email: error.response.data.errors.email || "",
          password: error.response.data.errors.password || "",
        });
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
    finally {
      setLoading(false); // Stop loading
    }
  };



  const HandleReplaceRoute = (e) => {
    e.preventDefault()
    navigate('/signup', { replace: true });

  }

  return (
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
            <div className="sign-in">
              <h2>Sign In</h2>
              <div className="google-box">
                <img src={google} alt="google" />
                <p>Sign in with Google</p>
              </div>
              <div className="or">
                <span></span>
                <p>OR Continue With Email</p>
                <span></span>
              </div>
              <form onSubmit={handleLoginUser} className="d-flex align-items-center justify-content-center flex-column">
                <div className="input">
                  <label htmlFor="email">
                    Email address <span>*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && (
                    <div style={{ color: 'red', fontSize: "11px", position:"absolute" , top:"72px" }}>
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="input">
                  <label htmlFor="pass">
                    Password <span>*</span>
                  </label>
                  <input
                    type={passwordVisible ? "text" : "password"}
                    id="pass"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={togglePasswordVisibility}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "45%",
                      cursor: "pointer",
                    }}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                  {errors.password && (
                  <div style={{ color: 'red', fontSize: "11px", position:"absolute" , top:"72px"}}>
                    {errors.password}
                  </div>
                )}
                </div>

                <div className="others">
                  <Link to={"/forgot"}>
                    <label className="mt-2">Forgot Your Password?</label>
                  </Link>
                  <p>
                    By creating an account you agree with our <a href=""> Terms of service, Privacy Policy,</a> and our
                    default <a href=""> Notification Settings. </a>
                  </p>
                  <button type="submit" disabled={loading}>
                    {loading ?
                      <div className='d-flex align-items-center justify-content-center'>
                        <div class="spinner-border spinner-border-sm text-Light" role="status" >
                        </div>
                        <span className='ms-2'>Loading...</span>
                      </div>
                      : 'Sign In'}
                  </button>
                  <h5>
                    Don`t have an account?{" "}
                    <Link onClick={HandleReplaceRoute} style={{ textDecoration: "none" }}>
                      <span>Sign Up</span>
                    </Link>
                  </h5>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
