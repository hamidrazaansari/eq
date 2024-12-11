import React, { useState } from 'react';
import '../assets/css/circularslider.css';
import testimonial1 from '../assets/image/yoga-testi-1.png';
import testimonial2 from '../assets/image/yoga-testi-2.png';
import testimonial3 from '../assets/image/yoga-testi-3.png';
import testimonial4 from '../assets/image/yoga-testi-4.png';
import testimonial5 from '../assets/image/yoga-testi-5.png';
import testimonial6 from '../assets/image/yoga-testi-6.png';
import testimonial7 from '../assets/image/yoga-testi-7.png';
import testimonial8 from '../assets/image/yoga-testi-8.mp4';
import testimonial9 from '../assets/image/yoga-testi-9.mp4';
import testimonial10 from '../assets/image/yoga-testi-10.mp4';
import { MdOutlineNavigateNext  } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";



function CircularSlider() {
  const [currentBox, setCurrentBox] = useState(0); // Track the current box index
  const [direction, setDirection] = useState('next'); // Track the direction of animation

  // Define an array of testimonials with images
  const boxes = [
    { id: 1, image: testimonial1, text: 'Testimonial 1' ,type: "image" },
    { id: 2, image: testimonial2, text: 'Testimonial 2' ,type: "image" },
    { id: 3, image: testimonial3, text: 'Testimonial 3' ,type: "image" },
    { id: 4, image: testimonial4, text: 'Testimonial 4' ,type: "image" },
    { id: 5, image: testimonial5, text: 'Testimonial 5' ,type: "image" },
    { id: 6, image: testimonial6, text: 'Testimonial 6' ,type: "image" },
    { id: 7, image: testimonial7, text: 'Testimonial 7' ,type: "image" },
    { id: 8, image: testimonial8, text: 'Testimonial 8' ,type: "video" },
    { id: 9, image: testimonial9, text: 'Testimonial 9' ,type: "video" },
    { id: 10, image: testimonial10, text: 'Testimonial 10' ,type: "video" },
  ];

  const handleNext = () => {
    setDirection('next'); // Set the direction to 'next'
    setCurrentBox((prev) => (prev + 1) % boxes.length);
  };

  const handlePrev = () => {
    setDirection('prev'); // Set the direction to 'prev'
    setCurrentBox((prev) => (prev - 1 + boxes.length) % boxes.length);
  };
  const handleDotClick = (index) => {
    setDirection(index > currentBox ? 'next' : 'prev');
    setCurrentBox(index);
  };

  return (
    <div className="container">
      <div className={`slider ${direction}`}>
        {boxes.map((box, index) => {
          let boxClass = '';
          // Determine which class to apply based on the current box index
          if (index === currentBox) {
            boxClass = 'center'; // Current box is in the center
          } else if (index === (currentBox + 1) % boxes.length) {
            boxClass = 'right'; // Next box is on the right
          } else if (index === (currentBox - 1 + boxes.length) % boxes.length) {
            boxClass = 'left'; // Previous box is on the left
          } else {
            boxClass = ''; // Default case, not visible
          }

          return (
            <div key={box.id} className={`box ${boxClass} ${direction}`}>
              {box.type === "image" ?
              <img src={box.image} alt={`Testimonial ${box.id}`} />
               :
               <video src={box.image} controls></video>
                }
            </div>
          );
        })}
      </div>
      <button onClick={handleNext} className="nav-btn next-btn">
      <MdOutlineNavigateNext/>
      </button>
      <button onClick={handlePrev} className="nav-btn prev-btn">
      <GrFormPrevious/>
      </button>
            {/* Slider Dots */}
            <div className="dots-container">
        {boxes.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentBox === index ? 'active' : ''}`}
            onClick={() => handleDotClick(index)}
          ><div className='dot-inner'></div> </span>
        ))}
      </div>
    </div>
  );
}

export default CircularSlider;
