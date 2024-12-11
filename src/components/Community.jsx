import React, {useState} from 'react';
import '../assets/css/community.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import community1 from '../assets/image/community1.png'
import community2 from '../assets/image/community2.png'
import community3 from '../assets/image/community3.png'
import community4 from '../assets/image/community4.png'
import community5 from '../assets/image/community5.png'
import community6 from '../assets/image/community6.png'
import community7 from '../assets/image/community7.png'
import community8 from '../assets/image/community8.png'
import community9 from '../assets/image/community9.png'
import community10 from '../assets/image/community10.png'
import ScrollAnimation from 'react-animate-on-scroll';



const Community = () => {

  const [currentText, setCurrentText] = useState("Bollywood Celebrity");

  const textArray = [
    "Bollywood Celebrity",
    "Meet the team",
    "Brand Collaboration",
    "Corporate Synergies "
  ];

  const settings = {
    dots: true, 
    infinite: true,
    speed: 500,
    slidesToShow: 1, 
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 2000,
    afterChange: (index) => setCurrentText(textArray[index]), // Update text based on current slide
  };


  return (
    <>
        <div className="container">
        <ScrollAnimation animateIn="fadeInUp">
        <div className="community-heading">
            <h2>community <br /> <span>section</span></h2>
            <h4>{currentText}</h4>
        </div>
        </ScrollAnimation>
        <Slider {...settings}>
            <div className="container-slider">
                <div className="row gap-1 mx-auto">
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img1">
                            <img src={community1} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img2">
                            <img src={community2} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img3">
                            <img src={community3} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img4">
                            <img src={community4} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img5">
                            <img src={community5} alt="yoga image of celebrity" />   
                        </div>
                        </ScrollAnimation>
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img6">
                            <img src={community6} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img7">
                            <img src={community7} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img8">
                            <img src={community8} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img9">
                            <img src={community9} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img10">
                            <img src={community10} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                </div>
            </div>
            <div className="container-slider">
            <div className="row gap-1 mx-auto">
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img1">
                            <img src={community1} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img2">
                            <img src={community2} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img3">
                            <img src={community3} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img4">
                            <img src={community4} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img5">
                            <img src={community5} alt="yoga image of celebrity" />   
                        </div>
                        </ScrollAnimation>
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img6">
                            <img src={community6} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img7">
                            <img src={community7} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img8">
                            <img src={community8} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img9">
                            <img src={community9} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img10">
                            <img src={community10} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                </div>
            </div>
            <div className="container-slider">
            <div className="row gap-1 mx-auto">
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img1">
                            <img src={community1} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img2">
                            <img src={community2} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img3">
                            <img src={community3} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img4">
                            <img src={community4} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img5">
                            <img src={community5} alt="yoga image of celebrity" />   
                        </div>
                        </ScrollAnimation>
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img6">
                            <img src={community6} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img7">
                            <img src={community7} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img8">
                            <img src={community8} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img9">
                            <img src={community9} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img10">
                            <img src={community10} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                </div>
            </div>
            <div className="container-slider">
            <div className="row gap-1 mx-auto">
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img1">
                            <img src={community1} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img2">
                            <img src={community2} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img3">
                            <img src={community3} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img4">
                            <img src={community4} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img5">
                            <img src={community5} alt="yoga image of celebrity" />   
                        </div>
                        </ScrollAnimation>
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img6">
                            <img src={community6} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img7">
                            <img src={community7} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img8">
                            <img src={community8} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img9">
                            <img src={community9} alt="yoga image of celebrity" />   
                        </div>
                     </ScrollAnimation>   
                    </div>
                    <div className="col-2">
                    <ScrollAnimation animateIn="fadeIn">
                        <div className="community-img10">
                            <img src={community10} alt="yoga image of celebrity" />   
                        </div>
                    </ScrollAnimation>    
                    </div>
                </div>
            </div>
        </Slider>
      </div>
    </>
  );
};

export default Community;
