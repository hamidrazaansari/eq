import React, { useState } from 'react';
import '../assets/css/community.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ScrollAnimation from 'react-animate-on-scroll';

import community1 from '../assets/image/community1.png';
import community2 from '../assets/image/community2.png';
import community3 from '../assets/image/community3.png';
import community4 from '../assets/image/community4.png';
import community5 from '../assets/image/community5.png';
import community6 from '../assets/image/community6.png';
import community7 from '../assets/image/community7.png';
import community8 from '../assets/image/community8.png';
import community9 from '../assets/image/community9.png';
import community10 from '../assets/image/community10.png';

const Community = () => {
  const [currentText, setCurrentText] = useState("Bollywood Celebrity");

  const textArray = [
    "Celebrity Spotlight",
    "Meet #EQTeam",
    "Creative Partnerships",
    "Corporate Synergies"
  ];

  const images = [community1, community2, community3, community4, community5, community6, community7, community8, community9, community10];

  const renderImages = () => {
    return images.map((img, index) => (
      <div key={index} className="col-lg-2 col-6">
        <ScrollAnimation animateIn="fadeIn">
          <div className={`community-img${index + 1}`}>
            <img src={img} alt="yoga image of celebrity" />
          </div>
        </ScrollAnimation>
      </div>
    ));
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    afterChange: (index) => setCurrentText(textArray[index % textArray.length]), // Prevent index out-of-bounds
  };

  return (
    <div className="container">
      <ScrollAnimation animateIn="fadeInUp">
        <div className="community-heading">
          <h2>EQ Wellness <br /> <span>Circle</span></h2>
          <h4>{currentText}</h4>
        </div>
      </ScrollAnimation>
      
      <Slider {...settings}>
        {Array(3).fill().map((_, i) => (
          <div key={i} className="container-slider">
            <div className="row gap-1 mx-auto ">
              {renderImages()}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Community;
