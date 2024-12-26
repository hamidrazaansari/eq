import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import '../assets/css/plan.css';
import { FaCheck } from "react-icons/fa6";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import parse from 'html-react-parser'
import { ImFire } from "react-icons/im";
import { Modal, Button } from "react-bootstrap";
import { RxCross2 } from "react-icons/rx";




function Plan() {
  const { id } = useParams(); // Initial ID from URL
  const [activeId, setActiveId] = useState(id); // Dynamic ID for API
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [programData, setProgramData] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [selectedComparePlan, setSelectedComparePlan] = useState('flow');
  const [main, setMain] = useState('')
  const [compare, setCompare] = useState([])
  const [activeTab, setActiveTab] = useState('main'); // Track active tab
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);


  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');

  const handleSelectPlan = (program) => {
    setSelectedPlan(program); // Update the selected plan
  };

  const handlePlanClick = (plan) => {
    setSelectedComparePlan(plan); // Update selected plan
  };
  // Fetch program plans based on the active ID
  useEffect(() => {
    axios
      .get(`${API_URL}/programPlans?program=${activeId}&displayOrder=ASC`)
      .then((response) => {
        setData(response.data?.body);
        setLoading(false);
      });
  }, [activeId]);


  // console.log(data);


  // Fetch program data for the initial ID
  useEffect(() => {
    axios.get(`${API_URL}/programs/${id}`).then((response) => {
      setProgramData(response.data?.body);
      setLoading(false);
    });
  }, [id]);

  const handleTabClick = (tab) => {
    if (tab === 'compare' && programData.compareWith?._id) {
      setActiveId(programData.compareWith?._id); // Update ID for the API call
    } else {
      setActiveId(programData._id); // Reset to initial ID
    }
    setActiveTab(tab);
  };

  const handleCompare = (programId, program) => {
    setMain(program);

    try {
      axios
        .get(`${API_URL}/programPlans?plan=${programId}&program=${programData.compareWith?._id}`)
        .then((response) => {
          setCompare(response.data?.body);
          setLoading(false);
        });

        setShowModal(true)
    } catch (error) {

    }
  };

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

      {/* Modal */}
      <div className="compare-modal">
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        
        <Modal.Body>
        <Button variant='success' className='cancel-btn' onClick={closeModal}><RxCross2/></Button>         
        <div className="compare">
            <h2>Choosing the Right Plan: A Comparative Review</h2>
            <div className="compare-box">
              <div className="features">
                <h3>Features</h3>
                <p>Price In INR</p>
                <p>PT Sessions</p>
                <p>Price In  Doler</p>
                <p>Groupe Session</p>
                <p>Plan Duration</p>

              </div>
              <div
                className={`flow ${selectedComparePlan === 'flow' ? 'selected' : ''}`}
                onClick={() => handlePlanClick('flow')}
              >
                <h3>{main.plan?.name}(Flow)
                  <br />
                  <span className='save'>Save 20%</span>
                  <span className='save bg-warn'><ImFire/> Most Popular</span>
                </h3>
                <p>{main.mrpInr} INR </p>
                <p>{main.ptSession} Session  </p>
                <p>{main.mrpDollar}$  </p>
                <p>{main.groupSession} Sesion</p>
                <p>{main.planDuration} Days  </p>

                <button className='compare-button'>{selectedComparePlan === 'flow' ? 'Selected' : 'Choose Plan'}</button>
              </div>


              {compare && compare.map((item) => {
                return(
                <div
                  key={item._id}
                  className={`rhythm ${selectedComparePlan === 'rhythm' ? 'selected' : ''}`}
                  onClick={() => handlePlanClick('rhythm')}
                >
                  <h3>{item.plan?.name}(Rhythm)
                    <br />
                    <span className='save'>Save 20%</span>
                    
                  </h3>
                  <p>{item.mrpInr} INR</p>
                  <p>{item.ptSession} Session</p>
                  <p>{item.mrpDollar}$ </p>
                  <p>{item.groupSession} Sesion</p>
                  <p>{item.planDuration} Days</p>
                  <button className='compare-button'>{selectedComparePlan === 'rhythm' ? 'Selected' : 'Choose Plan'} </button>

                </div>
              )})}

            </div>
              <button className='cantinue-button' onClick={()=>{handleGoToCart(selectedComparePlan === 'flow'? main._id :selectedComparePlan === 'rhythm'? compare[0].plan?._id: '')}}>Cantinue</button>
          </div>
        </Modal.Body>
      </Modal>
      </div>
      <NavBar />
      <section className="plans">
        <div className="container">
          <div className="tab-button d-flex align-items-center justify-content-end">
            <button
              className={activeTab === 'main' ? 'active-tab' : ''}
              onClick={() => handleTabClick('main')}
            >
              {programData.name}
            </button>
            <button
              className={activeTab === 'compare' ? 'active-tab' : ''}
              onClick={() => handleTabClick('compare')}
            >
              {programData.compareWith?.name || 'Compare'}
            </button>
          </div>

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
                    <button onClick={() => handleCompare(program.plan?._id, program)}>Choose Plan</button>
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


