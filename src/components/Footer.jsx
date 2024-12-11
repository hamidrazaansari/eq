import React from 'react'
import { Link } from 'react-router-dom'
import { CiLocationOn } from "react-icons/ci";
import { FiPhone } from "react-icons/fi";
import { GoMail } from "react-icons/go";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import ScrollAnimation from 'react-animate-on-scroll';
import '../assets/css/footer.css'




function Footer() {
    return (
        <div>
            <section class="mailing">
                <div className="container">
                    <ScrollAnimation animateIn="fadeInUp">
                        <h2 className='text-center'>Join the Equilibrium Mailing List</h2>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeInUp">
                        <p className='text-center'>Be the first to hear about competitions & offers.</p>
                    </ScrollAnimation>
                    {/* <ScrollAnimation animateIn="fadeInUp">   */}
                    <form action="" className='d-flex align-items-center justify-content-center'>
                        <input type="text" placeholder='Email Address' className='form-control' />
                        <button className='form-submit '>Subscribe</button>
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
                                            <a href="javascript:void()" className='nav-link my-1'>Equilibrium  Pvt Ltd, Sector - 3, Dwarka, Mumbai - 110078</a>
                                        </li>
                                        <li className='d-flex align-items-center'>
                                            <span className='adjst'><FiPhone /></span>
                                            <a href="javascript:void()" className='nav-link my-1'>+91 654725844 (9:00am to 7:00pm)</a>
                                        </li>
                                        <li className='d-flex align-items-center'>
                                            <span className='adjst'><GoMail /></span>
                                            <a href="javascript:void()" className='nav-link my-1'>info@equilibrium.com</a>
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
                                            <a href="javascript:void()" className='nav-link mt-0'>About us</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void()" className='nav-link'>Yoga plans</a>
                                        </li>
                                        <li>
                                            <a href="javascript:void()" className='nav-link'>Talk to yoga expert</a>
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
                                            <a href="javascript:void()" className='nav-link'>Terms Of Services</a>
                                        </li>
                                    </ul>
                                </ScrollAnimation>
                            </div>
                            <div className="col-lg-3  d-flex flex-column align-items-center">
                                <ScrollAnimation animateIn="fadeInUp">
                                    <h2 className='ms-5'>Social media</h2>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn="fadeInUp">
                                    <div className="ssocal-icon my-0 ms-2">
                                        <span><FaFacebookF /></span>
                                        <span><FaTwitter /></span>
                                        <span><FaInstagram /></span>
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