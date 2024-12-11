import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../assets/css/plan.css';
import { FaCheck } from "react-icons/fa6";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import parse from 'html-react-parser'

function Plan() {
  const { id } = useParams();
  // State to track the selected plan
  const [data, setData] = useState('')
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const handleSelectPlan = (program) => {
    setSelectedPlan(program); // Update the selected plan
  };

  useEffect(() => {
    axios.get(`${API_URL}/programPlans?program=${id}&displayOrder=ASC`)
      .then(response => {
        setData(response.data.body);
        setLoading(false);
      })
  })
  const handleGoToCart =(programid)=>{
    if(token){
      navigate(`/cart/${programid}`)
    }
    else{
      navigate('/signup')
    }

  }
  return (
    <div>
      <NavBar/>
      <section className='plans'>
        <div className='container'>
          <div className="row">
            {data && data.map((program) => {
              return (
                <div className="col-lg-3">
                  <div
                    className={`plan-card ${selectedPlan === program ? 'active' : '' && program.isDefault ? 'active' : ''}`}
                    onClick={() => handleSelectPlan(program)} >
                    {!program.isDefault ? '' : <div className='tag text-center'>Most Popular Plan</div>}
                    <h3>{program && program.plan.name}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur</p>
                    <span className='offer'>{program.planDuration} Days</span>
                    <h2><span>₹</span>{program.salePriceInr}.00</h2>
                    <button onClick={()=>handleGoToCart(program._id)}>Choose Plan</button>
                    <div className="line"></div>
                    {parse(program.features)}
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </section>
      <div className="plan-footer">
        <Footer />
      </div>
    </div>
  );
}

export default Plan;
