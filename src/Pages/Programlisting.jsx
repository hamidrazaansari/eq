import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import ProgImg from '../assets/image/personalize-prog.png'
import '../assets/css/personalize-prog.css'
import { IoMdStar } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import Slider from 'react-slick'
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import ScrollAnimation from 'react-animate-on-scroll';
import Checkmarks from '../assets/image/checkmark.png'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import parse from 'html-react-parser';
import { API_URL } from '../utills/BaseUrl'
import getImageURL from '../utills/getImageURL';
import { UrlContainer } from '../context/UrlContainer'

// Custom Prev Arrow
const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="custom-prev-btn" onClick={onClick}>
        <HiOutlineArrowLongLeft />
      </button>
    );
  };
  
  // Custom Next Arrow
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button className="custom-next-arrow" onClick={onClick}>
        <HiOutlineArrowLongRight />
      </button>
    );
  };


function Programlisting() {
    const [data , setData] = useState('')
    const [loading , setLoading] = useState(true);

    console.log(localStorage.getItem('urlHistory'));


    const {id} = useParams();

    useEffect(() => {
        axios.get(`${API_URL}/programs?category=${id}&displayOrder=ASC`)
          .then(response => {
            setData(response.data.body);
            setLoading(false);
          })
          .catch(error => {
            console.error("Error fetching data:", error.message);
            setLoading(false);
          });
      }, []);

    const settings = {
        dots: true, 
        infinite: true,
        speed: 500,
        slidesToShow: 3, 
        slidesToScroll: 3,
        initialSlide: 0,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
              breakpoint: 1024, // Large tablets & small desktops
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 768, // Tablets
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true
              }
            },
            {
              breakpoint: 480, // Mobile devices
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: true,
              }
            }
          ]

      };
    
    return (
        <div className='personalize-program' >
            <UrlContainer/>
            <NavBar />
            <section >
                <div className="container px-5 mobile-padding">
                    <h2>Personalized Training  <span>Program</span> </h2>
                    <div className="breadcrumb">
                        <a href="/">Homepage</a>  <span></span>
                        <a href="/">Personalized Training Program</a>
                    </div>
                </div>
                <div className="container px-5 mobile-padding">
                    <div className="row">
                        {
                            data && data.map((item)=>{
                                const imageUrl = item.defaultImage ? getImageURL(item.defaultImage) : '';
                                
                                return(
                                    <div className="col-lg-4 col-sm-6 col-12">
                                    <div className="program-box">
                                        <img src={imageUrl} className='program-img' alt="Personal Training Trail" />
                                        <h3>{item.name}</h3>
                                        <div className='para mb-4 mt-2'>{parse(item.descriptions.slice(0,200 ))}</div>
                                        <div className="point">
                                            <div className="row  mb-3 px-3 point-row">
                                                {item.usp && item.usp.map((usp)=>(
                                                    <>
                                                <div className="col-md-6 p-0 py-2 d-flex align-items-center justify-content-start">
                                                    <img src={Checkmarks} alt="" />
                                                    <p className=''>{usp}</p>
                                                </div>
                                                    </>
                                                ))}

                                            </div>
                                        </div>
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
                <div className="container px-5">
                    <div className="other-plan">
                        <h2 className='other-plan-heading'>See Others plans</h2>

                        <Slider {...settings}>
                            <div className="slide">
                            <div className="program-box">
                                <img src={ProgImg} alt="Personal Training Trail" />
                                <h3>Hybrid Training Program</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur hjgg adipiscing elit, sed do eiusmod tempor lorem </p>
                                <button className='BookNowBtn '>Explore plan</button>

                            </div>
                            </div>
                            <div className="slide">
                            <div className="program-box">
                                <img src={ProgImg} alt="Personal Training Trail" />
                                <h3>Corporate Wellness Program</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur hjgg adipiscing elit, sed do eiusmod tempor lorem </p>
                                <button className='BookNowBtn '>Explore plan</button>
                            </div>
                            </div>
                            <div className="slide">
                            <div className="program-box">
                                <img src={ProgImg} alt="Personal Training Trail" />
                                <h3>Group Training Program</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur hjgg adipiscing elit, sed do eiusmod tempor lorem </p>
                                <button className='BookNowBtn '>Explore plan</button>

                            </div>
                            </div>
                            <div className="slide">
                            <div className="program-box">
                                <img src={ProgImg} alt="Personal Training Trail" />
                                <h3>Hybrid Training Program</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur hjgg adipiscing elit, sed do eiusmod tempor lorem </p>
                                <button className='BookNowBtn '>Explore plan</button>

                            </div>
                            </div>
                        </Slider>
                   </div>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default Programlisting