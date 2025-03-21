import React , {useState} from 'react'
import SelectSearch from 'react-select-search';
import CallBack from '../assets/image/callback.png'
import axios from 'axios';
import {API_URL} from '../utills/BaseUrl'
import CountryCode from '../components/CountryCode';
function TolkToExpert() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [countryCode, setCountryCode] = useState("");
    const [mobile, setMobile] = useState('')
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('')


    const CountryCodeChange = (countryCode) => {
        setCountryCode(countryCode);
    }


    const handleLeadProcess = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const response = await axios.post(`${API_URL}/buildPlanLeads`,
                {
                    name: name,
                    email: email,
                    countryCode: countryCode,
                    mobile: mobile,
                    goals: goals,
                    ageRange: ageRange,
                    isInjured: isInjured,
                    yogaExperience: yogaExperience,
                    timeSlot: timeSlot,
                    budget: budget
                });


            setTimeout(()=>{
                navigate('/build-plan-details', { state: { buildePlan:response.data.body } })
            },1000)

            
            setLoading(false)

        } catch (error) {
            console.error('Error fetching profile data:', error);
            setError(error.response.data?.errors)
        }
        finally {
            setLoading(false)
        }
    }
  return (
    <div>
        <div className="talk-to-expert">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="form-box d-flex align-items-center justify-content-center flex-column tolk-to-expert ">
                                                    <div className='process-headin mt-5'>
                                                        <h2 className='mb-0 text-dark'>Please fill out this information</h2>
                                                    </div>
                                                    <div className="age-range-form profile ">
                                                        <p>Share your contact information, and one of our specialists will call you to help guide you toward a happier, healthier life.</p>
                                                        <div className='range-box'>
                            
                                                            <input type="text" id='name' className='input-field' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
                                                            {error.name && (
                                                                <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" , left:"0px"  }}>
                                                                    {error.name}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className='range-box'>
                                                            <input type="email" className='input-field' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                                                            {error.email && (
                                                                <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" , left:"0px" }}>
                                                                    {error.email}
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="select-search">
                                                                                 <CountryCode
                                                                                     CountryCodeChange={CountryCodeChange}
                                                                                     defaultCountryCode={countryCode}
                                                                                 />
                                                            {error.countryCode && (
                                                                <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "472px" , width:"100px" }}>
                                                                    {error.countryCode}
                                                                </div>
                                                            )}
                                                            <div className="mobileInput mt-0">
                                                                <input
                                                                    type="text"
                                                                    id="phone-input"
                                                                    className="phone-input"
                                                                    placeholder="Type Your Whatsapp Number"
                                                                    maxLength={10}
                                                                    onInput={(e) => {
                                                                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                                                                    }}
                                                                    value={mobile}
                                                                    onChange={(e) => setMobile(e.target.value)}
                                                                />
                                                                {error.mobile && (
                                                                    <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "72px" , left:"0px" }}>
                                                                        {error.mobile}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="form-footer"><img src={CallBack} alt="" height={"20px"} /> Receive a response within one business day.</div>
                            
                                                    </div>
                                                    <button className='collback-btn' onClick={handleLeadProcess}>Request a call</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TolkToExpert