import React, { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import '../assets/css/cart.css'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import { FaTag } from "react-icons/fa6";
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-bootstrap';
import PhoneNumberInput from '../components/PhoneNumberInput';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Modal } from 'react-bootstrap';
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from 'moment';
import dayjs from 'dayjs';
import CountryCode from '../components/CountryCode';




function Cart() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [profile, setProfile] = useState({ firstName: '', lastName: '', email: '', countryCode: '', mobile: '', dob: '', gender: '' });
  const [couponCode, setCouponCode] = useState('');
  const [cupon, setCupon] = useState('')
  const [data, setData] = useState('');
  const [cuponData, setCuponData] = useState('');
  const [selectedProgram, setSelectedProgram] = useState("myself");
  const [formError, setFormError] = useState('')
  const [discountPrice, setDisCountPrice] = useState(null);
  const [discountPercentage, setDiscountPercentage] = useState(null);
  const [show, setShow] = useState(false);


  // Handlers for showing and hiding the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const { id } = useParams();
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate()

  useEffect(()=>{
    if (token) {
      navigate(`/cart/${id}`)
    }
    else {
      navigate('/signup')
    }
  } , [])

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

  const CountryCodeChange = (countryCode) => {
    setProfile({ ...profile, countryCode: countryCode })
}

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
    if (event.target.checked) {
      handleShow();
    }
    else {
      handletermchange(event)
    }
  };

  const handletermchange = (e) => {
    setIsSubscribed(e.target.checked);
    handleClose()
  }

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
  if (isSubscribed) {
    totalSave += subcriptionCal;
  }
  else {
    totalSave
  }

  let subTotal = discountPrice - subcriptionCal;

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

  const handleInputChange = (e) => {
    setProfile({ ...profile, gender: e.target.value })
  }


  const handlePlaceOrder = async () => {

    try {
      const response = await axios.post(`${API_URL}/bookings`, {
        firstName: profile.firstName,
        lastName: profile.lastName,
        countryCode: profile.countryCode,
        mobile: profile.mobile,
        email: profile.email,
        dob: profile.dob,
        gender: profile.gender,
        programPlan: data?._id,
        category: data?.program.category,
        currency: "INR",
        qty: "1",
        subscription: data.plan?.allowSubscription

      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      navigate('/thankyou', { state: { order: response.data?.body } });

    } catch (error) {
      setFormError(error.response?.data?.errors);
      console.log(error.response?.data);

    }
  }

  useEffect(() => {
    if (data && data.mrpInr) {
      const discountedPrice = data.mrpInr - data.salePriceInr;
      const discountPercentage = (discountedPrice / data.mrpInr) * 100;
      setDisCountPrice(discountedPrice.toFixed(2)); // Round to 2 decimal places
      setDiscountPercentage(discountPercentage.toFixed(2))
    }
  }, [data]);

  totalSave += parseFloat(discountPrice)

  const totalPrice = data.mrpInr - totalSave
  const gstprice = totalPrice * 1.18
  const gstAmount = totalPrice * 0.18


  const handleDateChange = (name) => {
    const formatedeDate = moment(name.$d).format('MM/DD/YYYY')
    setProfile({ ...profile, dob: formatedeDate })
  };

  console.log(profile);
  
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
                      <button className='save-btn'>Save {discountPercentage}%</button>
                      <p className='price'>₹{data.salePriceInr}</p>
                    </div>
                    <p className='cut-price'>₹{data.mrpInr}</p>
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
                    <div className="col-lg-6">
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
                    <div className="col-lg-6">
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
                    <div className="col-lg-6">
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

                    <div className="col-lg-6">
                      <div className="input-box">
                        <label htmlFor="countryCode">Mobile Number</label>
                        <div className="mobile-input">
                          <CountryCode
                              CountryCodeChange={CountryCodeChange}
                              defaultCountryCode={profile.countryCode}
                          />
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
                    <div className="col-lg-6 p-0">
                      <div className="">
                        <label htmlFor="date" className="dob-label">DOB</label>
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
                        {formError.dob && (
                          <div style={{ color: 'red', fontSize: '10px', position: 'absolute', top: '346px', left: '31px' }}>
                            {formError.dob}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="input-box">
                        <h6>Gender</h6>
                        <div className="gender">
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
                        {formError.gender && (
                          <div style={{ color: 'red', fontSize: "11px", position: "absolute", top: "65px" }}>
                            {formError.gender}
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
                        <p> {cuponData.body?.discountType === "AMOUNT" ? `Save ₹${cuponData.body?.discount || data.salePriceInr}/- ` : `Save ${cuponData.body?.discount}%- `} </p>
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
                  <span className='fw-bold'>₹{data.salePriceInr}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p>Subscription Discount</p>
                  <span style={{ color: "#0000009a" }}>
                    -₹
                    {
                      isSubscribed
                        ? subcriptionCal
                        : '0'
                    }
                  </span>
                </div>
                {cupon ?
                  <div className="d-flex align-items-center justify-content-between">
                    <p>Coupon Discount</p>
                    <span style={{ color: "#0000009a" }}>

                      -{
                        cuponData.body?.discountType === "AMOUNT" ? `₹${cuponData.body?.discount}` : `${cuponData.body?.discount}%- `
                      }

                    </span>
                  </div> : ''}

                <div className="d-flex align-items-center justify-content-between">
                  <p>Discount</p>
                  <span>-{discountPrice}</span>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <h2>Sub Total</h2>
                  <span className='fw-bold'>₹{totalPrice}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className='text-dark'>GST Fee (18%) </p>
                  <span style={{ color: "#006D5A" }}>+{gstAmount}</span>
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <p className='text-dark'>Processing Fee (0%) </p>
                  <span>0.00</span>
                </div>
                <hr />
                <div className="d-flex align-items-center justify-content-between">
                  <h2>Total Amount</h2>
                  <span className='fw-bold'>₹{gstprice}</span>
                </div>
                <hr />
                <h5 style={{ color: "#006D5A", fontFamily: "futuramdbt" }}>You will save {totalSave || discountPrice} on this plan</h5>
                <Link ><button onClick={handlePlaceOrder} className={`cantinue`}>Checkout</button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      <Modal show={show} onHide={handleClose} className='termConditionModal' centered>
        <Modal.Body>
          <h1 className='text-center'>Terms And <span>Conditions</span></h1>
          <p> These Subscription Terms and Conditions ("Terms") govern your subscription to Equilibrium our services, including but not limited to online yoga classes, workshops, and digital content.
            By subscribing, you confirm that you are at least 18 years old or have the consent of a legal guardian.</p>

          <h2>Subscription Plans</h2>
          <h3>Types of Plans</h3>
          <p>We offer multiple subscription plans, including monthly, quarterly, and annual memberships. Details of each plan, including pricing, are listed on our website.
          </p>
          <h3>Changes to Plans</h3>
          <p>We reserve the right to change subscription pricing or features. Any changes will be communicated to subscribers at least 30 days in advance.
          </p>
          <h2>Billing and Payments</h2>
          <h3> Payment Methods</h3>
          <p>We accept payments via [Credit/Debit Cards, PayPal, or any other methods]. All transactions are secure and processed through trusted payment gateways.
          </p>
          <h3>Auto-Renewal</h3>
          <p>Subscriptions are automatically renewed at the end of the billing cycle unless canceled by you. You authorize us to charge your selected payment method for recurring fees.
          </p>
          <h3>Failed Payments</h3>
          <p>If a payment fails, we will notify you. Access to our services may be suspended until the payment is successfully processed.
          </p>
          <h3>Refund Policy</h3>
          <p>All subscription fees are non-refundable unless otherwise stated. Refunds may be issued at our discretion in cases of technical issues or errors.
          </p>
          <h2>Cancellation Policy</h2>
          <p>You may cancel your subscription at any time by visiting your account settings or contacting our support team.
          </p>
          <p>Cancellations will take effect at the end of the current billing cycle. You will not be charged for subsequent cycles but will retain access to the services until the current cycle ends.
          </p>
          <h3>Use of Services</h3>
          <p>Subscriptions are for personal, non-commercial use only. Sharing your account or content with others is strictly prohibited.</p>
          <p>We reserve the right to suspend or terminate your subscription if you violate these terms or misuse our services.</p>
          <h2>Privacy Policy</h2>
          <p>Your personal information is handled in accordance with our [Privacy Policy Link]. By subscribing, you consent to the collection and use of your data as described in the policy.</p>
          <div className="d-flex align-items-center justify-content-center">
            <input
              type="checkbox"
              id="term"
              className="custom-checkbox me-3"
              checked={isSubscribed}
              onChange={handletermchange}
            />
            <label htmlFor="term" className="custom-label">
              I accept term and conditions
            </label>
          </div>

        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Cart;
