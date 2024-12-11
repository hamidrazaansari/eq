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
    dots: false, 
    infinite: true,
    speed: 500,
    slidesToShow: 3, 
    slidesToScroll: 3,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  const options = [
    { name: '1 Month ', value: 'sv' },
    { name: '3 Month ', value: 'e' },
    { name: '6 Month ', value: 'en' },
    { name: '1 year', value: 'n' },

  ];
  return (
    <div>
      <NavBar />
      <section className='program-details' ref={programDetailsRef} >
        <div className="container">
          <h2 className='prog-heading'>{data&& data.category.name}</h2>
          <div className="row">
            <div className="col-lg-6 d-flex align-items-center justify-content-end flex-column">
              <div className="img-box">
                <img src={data && data.defaultImage.replace('http://localhost:5500', 'http://13.233.121.43:5500')} alt={data.name} />
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
                  <div className="col-4 d-flex align-items-center justify-content-start">
                    <h4 className='active'>About the Plans</h4>
                  </div>
                  <div className="col-4 d-flex align-items-center justify-content-center">
                    <h4>Highlights</h4>
                  </div>
                  <div className="col-4 d-flex align-items-center justify-content-center">
                    <h4>Requirments</h4>
                  </div>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className="row w-100">
                  <div className="col-4 ">
                    <div className="about-plan ">
                      {parse(data && data.descriptions) }
                    </div>

                  </div>
                  <div className="col-4">
                    <div className="about-plan ">
                      {parse(data && data.highlights)}
                    </div>
                  </div>
                  <div className="col-4 ">
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
            <Accordion.Item eventKey="1">
              <Accordion.Header>What you will get 12 week plan</Accordion.Header>
              <Accordion.Body>
                      {parse(data && data.benefits)}
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>How it works?</Accordion.Header>
              <Accordion.Body>
              {parse(data && data.howItWorks)}

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