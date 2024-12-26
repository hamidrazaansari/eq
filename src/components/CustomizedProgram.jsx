import React from 'react'
import { useEffect , useState } from 'react'
import NavBar from './NavBar';
import Footer from './Footer';
import { useLocation , Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import Checkmarks from '../assets/image/checkmark.png'
import getImageURL from '../utills/getImageURL';
import parse from 'html-react-parser';




function CustomizedProgram() {
  const [data , setData] = useState('')
  const [loading , setLoading] = useState(true);

  const location = useLocation()

  const leadData = location.state?.leadData;

  // console.log(leadData);

  const {goals} = leadData;
  const {ageRange} = leadData;
  const {isInjured} = leadData;
  const {yogaExperience} = leadData;
  const {timeSlot} = leadData;
  const {budget} = leadData;
  
  
  const selectedGoal = Array.isArray(goals) && goals.length > 0 ? goals[0]._id : null;
  console.log(selectedGoal);
  

  useEffect(() => {
      axios.get(`${API_URL}/programs?goals[]=${selectedGoal}&ageRange=${ageRange._id}&isInjured=${isInjured}&yogaExperience=${yogaExperience._id}&timeSlot=${timeSlot._id}&budget=${budget._id}`)
        .then(response => {
          setData(response.data.body);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }, []);
  return (

    <div>
              <div className='personalize-program' >
            <NavBar />
            <section >
                <div className="container px-5">
                    <h2>Personalized Training  <span>Program</span> </h2>
                    <div className="breadcrumb">
                        <a href="/">Homepage</a>  <span></span>
                        <a href="/">Personalized Training Program</a>
                    </div>
                </div>
                <div className="container px-5">        
                    <div className="row">
                        {
                            data && data.map((item)=>{
                              const imageUrl = item.defaultImage ? getImageURL(item.defaultImage) : '';
                                return(
                                    <div className="col-lg-4 col-md-6 col-12">
                                    <div className="program-box">
                                        <img src={imageUrl} className='program-img' alt="Personal Training Trail" />
                                        <h3>{item.name}</h3>
                                        <div className='para mb-4 mt-2'>{parse(item.descriptions.slice(403,600 ) + (item.descriptions.length > 600 ? "..." : ""))}</div>
                                        <div className="point">
                                            <div className="row  mb-3 px-3">
                                                {item.usp && item.usp.map((usp)=>(
                                                    <>
                                                <div className="col-6 p-0 py-2 d-flex align-items-center justify-content-start">
                                                    <img src={Checkmarks} alt="" />
                                                    <p className=''>{usp}</p>
                                                </div>
                                                    </>
                                                ))}

                                            </div>
                                        </div>
                                        <span className='time'>{ item.subCategory ? item.subCategory && item.subCategory.name : 'Trail Program'}</span>
                                        <Link to={`/program/${item._id}`}><button className='BookNowBtn '>Book Now</button></Link> 
        
                                    </div>
                                </div>
                                )
                            })
                        }

                    </div>
                    <div className="row my-5">
                        <div className="col-12 p-3">
                            <div className="recall">
                                <h2>Need help finding the right plans?</h2>
                                <p>Request a callback to get your quires answered</p>
                                <button>Request a call</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    </div>
  )
}

export default CustomizedProgram