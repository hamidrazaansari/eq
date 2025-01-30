import React , {useState} from 'react'
import { Link } from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { GoMail } from "react-icons/go";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import ScrollAnimation from 'react-animate-on-scroll';
import '../assets/css/footer.css'
import axios from 'axios';
import { API_URL } from '../utills/BaseUrl';
import { toast, ToastContainer } from 'react-toastify';
import { FaWhatsapp } from "react-icons/fa";
import { CiLinkedin } from "react-icons/ci";
import { CiYoutube } from "react-icons/ci";
import { CiFacebook } from "react-icons/ci";
import { FaLinkedinIn } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";








function Footer() {
    const [email , setEmail]=useState('')
    const token = localStorage.getItem("authToken");

    const handleSubmit =async(e)=>{
e.preventDefault()
try {
    const response = await axios.post(`${API_URL}/newsletters`, {email},
        {
            headers: {
              'Authorization': `Bearer ${token}`,
            }
          }
    )
    toast.success(response.data?.message)
    
} catch (error) {
    toast.error(error.response?.data?.message)
}
    }
    return (
        <div>
            <ToastContainer/>
            <section class="mailing">
                <div className="container">
                    <ScrollAnimation animateIn="fadeInUp">
                        <h2 className='text-center'>Join the Equilibrium Yoga Mailing List</h2>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeInUp">
                        <p className='text-center'>First to Know: Offers, Programs, Events, Yoga Tips</p>
                    </ScrollAnimation>
                    {/* <ScrollAnimation animateIn="fadeInUp">   */}
                    <form action="" className='d-flex align-items-center justify-content-center'>
                        <input type="text" placeholder='Email Address' className='form-control' value={email} onChange={(e)=> setEmail(e.target.value)} />
                        <button className='form-submit' onClick={handleSubmit} >Subscribe</button>
                    </form>
                    {/* </ScrollAnimation>     */}
                </div>
            </section>
            <section className='footer'>
                <footer>
                    <div className="container">
                        <div className="row mx-auto">
                            <div className="col-lg-3">
                                <ScrollAnimation animateIn="fadeInUp">
                                    <h2>Contact Information</h2>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp">
                                    <ul className="addrss">
                                        <li className='d-flex align-items-center'>
                                            <span><CiLocationOn className='fs-3' style={{ marginRight: "-7px", position: "relative", right: "4px", bottom: "3px" }} /></span>
                                            <a href="javascript:void()" className='nav-link my-1'>1/3, MP Colony Road, Vishal Enterprises, Mukta Prasad Nagar, Bikaner, Rajasthan 334004.</a>
                                        </li>
                                        <li className='d-flex align-items-center'>
                                            <span className='adjst'><FiPhone /></span>
                                            <a href="javascript:void()" className='nav-link my-1'>+91-9769830324 (5:00 AM to 10:00 PM IST)</a>
                                        </li>
                                        <li className='d-flex align-items-center'>
                                            <span className='adjst'><GoMail /></span>
                                            <a href="javascript:void()" className='nav-link my-1'>gunjan@eqyoga.in, enquiry@eqyoga.in </a>
                                        </li>
                                    </ul>
                                </ScrollAnimation>
                            </div>
                            <div className="col-lg-3 d-flex flex-column align-items-center ">
                                <ScrollAnimation animateIn="fadeInUp">
                                    <h2>Useful Links</h2>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp">
                                    <ul className="addrss">
                                        <li>
                                            <a href="javascript:void()" className='nav-link mt-0'>About Us</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void()" className='nav-link'>Yoga Plans</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void()" className='nav-link'>Talk To A Yoga Expert</a>
                                        </li>
                                    </ul>
                                </ScrollAnimation>
                            </div>
                            <div className="col-lg-3 d-flex flex-column align-items-center">
                                <ScrollAnimation animateIn="fadeInUp">
                                    <h2>Information</h2>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp">
                                    <ul className="addrss">
                                        <li>
                                            <a href="javascript:void()" className='nav-link mt-0'>Certificate</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void()" className='nav-link'>Privacy Policy</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void()" className='nav-link'>Service Terms</a>
                                        </li>
                                    </ul>
                                </ScrollAnimation>
                            </div>
                            <div className="col-lg-3  d-flex flex-column align-items-center">
                                <ScrollAnimation animateIn="fadeInUp">
                                    <h2 className='ms-5'>Social Media</h2>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp">
                                    <div className="ssocal-icon my-0 ms-2">
                                        <a href="https://wa.me/919769830324" target='_blank'><span><FaWhatsapp /></span></a>  
                                        <a href="https://www.instagram.com/kamragunjan"  target='_blank'><span><FaInstagram /></span></a>  
                                        <a href="https://www.linkedin.com/company/eqmindandyoga/"  target='_blank'><span><FaLinkedinIn /></span></a>  
                                        <a href="https://www.youtube.com/@gunjankamra"  target='_blank'><span><FaYoutube /></span></a>  
                                        <a href="www.facebook.com/equilibriummindandyoga"  target='_blank'><span><FaFacebookF /></span></a>  
                                    </div>
                                </ScrollAnimation>

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 footer-bottom">
                                <p>© Copyright 2024 Equilibrium. All Rights Reserved.</p>
                            </div>
                        </div>

                    </div>
                </footer>
            </section>
        </div>
    )
}

export default Footer