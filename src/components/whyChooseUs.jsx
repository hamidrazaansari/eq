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
        description: 'Organized platform for all goals, ages, genders, and budgets.', 
        img: whychooseus1,
        para1: 'We provide a unified platform that bridges the gap in an unorganized market. Offering solutions for all health needs and goals, across all ages, levels, and budgets—from beginners to advanced practitioners—in group or personalized formats, workshops, and regular 45- or 60-minute sessions.',
        // para2: 'Platform offering comprehensive support for yoga, nutrition, and lifestyle. It provides integrated resources and guidance to enhance overall.'
      },
      { 
        title: 'Holistic Health Solutions', 
        description: 'Tailored yoga, nutrition, and lifestyle support for you', 
        img: whychooseus1,
        para1: 'Your one-stop destination for wellness, we provide tailored yoga, personalized nutrition plans, and lifestyle guidance to address modern life’s challenges and support your unique needs. As ambassadors of yoga, we promote physical and mental well-being through sustainable yogic practices, mindful eating, and proven natural methods.',
        // para2: 'We offer a comprehensive and cohesive approach to well-being that fits every lifestyle.'
      },
      { 
        title: 'Expert Team', 
        description: 'Highly qualified team with Master’s degrees and expertise.' ,
        img: whychooseus3,
        para1: "Our expert team is dedicated to providing you with the highest standard of care and guidance. With Master’s degrees in yoga and nutrition, and years of experience, our professionals are well-equipped to help you with all the goals that you may have. Whether youre a beginner or an advanced practitioner, you'll benefit from our team's in-depth knowledge and personalized approach.",
      },
      { 
        title: 'Flexible Scheduling', 
        description: 'Convenient rescheduling and easy cancellations to fit your needs', 
        img: whychooseus3,
        para1: 'Life gets hectic, but your wellness shouldn’t be compromised. With our flexible scheduling, you can reschedule or cancel sessions up to 3 hours in advance. Plus, you get one last-minute cancellation and one period-related cancellation each month at no extra charge. No need to stress about missed sessions—your plan adapts to your schedule, not the other way around.',
      },
      { 
        title: 'Exceptional Support', 
        description: 'Amazon-Level Support. Need We Say More?', 
        img: whychooseus3,
        para1: 'We take pride in exceptional customer service, with a team ready to answer questions, address concerns, and assist whenever needed. If a session doesn’t meet your expectations, we’ll ensure a resolution, including a possible session reversal. We have a robust feedback system and respond to all feedback within hours.',
      },
      { 
        title: 'In-Person Experience Online', 
        description: 'Immersive, in-person feel in a virtual training environment', 
        img: whychooseus3,
        para1: 'Experience the best of both worlds with our online training that feels just like an in-person session. Our expert instructors offer real-time feedback and personalized adjustments, tailoring intensity to your level and guiding you on prop usage for comfort. Enjoy interactive guidance while practicing in the comfort of your own space.',
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
                      <h3>{point.title}</h3>
                      <p>{point.description}</p>
                  </div>
                ))}
              </div>

            </div>
            <div className="col-lg-7 pe-4">
              <div className="img-box">
                <img src={activeContent.img} alt="why choose us" />
              </div>
              <p className='para mt-4'>{activeContent.para1}</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default WhyChooseUs;
