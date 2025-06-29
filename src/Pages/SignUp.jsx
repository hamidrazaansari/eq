import React, { useState } from 'react';
import SignImage from '../assets/image/signin-image.png';
import google from '../assets/image/google.png';
import '../assets/css/signin.css';
import LogoImg from '../assets/image/logo.png';
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../utills/BaseUrl';
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from 'moment';
import CountryCode from '../components/CountryCode';

function SignUp() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [firstName, setFirtName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [dob, setDob] = useState('');
    const [gender, setGender] = useState('');
    const [countryCode, setCountryCode] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', firstName: '', lastName: '', countryCode: '', mobile: '', password: '', dob: '', gender: '' });
    const [loading, setLoading] = useState(false); // Loading state


    const navigate = useNavigate();

    const location =  useLocation()
    const {programid} = location.state || {};

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleRegisterNewUser = async (e) => {
        e.preventDefault();
        setErrors({ email: '', name: '', password: '' });
        setLoading(true); // Start loading

        try {
            const response = await axios.post(`${API_URL}/users/register`, { firstName, lastName, email, countryCode, mobile, password, dob, gender });
            toast.success(response.data.message);
            const token = response.data.body.token;
            if (token) {
                navigate('/otp', { state: { token, email, purpose: "verifyAccount" , programid} });
            }
        } catch (error) {

            if (error.response && error.response.data.errors) {
                const errorData = error.response.data.errors;

                // Set specific errors for each field
                setErrors({
                    email: errorData.email || '',
                    firstName: errorData.firstName || '',
                    lastName: errorData.lastName || '',
                    mobile: errorData.mobile || '',
                    countryCode: errorData.countryCode || '',
                    dob: errorData.dob || '',
                    gender: errorData.gender || '',
                    password: errorData.password || '',
                });
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setGender(e.target.value);

    };

    
    const handleDateChange = (name) => {
        const formatedeDate = moment(name.$d).format('MM/DD/YYYY')
        setDob(formatedeDate)
      };
      

    const CountryCodeChange = (countryCode) => {
        setCountryCode(countryCode)  
    }
        
    return (
        <div className='signUp'>
            <ToastContainer />

            <div className="logo">
                <img src={LogoImg} alt="" />
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 p-0 signin-image">
                        <img src={SignImage} alt="yoga imag" />
                    </div>
                    <div className="col-lg-6 p-0 d-flex align-items-center justify-content-center">
                        <div className="sign-in">
                            <h2>Sign Up</h2>
                            {/* <div className="google-box">
                                <img src={google} alt="" />
                                <p>Sign in with Google</p>
                            </div> */}
                            <div className='or'>
                                <span></span>
                                <p>OR Continue With Email</p>
                                <span></span>
                            </div>

                            <div className="row name"> 
                                <div className="col-sm-6   d-flex align-items-center justify-content-end">
                                    <div className="input">
                                        <label htmlFor="firstname">First Name <span>*</span></label>
                                        <input
                                            type="text"
                                            id='firstname'
                                            className='input-field'
                                            placeholder='Enter Your First Name'
                                            value={firstName}
                                            onChange={(e) => setFirtName(e.target.value)}
                                        />
                                        {errors.firstName && (
                                            <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                                {errors.firstName}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-sm-6  d-flex align-items-center justify-content-start">
                                    <div className="input">
                                        <label htmlFor="lastname">Last Name <span>*</span></label>
                                        <input
                                            type="text"
                                            id='lastname'
                                            className='input-field'
                                            placeholder='Enter Your Last Name'
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                        {errors.lastName && (
                                            <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                                {errors.lastName}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="input">
                                <label htmlFor="email">Email Address <span>*</span></label>
                                <input
                                    type="email"
                                    id='email'
                                    className='input-field'
                                    placeholder='Enter Your Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                    <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                            <div className="row dob">
                                <div className="col-sm-6 p-0">
                                    <div className="dobflex">
                                        <label htmlFor="dob" className='dobLabal'>DOB</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Select Date"

                                            // value={moment('MM/DD/YYYY').format(dob)}
                                            onChange={handleDateChange}
                                            renderInput={(params) => <TextField {...params} fullWidth />}
                                        />
                                    </LocalizationProvider>
                                        {errors.dob && (
                                            <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "365px" }}>
                                                {errors.dob}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-sm-6 sign-up">
                                    <div className="input-box mt-4">
                                        <h6 className='genderlabal'>Gender</h6>
                                        <div className="gender">
                                            {['Male', 'Female', 'Other'].map((option) => (
                                                <div className="genderOpt" key={option}>
                                                    <input
                                                        type="radio"
                                                        id={option}
                                                        name="gender"
                                                        value={option}
                                                        checked={gender === option}
                                                        onChange={handleInputChange}
                                                    />
                                                    <label htmlFor={option} className="form-check-label">
                                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                        {errors.gender && (
                                            <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "65px" }}>
                                                {errors.gender}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="input-box w-100 mt-4">
                                <label htmlFor="mobile">Mobile Number</label>
                                <div className="mobile-input w-100">
                                        <CountryCode
                                            CountryCodeChange={CountryCodeChange}
                                            defaultCountryCode={countryCode}
                                        />                                     {errors.countryCode && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                            {errors.countryCode}
                                        </div>
                                    )}
                                    <input
                                        type="text"
                                        id="mobile"
                                        className=' ps-4'
                                        name="mobile"
                                        placeholder='Enter Your Mobile Number'

                                        value={mobile}
                                        onChange={(e) => {
                                            // Validate that the input contains only digits
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value)) {
                                                setMobile(value); // Update the state only if the input is valid
                                            }
                                        }}
                                    />
                                    {errors.mobile && (
                                        <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "69px" , left:"3px" }}>
                                            {errors.mobile}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="input ">
                                <label htmlFor="pass">Password <span>*</span></label>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    id='pass'
                                    className='input-field'
                                    placeholder='Enter Your Password'

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
                                    <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                        {errors.password}
                                    </div>
                                )}
                            </div>

                            <div className="others">
                                {/* <p>By creating an account you agree with our <a href=""> Terms of service, Privacy Policy,</a>
                                    and our default <a href=""> Notification Settings. </a>
                                </p> */}
                                <button onClick={handleRegisterNewUser} className='mt-4' disabled={loading}>
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
