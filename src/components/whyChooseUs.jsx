import React, { useState, useRef } from 'react';
import whychooseus1 from '../assets/image/why-chooseus-img.png';
import whychooseus2 from '../assets/image/program-1.png';
import whychooseus3 from '../assets/image/about.png'; 
import '../assets/css/hero.css';
import ScrollAnimation from 'react-animate-on-scroll';

const WhyChooseUs = () => {
    const [activePoint, setActivePoint] = useState(0); 
    const pointsRef = useRef([]);
    const [isClicked, setIsClicked] = useState(false);

    // Function to handle point click
    const handleClick = (index) => {
      setActivePoint(index);
      setIsClicked(true); // Set click flag to true
    };
  
    // Points data
    const points = [
      { 
        title: 'Universal Platform', 
        description: 'Organized and unified platform for all goals, ages, genders.', 
        img: whychooseus1,
        para1: 'A unified platform offering comprehensive support for yoga, nutrition, and lifestyle. It provides integrated resources and guidance to enhance overall well-being, making it easy to achieve a balanced and healthy lifestyle in one convenient solution.',
        para2: 'Platform offering comprehensive support for yoga, nutrition, and lifestyle. It provides integrated resources and guidance to enhance overall.'
      },
      { 
        title: 'Holistic Wellness', 
        description: 'One stop solution focusing on yoga, nutrition and lifestyle together.', 
        img: whychooseus1,
        para1: 'Our holistic wellness programs focus on integrating yoga, nutrition, and lifestyle changes for a healthier living.',
        para2: 'We offer a comprehensive and cohesive approach to well-being that fits every lifestyle.'
      },
      { 
        title: 'Personalized Approach', 
        description: 'Experienced and expert team with Master\'s degree.', 
        img: whychooseus3,
        para1: 'Get tailored support and guidance from our expert team, focusing on your unique needs and goals.',
        para2: 'Our team provides personalized yoga, nutrition, and lifestyle guidance that caters to individual goals.'
      },
      { 
        title: 'Personalized Approach', 
        description: 'Experienced and expert team with Master\'s degree.', 
        img: whychooseus3,
        para1: 'Get tailored support and guidance from our expert team, focusing on your unique needs and goals.',
        para2: 'Our team provides personalized yoga, nutrition, and lifestyle guidance that caters to individual goals.'
      },
      { 
        title: 'Personalized Approach', 
        description: 'Experienced and expert team with Master\'s degree.', 
        img: whychooseus3,
        para1: 'Get tailored support and guidance from our expert team, focusing on your unique needs and goals.',
        para2: 'Our team provides personalized yoga, nutrition, and lifestyle guidance that caters to individual goals.'
      },
    ];
  
    const activeContent = points[activePoint] || points[0]; // Default to first point if none is active
  
    return (
      <section className={`why-choose-us`}>
        <div className={`container`}>
          <div className="row">
            <div className="col-lg-5">
              <ScrollAnimation animateIn="fadeInUp">
                <h2><span>Why</span><br /> Choose Us</h2>
              </ScrollAnimation>

              {/* Points box */}
              <div className={`points-box`}>
                {points.map((point, index) => (
                  <div
                    key={index}
                    className={`points ${activePoint === index ? 'active' : ''}`} 
                    onClick={() => handleClick(index)}
                  >
                    <ScrollAnimation animateIn="fadeInUp">
                      <h3>{point.title}</h3>
                    </ScrollAnimation>
                    <ScrollAnimation animateIn="fadeInUp">
                      <p>{point.description}</p>
                    </ScrollAnimation>
                  </div>
                ))}
              </div>

            </div>
            <div className="col-lg-7 pe-4">
              <div className="img-box">
                <img src={activeContent.img} alt="why choose us" />
              </div>
              <p className='para mt-4'>{activeContent.para1}</p>
              <p className='para'>{activeContent.para2}</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default WhyChooseUs;
