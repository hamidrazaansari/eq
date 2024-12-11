import React, { useState } from 'react';
import SignImage from '../assets/image/signin-image.png';
import google from '../assets/image/google.png';
import '../assets/css/signin.css';
import LogoImg from '../assets/image/logo.png';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../utills/BaseUrl';

function SignUp() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [firstName, setFirtName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', firstName: '', lastName:'', countryCode:'', mobile:'',  password: '' });
    const [loading, setLoading] = useState(false); // Loading state


    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleRegisterNewUser = async (e) => {
        e.preventDefault();
        setErrors({ email: '', name: '', password: '' });
        setLoading(true); // Start loading

        try {
            const response = await axios.post(`${API_URL}/users/register`, { firstName, lastName, email, countryCode, mobile, password });
            toast.success(response.data.message);
            const token = response.data.body.token;
            if (token) {
                navigate('/otp', { state: { token, email, purpose: "verifyAccount" } });
            }
        } catch (error) {

            if (error.response && error.response.data.errors) {
                const errorData = error.response.data.errors;

                // Set specific errors for each field
                setErrors({
                    email: errorData.email || '',
                    firstName: errorData.firstName || '',
                    lastName: errorData.LastName || '',
                    mobile: errorData.mobile || '',
                    countryCode: errorData.countryCode || '',
                    password: errorData.password || '',
                });
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

console.log(errors);

    return (
        <div className='signUp'>
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
                            <h2>Sign Up</h2>
                            <div className="google-box">
                                <img src={google} alt="" />
                                <p>Sign in with Google</p>
                            </div>
                            <div className='or'>
                                <span></span>
                                <p>OR Continue With Email</p>
                                <span></span>
                            </div>
                            <div className="input">
                                <label htmlFor="email">Email Address <span>*</span></label>
                                <input
                                    type="email"
                                    id='email'
                                    className='input-field'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                    <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div className="row name">
                                <div className="col-6  d-flex align-items-center justify-content-end">
                                    <div className="input">
                                        <label htmlFor="firstname">First Name <span>*</span></label>
                                        <input
                                            type="text"
                                            id='firstname'
                                            className='input-field'
                                            value={firstName}
                                            onChange={(e) => setFirtName(e.target.value)}
                                        />
                                        {errors.firstName && (
                                            <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>
                                                {errors.firstName}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-6  d-flex align-items-center justify-content-start">
                                    <div className="input">
                                        <label htmlFor="lastname">Last Name <span>*</span></label>
                                        <input
                                            type="text"
                                            id='lastname'
                                            className='input-field'
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                        {errors.lastName && (
                                            <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>
                                                {errors.lastName}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="row mobile">
                                <div className="col-4">
                                    <div className="input">
                                        <label htmlFor="Countrycode">Country Code <span>*</span></label>
                                        <input
                                            type="text"
                                            id='Countrycode'
                                            className='input-field'
                                            value={countryCode}
                                            onChange={(e) => setCountryCode(e.target.value)}
                                            placeholder='+91'
                                        />
                                        {errors.countryCode && (
                                            <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>
                                                {errors.countryCode}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="input">
                                        <label htmlFor="mobile">Mobile <span>*</span></label>
                                        <input
                                            type="text"
                                            id='mobile'
                                            className='input-field'
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                        {errors.mobile && (
                                            <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>
                                                {errors.mobile}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>


                            <div className="input mt-3">
                                <label htmlFor="pass">Password <span>*</span></label>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id='pass'
                                    className='input-field'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    style={{
                                        position: 'absolute',
                                        right: '15px',
                                        top: '45%',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                                </span>
                                {errors.password && (
                                    <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" }}>
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <div className="others">
                                <p>By creating an account you agree with our <a href=""> Terms of service, Privacy Policy,</a>
                                    and our default <a href=""> Notification Settings. </a>
                                </p>
                                <button onClick={handleRegisterNewUser} disabled={loading}>
                                    {loading ?
                                        <div className='d-flex align-items-center justify-content-center'>
                                            <div class="spinner-border spinner-border-sm text-Light" role="status" >
                                            </div>
                                            <span className='ms-2'>Loading...</span>
                                        </div>
                                        : 'Sign Up'}
                                </button>
                                <h5>
                                    Already have an account?{' '}
                                    <Link to={'/signin'} style={{ textDecoration: "none" }}>
                                        <span>Sign In</span>
                                    </Link>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
