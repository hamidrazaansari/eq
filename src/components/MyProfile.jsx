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
import PhoneNumberInput from './PhoneNumberInput';
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from 'moment';
import dayjs from 'dayjs';


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

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: '',
        mobile: '',
        gender: '',
        dob: '',

    })

    const token = localStorage.getItem('authToken');

    // Fetch profile data
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

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };
    const handleInputNumChange = (e) => {
        const { name, value } = e.target;

        setProfile((prevState) => ({
            ...prevState,
            [name]: value.replace(/[^0-9+-.]/g, ""),

        }));
    };

    // Update profile data
    const handleUpdateProfile = async () => {
        const { countryCode, createdAt, email, facebook, instagram, linkedin, mobile, status, updatedAt, x, youtube, _id, ...filteredProfile } = profile;

        try {
            const response = await axios.put(
                `${API_URL}/users/updateProfile`,
                filteredProfile,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                }
            );
            setProfile(response.data.body)
            if (response.status === 200) {

                toast.success('Profile updated successfully!');
                // Optionally refetch the profile data to ensure the UI shows updated values
            }
        } catch (error) {
            console.error('Error updating profile:', error.response);
            toast.error('Failed to update profile. Please try again.');
            setErrors(error.response.data?.message)
        }
    };

    const handleDateChange = (name) => {
        const formatedeDate = moment(name.$d).format('MM/DD/YYYY')
        setProfile((prevState) => ({
            ...prevState,
            dob: formatedeDate,
        }));
    };

    const handleCodeChange = (code) => {
        setProfile((prevState) => ({
            ...prevState,
            countryCode: code,
        }));
    }

    return (
        <div className='my-profile'>
            <ToastContainer />
            <NavBar />
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <DashboardSidebar isActive={"MyProfile"} />
                    </div>
                    <div className="col-9">
                        <div className="header">
                            <h2>
                                <GoArrowLeft /> My Profile
                            </h2>
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
                                <div className="col-6">
                                    <div className="input-box">
                                        <label htmlFor="name">First Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={profile.firstName}
                                            onChange={handleInputChange}
                                            readOnly={!isEditable}
                                            placeholder="Enter Your Name"
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-box">
                                        <label htmlFor="name">Last Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={profile.lastName}
                                            onChange={handleInputChange}
                                            readOnly={!isEditable}
                                            placeholder="Enter Your Name"
                                        />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="input-box">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={profile.email}
                                            readOnly
                                            placeholder="Enter your Email"
                                        />
                                    </div>
                                </div>
                                {/* Country Code and Mobile */}
                                <div className="col-6">
                                    <div className="input-box">
                                        <label htmlFor="mobile">Mobile Number</label>
                                        <div className="mobile-input">
                                            <PhoneNumberInput errors={errors} onCodeChange={handleCodeChange} />
                                            <input
                                                type="text"
                                                id="mobile"
                                                name="mobile"
                                                value={profile.mobile}
                                                onChange={handleInputNumChange}
                                                readOnly={!isEditable}
                                                placeholder="Enter Mobile Number"
                                            />
                                            {errors.mobile && (
                                                <div style={{ color: 'red', fontSize: "10px", position: "absolute", top: "72px" }}>
                                                    {errors.mobile}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-6 dob">
                                    <div className="d-flex flex-column">
                                        <label htmlFor="dob" className='dobLabal'>DOB</label>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                value={profile.dob ? dayjs(profile.dob) : null} // Convert profile.dob to Day.js object
                                                onChange={handleDateChange}
                                                format="DD/MM/YYYY"
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        fullWidth
                                                        placeholder="Select Date"
                                                        variant="outlined"
                                                        hiddenLabel
                                                        sx={{ '& .MuiInputBase-root': { padding: 0 } }}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </div>
                                    {errors.dob && (
                                        <div style={{ color: 'red', fontSize: "9px", position: "absolute", top: "335px" }}>
                                            {errors.dob}
                                        </div>
                                    )}
                                </div>


                                {/* Gender */}
                                <div className="col-6">
                                    <div className="input-box">
                                        <h6 className='mt-3'>Gender</h6>
                                        <div className="gender ">
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
                                        {errors.gender && (
                                            <div style={{ color: 'red', fontSize: "9px", position: "absolute", top: "53px" }}>
                                                {errors.gender}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="address">
                            <h3>ADDRESS</h3>
                            <div className="row">
                                {['address', 'locality', 'city', 'state', 'country', 'pincode'].map((field) => (
                                    <div className="col-6" key={field}>
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
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default MyProfile;
