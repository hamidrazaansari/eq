import React , {useState , useEffect} from 'react'
import { IoMdHelpCircleOutline } from "react-icons/io";
import { useNavigate , useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
function AgeRange() {
        const [ageRange, setAgeRange] = useState('');
        const [selectedRange, setSelectedRange] = useState(null);
        

        const navigate = useNavigate(); 
        const location = useLocation();
        const goalIds = location.state?.selectedGoals
        
        
        useEffect(()=>{
            async function fetchAgeRange() {
                try {
                    const response = await axios.get(`${API_URL}/ageRanges?displayOrder=ASC`, {
    
                    });
                    setAgeRange(response.data.body);
                } catch (error) {
                    console.error('Error fetching profile data:', error);
                }
            }
            fetchAgeRange();
        },[])
    
        const prevStep = ()=>{
            navigate('/goals')

        }
        const nextStep = ()=>{
            navigate('/injury' , {state:{goalIds,selectedRange }})
        }
        const handleSelect = (value) => {
            setSelectedRange(value); 
        };
    return (
        <div className="step2">
            <div className="container">
                <div className="position-sticky">
                    <div className="d-flex justify-content-between">
                        <div></div>
                        <button className='help-btn'><IoMdHelpCircleOutline /> Help</button>
                    </div>
                    <div className="row mt-3 px-5 mobile-padding">
                        <div className="col-2"><div className="step "></div></div>
                        <div className="col-2"><div className="step active-step"></div></div>
                        <div className="col-2"><div className="step"></div></div>
                        <div className="col-2"><div className="step"></div></div>
                        <div className="col-2"><div className="step"></div></div>
                        <div className="col-2"><div className="step"></div></div>
                    </div>
                </div>
            </div>
            <div className="item-container">
                <div className="container">
                    <div className="process-heading">
                        <h2 className='mb-5'>Choose Your Age Range?</h2>
                    </div>
                    <div className="age-range-form">
                        {ageRange && ageRange.map((age, ind) => {
                            return (
                                <div className="age-box" onClick={() => handleSelect(age._id)} key={ind}>
                                    <input
                                        type="radio"
                                        id={`age${ind + 1}`}
                                        name="ageRange"
                                        checked={selectedRange === age._id}
                                        onChange={() => handleSelect(age._id)}
                                    />
                                    <span className="custom-radio-btn"></span>
                                    <label htmlFor={`age${ind + 1}`}>{age.title}</label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className="process-footer">
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <button className='back' onClick={prevStep}>Back</button>
                        <button
                            onClick={nextStep} disabled={selectedRange === null}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AgeRange