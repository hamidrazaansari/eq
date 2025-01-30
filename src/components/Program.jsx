import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../assets/css/hero.css';
import '../assets/css/program.css';
import program2 from '../assets/image/program-1.png';
import progArrow from '../assets/image/arrow1.png';
import progArrow2 from '../assets/image/arrow-2.png';
import ScrollAnimation from 'react-animate-on-scroll';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_URL } from '../utills/BaseUrl';
import { IoPlayCircleOutline } from "react-icons/io5";
import getImageURL from '../utills/getImageURL';
import { Modal } from 'react-bootstrap';
import { ImCancelCircle } from "react-icons/im";

gsap.registerPlugin(ScrollTrigger);

const Program = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);

      // Handlers for showing and hiding the modal
      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

  // Fetch the data from the API
  useEffect(() => {
    axios.get(`${API_URL}/categories?displayOrder=ASC`)
      .then(response => {
        setData(response.data.body);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error.message);
        setLoading(false);
      });
  }, []);

  console.log(data);


  // Horizontal scroll setup, dependent on data loading
  useEffect(() => {
    if (!loading && data.length) {
      const ctx = gsap.context(() => {
        const horizontalSections = gsap.utils.toArray('.horizontal-section');

        // Apply horizontal scroll animation
        gsap.to(horizontalSections, {
          xPercent: -100 * (horizontalSections.length - 1),
          ease: 'none',
          scrollTrigger: {
            trigger: '#container',
            pin: true,
            scrub: 1,
            snap: 1 / (horizontalSections.length - 1),
            end: () => '+=' + document.querySelector('#container').offsetWidth,
          },
        });
      });

      return () => ctx.revert(); // Cleanup on component unmount
    }
  }, [data, loading]);

  return (
    <>

      <div className="container mb-5 position-relative">
        <div className='arrow'><img src={progArrow} alt="" /></div>
        <div className='arrow-point'><img src={progArrow2} alt="" /></div>
        <ScrollAnimation animateIn="fadeInUp">
          <h2>Our <br />
            <span>Programs</span>
          </h2>
        </ScrollAnimation>
      </div>

      <main id="container">
        {data && data.map((program) => {
          const ImgUrl = getImageURL(program.image)
          return (
            <section key={program._id} className="horizontal-section">
              <div className="prog">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="img-box">
                      {/* Replace the image URL */}
                      <img src={program.name === 'Personalized Training Program'?program2 : ImgUrl} alt={program.name} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="content">
                      <h3>{program.name}</h3>
                      <p>{program.shortDescription}</p>
                      <ul>
                        {/* Map over the usp array */}
                        {program.usp.map((feature) => (
                          <li key={feature._id}>
                            <i className={feature.icon}></i>
                            <span>{feature.title}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="d-flex">
                        <Link to={`/category/${program._id}`}><button className='program-btn'>Explore The Plan</button></Link>
                        <Link ><button className='watch-btn' onClick={handleShow}>Watch The Video <IoPlayCircleOutline /> </button></Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Modal show={show} className='aboutVideo' onHide={handleClose} centered>
                <Modal.Body>
                    <button className='modleCBtn' onClick={handleClose}><ImCancelCircle /> </button>
                        <iframe width="100%" height="500" src={program?.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </Modal.Body>
            </Modal>
            </section>
          )
        }
        )}

      </main>
    </>
  );
};

export default Program;
