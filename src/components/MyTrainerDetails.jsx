import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import '../assets/css/dashboard.css'
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import { useParams , Link } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar';
import { GoArrowLeft } from "react-icons/go";
import getImageURL from '../utills/getImageURL';



function MyTrainerDetails() {
    const [data, setData] = useState('')
    const token = localStorage.getItem('authToken');

    const { id } = useParams()
    console.log(data);

    // Fetch profile data
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`${API_URL}/trainers/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setData(response.data?.body);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }
        fetchData();
    }, []);
      const imageUrl = data.profilePhoto ? getImageURL(data.profilePhoto) : '';

    return (
        <div className='trainer-details'>
            <NavBar />
            <div className='container mt-5'>
                <div className="row">
                    <div className="col-3">
                        <DashboardSidebar  />
                    </div>
                    <div className="col-9">
                        <div className="main-content pb-5">
                            <div className="header">
                                <h2>
                                    <GoArrowLeft /> Trainer Details
                                </h2>
                            </div>
                            <div className="trainer-banner">
                                    <div className="banner-header">
                                        <img src={imageUrl} alt={data.name} />
                                        <h2>{data.name}</h2>
                                        <p>{data.bio} </p>
                                    </div>
                                    <div className="banner-footer">
                                        {/* <button><span>5<IoMdStar /></span> 52 People Coached</button> */}
                                    </div>
                            </div>
                            <div className="about-trainer">
                                <h3>About </h3>
                                <p>{data.bio} </p>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="trainer-interest In">
                                        <h2>Interested In</h2>
                                        {data.interests?.map((item) => {
                                            return (
                                                <div className="btn-box" >
                                                    <button>{item.title}</button>
                                                </div>
                                            )
                                        })}
                                    
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="Speciality In">
                                        <h2>Speciality In</h2>
                                        {data.specialities?.map((item) => {
                                            return (
                                                <div className="btn-box" >
                                                    <button>{item.title}</button>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="Certifications In">
                                        <h2>Certifications</h2>
                                        {data.certificates?.map((item) => {
                                            return (
                                                <div className="btn-box" >
                                                    <button>{item.title}</button>
                                                </div>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-8">
                                    <div className="teachingExperience">
                                        <h2>Teaching Experience</h2>
                                        <p className='mt-4'>Years of Experience : 08 years</p>
                                        <p>Types of Classes : Group classes, Online sessions.</p>
                                        <p>Past Employers : Yoga studio, Organizations</p>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="teachingExperience">
                                        <h2>Inspirations</h2>
                                        <p className='mt-4'>Yoga is the journey of the self, through the self, to the self."  Bhagavad Gita This emphasizes yoga as a path of self-discovery and inner transformation.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MyTrainerDetails