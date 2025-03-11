import React, { useEffect, useState } from 'react';
import '../assets/css/dashboard.css';
import { LiaUserEditSolid } from "react-icons/lia";
import { API_URL } from '../utills/BaseUrl';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import NavBar from './NavBar';
import { GoArrowLeft } from "react-icons/go";
import DashboardSidebar from './DashboardSidebar';
import Footer from './Footer';
import 'react-phone-number-input/style.css'
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from 'moment';
import dayjs from 'dayjs';
import { BsThreeDotsVertical } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import CountryCode from '../components/CountryCode';

function MyProfile() {
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        dob: '',
        countryCode: '',
        mobile: '',
        address: '',
        city: '',
        country: '',
        locality: '',
        pincode: '',
        state: ''
    });

    const [isEditable, setIsEditable] = useState(false);
    const [errors, setErrors] = useState({});
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('authToken');

    // Fetch profile data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${API_URL}/users/profile`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                setProfile(response.data.body);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                toast.error('Failed to load profile data.');
            }
        }
        fetchData();
    }, [token]);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    // Handle numeric input for mobile
    const handleInputNumChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value.replace(/[^0-9+-.]/g, "") }));
    };

    // Handle Date Change
    const handleDateChange = (date) => {
        setProfile((prev) => ({ ...prev, dob: moment(date.$d).format('MM/DD/YYYY') }));
    };

    // Handle Country Code Change
    const handleCodeChange = (code) => {
        setProfile((prev) => ({ ...prev, countryCode: code }));
    };

    // Update Profile Data
    const handleUpdateProfile = async () => {
        const { countryCode, createdAt, email, facebook, instagram, linkedin, mobile, status, updatedAt, x, youtube, _id, ...filteredProfile } = profile;

        try {
            const response = await axios.put(`${API_URL}/users/updateProfile`, filteredProfile, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });

            if (response.status === 200) {
                setProfile(response.data.body);
                setIsEditable(false);
                toast.success('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Error updating profile:', error.response);
            setErrors(error.response?.data?.message || {});
            toast.error('Failed to update profile.');
        }
    };

    return (
        <div className='my-profile'>
            <ToastContainer />
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col-lg-3">
                        <DashboardSidebar isActive="MyProfile" handleClose={() => setShow(false)} show={show} />
                    </div>
                    <div className="col-lg-9">
                        <div className="header d-flex justify-content-between align-items-center">
                            <h2>
                                <GoArrowLeft onClick={() => navigate(-1)} /> My Profile
                            </h2>
                            <button onClick={() => setShow(true)} className='sidebar-menu'>
                                <BsThreeDotsVertical />
                            </button>
                        </div>

                        <div className="profile">
                            <button
                                className={`edit-button ${isEditable ? 'd-none' : 'd-block'}`}
                                onClick={() => setIsEditable(true)}
                            >
                                Edit <LiaUserEditSolid />
                            </button>
                            <button
                                className={`edit-button ${isEditable ? 'd-block' : 'd-none'}`}
                                onClick={handleUpdateProfile}
                            >
                                Save
                            </button>

                            <div className="row mt-5">
                                {/* First Name */}
                                <div className="col-md-6">
                                    <div className="input-box">
                                        <label>First Name</label>
                                        <input type="text" name="firstName" value={profile.firstName} onChange={handleInputChange} readOnly={!isEditable} placeholder="Enter First Name" />
                                    </div>
                                </div>

                                {/* Last Name */}
                                <div className="col-md-6">
                                    <div className="input-box">
                                        <label>Last Name</label>
                                        <input type="text" name="lastName" value={profile.lastName} onChange={handleInputChange} readOnly={!isEditable} placeholder="Enter Last Name" />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="col-md-6">
                                    <div className="input-box">
                                        <label>Email</label>
                                        <input type="email" name="email" value={profile.email} readOnly placeholder="Enter Email" />
                                    </div>
                                </div>

                                {/* Mobile Number */}
                                <div className="col-md-6">
                                    <div className="input-box">
                                        <label>Mobile Number</label>
                                        <div className="mobile-input">
                                            <CountryCode CountryCodeChange={handleCodeChange} defaultCountryCode={profile.countryCode} />
                                            <input type="text" name="mobile" value={profile.mobile} onChange={handleInputNumChange} readOnly={!isEditable} placeholder="Enter Mobile Number" />
                                        </div>
                                    </div>
                                </div>

                                {/* DOB */}
                                <div className="col-md-6 dob">
                                    <div className="d-flex flex-column">
                                        <label className='dobLabal'>DOB</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker value={profile.dob ? dayjs(profile.dob) : null} onChange={handleDateChange} format="DD/MM/YYYY" />
                                        </LocalizationProvider>
                                    </div>
                                </div>

                                {/* Gender */}
                                <div className="col-md-6">
                                    <div className="input-box">
                                        <h6>Gender</h6>
                                        <div className="gender">
                                            {['Male', 'Female', 'Other'].map((option) => (
                                                <div className="genderOpt" key={option}>
                                                    <input
                                                        type="radio"
                                                        id={option}
                                                        name="gender"
                                                        value={option}
                                                        checked={profile.gender === option}
                                                        onChange={handleInputChange}
                                                    />
                                                    <label htmlFor={option} className="form-check-label">
                                                        {option.charAt(0).toUpperCase() + option.slice(1)}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="address">
                            <h3>ADDRESS</h3>
                            <div className="row">
                                {['address', 'locality', 'city', 'state', 'country', 'pincode'].map((field) => (
                                    <div className="col-lg-6" key={field}>
                                        <div className="input-box">
                                            <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                                            <input
                                                type="text"
                                                id={field}
                                                name={field}
                                                value={profile[field]}
                                                onChange={handleInputChange}
                                                readOnly={!isEditable}
                                                placeholder={`Enter your ${field}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyProfile;
