import React , {useState , useEffect} from 'react'
import '../assets/css/thankyou.css'
import thankyouCreative from '../assets/image/thankyou-crative.png'
import NavBar from '../components/NavBar';
import { useLocation , useNavigate } from 'react-router-dom';

function ThankYou() {
  const [count, setCount] = useState(10); // Starting count (e.g., 20 seconds)
  const navigate = useNavigate();

  const handleGotoMyBooking =() =>{
    navigate('/dashboard', { state: { section: 'My Bookings' } });

  }

  useEffect(() => {
    // Start the countdown
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          clearInterval(timer); 
          navigate('/dashboard', { state: { section: 'My Bookings' } });
          return 0; 
        }
      });
    }, 1000); // Run every 1 second

    // Cleanup the timer on component unmount
    return () => clearInterval(timer);
  }, [navigate]);
  const location = useLocation();
  const data = location.state?.order
  

  return (
    <div className='thankyou'>
      {/* <NavBar/> */}
        <div className="container d-flex align-items-center justify-content-center flex-column">
          <img className='creative' src={thankyouCreative} alt="" />
          <h2>Thank You for choosing Equilibrium Yoga</h2>
          <p>Your Order is Succssful</p>
          {/* <h3>Order ID - {data._id}</h3> */}
          <button onClick={handleGotoMyBooking}>View Booking Details</button>
          <h4 className='mt-2 text-danger'>00:{String(count).padStart(2, '0')}</h4>
          </div>
    </div>
  )
}

export default ThankYou