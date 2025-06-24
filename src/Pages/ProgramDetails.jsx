import React , {useState , useEffect , useRef} from 'react'
import NavBar from '../components/NavBar'
import ProgramDet from '../assets/image/program-details.png'
import SelectSearch from 'react-select-search';
import '../assets/css/program-details.css'
import '../assets/css/hero.css'
import '../assets/css/personalize-prog.css'
import Accordion from 'react-bootstrap/Accordion';
import ScrollAnimation from 'react-animate-on-scroll';
import CircularSlider from '../components/CircularSlider';
import ProgImg from '../assets/image/personalize-prog.png'
import { HiOutlineArrowLongRight } from "react-icons/hi2";
import { HiOutlineArrowLongLeft } from "react-icons/hi2";
import Slider from 'react-slick';
import Footer from '../components/Footer';
import { useParams  ,Link } from 'react-router-dom';
import axios from 'axios';
import parse from 'html-react-parser'
import { API_URL } from '../utills/BaseUrl';
import { UrlContainer } from '../context/UrlContainer';
import getImageURL from '../utills/getImageURL';

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


function ProgramDetails() {

  const [data , setData] = useState('')
    const [loading , setLoading] = useState(true);

    const {id} = useParams();

    console.log(localStorage.getItem('urlHistory'));

    useEffect(() => {
        axios.get(`${API_URL}/programs/${id}`)
          .then(response => {
            setData(response.data.body);
            setLoading(false);
          })
          .catch(error => {
            console.error("Error fetching data:", error.message);
            setLoading(false);
          });
      }, []);
      console.log(data)

      const [isFloating, setIsFloating] = useState(false);
      const programDetailsRef = useRef(null);
      const floatingPriceRef = useRef(null);
    
      useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) {
                setIsFloating(true);  // Start floating
              } else {
                setIsFloating(false); // Reset to normal
              }
            });
          },
          { threshold: 0.1 }
        );
    
        if (programDetailsRef.current) {
          observer.observe(programDetailsRef.current);
        }
    
        return () => {
          if (programDetailsRef.current) {
            observer.unobserve(programDetailsRef.current);
          }
        };
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
    

  const options = [
    { name: '1 Month ', value: 'sv' },
    { name: '3 Month ', value: 'e' },
    { name: '6 Month ', value: 'en' },
    { name: '1 year', value: 'n' },

  ];

                                  const imageUrl = data.defaultImage ? getImageURL(data.defaultImage) : '';
  
  return (
    <div className='progrmDetails'>
      <UrlContainer/>
      <NavBar />
      <section className='program-details' ref={programDetailsRef} >
        <div className="container">
          <h2 className='prog-heading'>{data&& data.category.name}</h2>
          <div className="row">
            <div className="col-lg-6 d-flex align-items-center justify-content-end flex-column">
              <div className="img-box">
                <img src={imageUrl} alt={data.name} />
              </div>
            </div>
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <div className="prising-box">
                <p>{data.name}</p>
                <div className="d-flex align-items-center justify-content-between days-info">
                  <h4>1 Months</h4>
                <div className="timelabal">{data.days} Days</div>
                </div>
                <hr />
                <label htmlFor="Starting from">Starting from</label>
                <h3><span>₹</span>{data.amountPerMonth}<span className='star'>*</span><span className='mo'>/mo</span></h3>
                <Link to={`/plans/${data._id}`}><button className='continew-btn'>Continue</button></Link> 
              </div>
            </div>
          </div>
        </div>

      </section>
      <section className='program-info'>
        <div className="container">
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>
                <div className="row w-100">
                  <div className="col-12 d-flex align-items-center justify-content-start">
                    <h4 className='active'>About the Plans</h4>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className="row w-100">
                  <div className="col-12 ">
                    <div className="about-plan ">
                      {parse(data && data.descriptions) }
                    </div>

                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>
                <div className="row w-100">
                  <div className="col-12 d-flex align-items-center justify-content-start">
                    <h4 className='active'>Conclusion</h4>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className="row w-100">
               <div className="col-lg-4">
                    <div className="about-plan ">
                      {parse(data && data.highlights)}
                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                <div className="row w-100">
                  <div className="col-12 d-flex align-items-center justify-content-start">
                    <h4 className='active'>Requirements</h4>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className="row w-100">
                <div className="col-lg-4 ">
                    <div className="about-plan border-0 ">
                      {
                        data.requirements && data.requirements.map((req)=>{
                          return(
                            <div className="d-flex"> <span className='circle'></span> <p>{req.title}</p></div>
                          )
                        })
                      }

                    </div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Frequently Asked Questions</Accordion.Header>
              <Accordion.Body>
              <section className='faq mt-0' style={{background:"transparent"}}>
                    <div className="accordion-box">
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header className='accordion-btn'>Who all can benefit from this offering?</Accordion.Header>
                                <Accordion.Body>Anyone can join. Whether you are at a beginner or advanced level, we will customize the sessions for you to make them relevant.</Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header className='accordion-btn'>What are the payment options available?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header className='accordion-btn'>If you have any major pre-existing health conditions,can i purchase this plan</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header className='accordion-btn'>what if i`ve never done yoga before? can i still join these sessions?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="4">
                                <Accordion.Header className='accordion-btn'>Will there be a community?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="5">
                                <Accordion.Header className='accordion-btn'>Who is going to assist with queries?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="6">
                                <Accordion.Header className='accordion-btn'>what if i`ve never done yoga before? can i still join these sessions?</Accordion.Header>
                                <Accordion.Body>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                    culpa qui officia deserunt mollit anim id est laborum.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
            </section>

              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </section>
      <section className='testimonials prog-det-testi'>
        <ScrollAnimation animateIn="fadeInUp">
          <h2>Testimonials</h2>
        </ScrollAnimation>
        <div className="slider-container">
          <div className="container">
            <CircularSlider />
          </div>
        </div>
      </section>
      <section className='see-more'>
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
      <section   className={`floating-price ${isFloating ? 'floating' : ''}`}
        ref={floatingPriceRef}>
        <div className="container">
          <div className="green-box">
          <Link to={`/plans/${data._id}`}><button>Continue</button></Link>
              <div>
                <span>{data.name}</span>
              <p>₹{data.amountPerMonth}<i>*/mo</i></p>
              </div>
          </div>
        </div>
      </section>
      <section className="progDet">

      <Footer/>
      </section>

    </div>
  )
}

export default ProgramDetails