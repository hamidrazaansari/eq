import React, { useEffect, useState } from 'react';
import '../assets/css/dashboard.css';
import { LiaUserEditSolid } from "react-icons/lia";
import { API_URL } from '../utills/BaseUrl';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

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
            if (response.status === 200) {
                toast.success('Profile updated successfully!');
                setIsEditable(false);
                // Optionally refetch the profile data to ensure the UI shows updated values
            }
        } catch (error) {
            console.error('Error updating profile:', error.response);
            toast.error('Failed to update profile. Please try again.');
        }
    };


    return (
        <div>
            <ToastContainer/>
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
                    <div className="col-3">
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
                    <div className="col-3">
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
                            <h6>Gender</h6>
                            <div className="gender">
                                {['male', 'female', 'other'].map((option) => (
                                    <div className="genderOpt" key={option}>
                                        <input
                                            type="radio"
                                            id={option}
                                            name="gender"
                                            value={option}
                                            checked={profile.gender === option}
                                            onChange={handleInputChange}
                                            disabled={!isEditable}
                                        />
                                        <label htmlFor={option} className="form-check-label">
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </label>
                                    </div>
                                ))}
                            </div>
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
                    <div className="col-6">
                        <div className="input-box">
                            <label htmlFor="dob">DOB</label>
                            <input
                                type="date"
                                id="dob"
                                name="dob"
                                value={profile.dob}
                                onChange={handleInputChange}
                                readOnly={!isEditable}
                                placeholder="dd-mm-yyyy"
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="input-box">
                            <label htmlFor="countryCode">Country Code</label>
                            <input
                                type="text"
                                id="countryCode"
                                name="countryCode"
                                value={profile.countryCode}
                                onChange={handleInputChange}
                                readOnly={!isEditable}
                                placeholder="IN +91 (India)"
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="input-box">
                            <label htmlFor="mobile">Mobile Number</label>
                            <input
                                type="text"
                                id="mobile"
                                name="mobile"
                                value={profile.mobile}
                                onChange={handleInputChange}
                                readOnly={!isEditable}
                                placeholder="Enter Mobile Number"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="address">
                <h3>ADDRESS</h3>
                <div className="row">
                    {['address', 'locality', 'city','state' , 'country', 'pincode'].map((field) => (
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
    );
}

export default MyProfile;
