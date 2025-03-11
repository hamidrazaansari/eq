import React , {useState , useEffect} from 'react'
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import { IoMdHelpCircleOutline } from "react-icons/io";
import { useLocation, useNavigate } from 'react-router-dom';


function Experience() {
        const [activeExperience, setActiveExperience] = useState('Only Yoga Experience');
        const [yogaExperiences, setYogaExperiences] = useState('');
        const [experienceId , setExperienceId] = useState('');


        const navigate = useNavigate()

            const location = useLocation();
            const goals = location.state?.goals;
            const ageRange = location.state?.ageRange;
            const isInjured = location.state?.isInjured;

            

        useEffect (()=>{
            async function fetchYogaExperiences() {
                try {
                    const response = await axios.get(`${API_URL}/yogaExperiences?displayOrder=ASC`, {
    
                    });
                    setYogaExperiences(response.data.body);
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                }
            }
            fetchYogaExperiences()
        }, [])

        const handleButtonClick = (experience , expId) => {
            setActiveExperience(experience); 
            setExperienceId(expId)
        };
            

        const prevStep = ()=>{
            navigate('/injury')

        }
        const nextStep = ()=>{
            navigate('/timeslot' , {state:{goals  , ageRange , isInjured  , experienceId}})
        }

    return (
        <>
            <div className="step2">
                <div className="container">
                    <div className="position-sticky">
                        <div className="d-flex justify-content-between">
                            <div></div>
                            <button className='help-btn'><IoMdHelpCircleOutline /> Help</button>
                        </div>
                        <div className="row mt-3 px-5 mobile-padding">
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step active-step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                            <div className="col-2"><div className="step"></div></div>
                        </div>
                    </div>
                </div>
                <div className="item-container">
                    <div className="container">
                        <div className='process-heading'>
                            <h2 className='mb-5'>Do You Have Any Prior Workout
                                And Yoga Experience?</h2>
                        </div>
                        <div className="injury-permision">
                            {yogaExperiences && yogaExperiences.map((exp) => {
                                return (
                                    <button key={exp._id}
                                        className={`permisson-btn ${activeExperience === exp.title ? 'active' : ''}`}
                                        onClick={() => handleButtonClick(exp.title , exp._id)}
                                    >
                                        {exp.title}
                                    </button>
                                )
                            })}

                        </div>

                    </div>
                </div>
                <div className="process-footer">
                    <div className="container">
                        <div className="d-flex justify-content-between">
                            <button className='back' onClick={prevStep}>Back</button>
                            <button onClick={nextStep}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Experience