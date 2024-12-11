import React from 'react'
import NavBar from '../components/NavBar'
import Payments from '../assets/image/payment-box.png'
import '../assets/css/payment.css'

function Payment() {
  return (
    <div className='payments'>
        <NavBar/>
        <section className='payment-main'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="payment-box">
                        <img src={Payments} alt="" />        
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="summary-box">
                            <h2>Order Summary</h2>
                            <hr />
                            <div className="d-flex align-items-center justify-content-between">
                                <p className='text-dark'>Personal Training Trail</p>
                                <span className='fw-bold'>₹17,998.00</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <p>Subscription</p>
                                <span style={{color:"#0000009a"}}>607.00</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <p>Discount</p>
                                <span style={{color:"#006D5A"}}>- ₹2,799.00</span>
                            </div>
                            <hr />
                            <div className="d-flex align-items-center justify-content-between">
                                <h2>Sub Total</h2>
                                <span className='fw-bold'>14,582.00</span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                                <p className='text-dark'>Tax & Fees </p>
                                <span>0.00</span>
                            </div>
                            <hr />
                            <div className="d-flex align-items-center justify-content-between">
                                <h2>Total Amount</h2>
                                <span className='fw-bold'>₹14,179.00</span>
                            </div>
                            <hr />
                                <h5 style={{color:"#006D5A" , fontFamily:"futuramdbt"}}>You will save ₹2,799 on this plan</h5>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Payment