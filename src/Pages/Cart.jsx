import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import '../assets/css/cart.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaRegTrashAlt } from "react-icons/fa";
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import { FaTag } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';


function Cart() {
  const [isSubscribed, setIsSubscribed] = useState(true);
  const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '', mobile: '' });
  const [couponCode, setCouponCode] = useState('');
  const [cupon, setCupon] = useState('')
  const [data, setData] = useState('');
  const [cuponData, setCuponData] = useState('');
  const [selectedProgram, setSelectedProgram] = useState("myself");
  const [formError , setFormError] = useState('')


  const { id } = useParams();
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate()

  const handleProgramChange = (value) => {
    setSelectedProgram(value);

    // Clear profile fields when switching to "For Someone Else"
    if (value === "someoneElse") {
      setProfile({ firstName: '', lastName: '', email: '', mobile: '' });
    }
  };

  useEffect(() => {
    axios.get(`${API_URL}/programPlans/${id}`)
      .then(response => {
        setData(response.data.body);
      });
  }, [id]);

  // Fetch profile data
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL}/users/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (selectedProgram === "myself") {
          setProfile(response.data.body);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);

      }
    }
    fetchData();
  }, [token, selectedProgram]);


  const handleSubscriptionChange = (event) => {
    setIsSubscribed(event.target.checked);
  };

  const handleCuponChange = (event) => {
    setCouponCode(event.target.value);


  };

  const handleADDCupon = async () => {
    try {
      if (couponCode) {
        const response = await axios.post(`${API_URL}/coupons/validateCoupon`, { couponCode }, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        setCuponData(response.data)
        setCupon(couponCode)


      }
    } catch (error) {
      setCuponData(error.response)

    }
  }
  let totalSave = 0;

// Convert to number and calculate subscription discount
const subcriptionCal = parseFloat((data.salePriceInr * data.plan?.subscriptionDiscountPercentage / 100).toFixed(2)); 
if(isSubscribed){
  totalSave += subcriptionCal;
}
else{
  totalSave
}

let subTotal = data.salePriceInr - subcriptionCal;

if (cupon) {
  const discountType = cuponData.body?.discountType;
  const discountValue = cuponData.body?.discount || 0;

  if (discountType === "AMOUNT") {
    totalSave += discountValue;
    subTotal -= discountValue;
  } else if (discountType === "PERCENTAGE") {
    const percentageDiscount = (subTotal * discountValue) / 100; // Calculate once
    totalSave += percentageDiscount;
    subTotal -= percentageDiscount;
  }
}

// Round final amounts for display purposes
subTotal = parseFloat(subTotal.toFixed(2));
totalSave = parseFloat(totalSave.toFixed(2));

  const handleRemoveCupon = () => {
    setCouponCode('')
    if (cuponData.body?.minimumAmount >= data.salePriceInr) {
      toast.info('this Cupon is not applicale for this amount ');
    }
    else {
      setCupon('')
    }
  }


  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(`${API_URL}/bookings`, {
        firstName: profile.firstName,
        lastName: profile.lastName,
        mobile: profile.mobile,
        email : profile.email,
        programPlan : data?._id,
        category: data?.program.category,
        currency:"INR", 
        qty:"1",
        subscription:data.plan?.allowSubscription
  
      } , {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      navigate('/thankyou', { state: { order: response.data?.body } });

    } catch (error) {
      setFormError(error.response?.data?.errors);
    }
  }

  console.log(formError);
  
  
  return (
    <div className="Cart">
      <ToastContainer />
      <NavBar />
      <div>
        <div className="container">
          <h1>Your Cart</h1>
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-info-box">
                <h2>{data.program?.name}</h2>
                <hr />
                <div className="row">
                  <div className="col-lg-6">
                    <h3>Period</h3>
                    <button>{data.plan?.name}</button>
                  </div>
                  <div className="col-lg-6">
                    <div className="d-flex">
                      <button className='save-btn'>Save 20%</button>
                      <p className='price'>₹{data.salePriceInr}.00</p>
                    </div>
                    <p className='cut-price'>₹{data.mrpInr}.00</p>
                  </div>
                </div>
                {data.plan?.allowSubscription && (
                  <div className="subscription-box">
                    <h3 className='sub-heading'>Subscription</h3>
                    <p>Add subscription to get {data.plan?.subscriptionDiscountPercentage}% extra</p>
                    <div>
                      <div className="d-flex align-items-center">
                        <input
                          type="checkbox"
                          id="subscribe"
                          className="custom-checkbox me-3"
                          checked={isSubscribed}
                          onChange={handleSubscriptionChange}
                        />
                        <label htmlFor="subscribe" className="custom-label">
                          {!isSubscribed ? 'Subscribe Now' : 'Subscribed'}
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="order-form">
                <div className="profile">
                  <div className="d-flex">
                    <div className="d-flex align-items-center">
                      <input
                        type="radio"
                        id="programForMyself"
                        name="programType"
                        className="custom-checkbox me-3"
                        checked={selectedProgram === "myself"}
                        onChange={() => handleProgramChange("myself")}
                      />
                      <label htmlFor="programForMyself" className="custom-label">For Myself</label>
                    </div>
                    <div className="d-flex align-items-center ms-5">
                      <input
                        type="radio"
                        id="programForSomeoneElse"
                        name="programType"
                        className="custom-checkbox me-3"
                        checked={selectedProgram === "someoneElse"}
                        onChange={() => handleProgramChange("someoneElse")}
                      />
                      <label htmlFor="programForSomeoneElse" className="custom-label">For Someone Else</label>
                    </div>
                  </div>

                  <div className="row mt-5">
                    <div className="col-6">
                      <div className="input-box">
                        <label htmlFor="firstName">First Name</label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          placeholder="Enter First Name"
                          value={profile.firstName}
                          onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                          disabled={selectedProgram === "myself"}
                        />
                                {formError.firstName && (
                                    <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                        {formError.firstName}
                                    </div>
                                )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-box">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          placeholder="Enter Last Name"
                          value={profile.lastName}
                          onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                          disabled={selectedProgram === "myself"}
                        />
                                {formError.lastName && (
                                    <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                        {formError.lastName}
                                    </div>
                                )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-box">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Enter Email"
                          value={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          disabled={selectedProgram === "myself"}
                        />
                                {formError.email && (
                                    <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                        {formError.email}
                                    </div>
                                )}
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="input-box">
                        <label htmlFor="mobile">Mobile Number</label>
                        <input
                          type="text"
                          id="mobile"
                          name="mobile"
                          placeholder="Enter Mobile Number"
                          value={profile.mobile}
                          onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                          disabled={selectedProgram === "myself"}
                        />
                                {formError.mobile && (
                                    <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                                        {formError.mobile}
                                    </div>
                                )}

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="pricing-box">
                <div className="cupon-box">
                  <h3>Have a coupon code?</h3>
                  <input type="text" placeholder='Enter coupon code' value={couponCode} onChange={handleCuponChange} />
                  <button onClick={handleADDCupon}>Apply</button>
                  {couponCode ? <p className={cuponData.data?.status === 200 ? 'd-none' : 'text-danger'} >{cuponData.data?.message}</p> : ""}
                  {cupon && cuponData?.status === 200 ?
                    <div className="cuponCode">
                      <div>
                        <h5><FaTag /> {cupon}<span>Applied</span></h5>
                        <p> {cuponData.body?.discountType === "AMOUNT" ? `Save ₹${cuponData.body?.discount}/- ` : `Save ${cuponData.body?.discount}%- `} </p>
                      </div>
                      <button className='remove-btn' onClick={handleRemoveCupon}>Remove</button>

                    </div> : ""}

                </div>
              </div>
              <div className="summary-box">
                <h2>Order Summary</h2>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <p className='text-dark'>{data.program?.name}</p>
                  <span className='fw-bold'>₹{data.salePriceInr}.00</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p>Subscription</p>
                  <span style={{ color: "#0000009a" }}>
                    ₹
                    {
                      isSubscribed
                        ? subcriptionCal
                        : '0.00'
                    }
                  </span>
                </div>
                {cupon ?
                  <div className="d-flex align-items-center justify-content-between">
                    <p>Coupon Discount</p>
                    <span style={{ color: "#0000009a" }}>

                      {
                        cuponData.body?.discountType === "AMOUNT" ? `₹${cuponData.body?.discount}.00` : `${cuponData.body?.discount}%- `
                      }

                    </span>
                  </div> : ''}

                {/* <div className="d-flex align-items-center justify-content-between">
                  <p>Discount</p>
                  <span style={{ color: "#006D5A" }}>- ₹2,799.00</span>
                </div> */}
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <h2>Sub Total</h2>
                  <span className='fw-bold'>₹{isSubscribed ? subTotal : data.salePriceInr + '.00'}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className='text-dark'>Tax & Fees </p>
                  <span>0.00</span>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <h2>Total Amount</h2>
                  <span className='fw-bold'>₹{isSubscribed ? subTotal : data.salePriceInr + '.00'}</span>
                </div>
                <hr />
                <h5 style={{ color: "#006D5A", fontFamily: "futuramdbt" }}>You will save {totalSave} on this plan</h5>
                <Link ><button onClick={handlePlaceOrder} className={`cantinue`}>Checkout</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart;
