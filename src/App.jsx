import { Route, Routes } from 'react-router-dom'
import './App.css'
import CircularSlider from './components/CircularSlider'
import Hero from './Pages/Hero'
import Test from './components/Program'
import Programlisting from './Pages/Programlisting'
import Process from './Pages/Process'
import ScrollToTop from './components/ScrollToTop'
import ProgramDetails from './Pages/ProgramDetails'
import Signin from './Pages/Signin'
import SignUp from './Pages/SignUp'
import Forgot from './Pages/Forgot'
import Otp from './Pages/Otp'
import Plan from './Pages/Plan'
import Payment from './Pages/Payment'
import Faq from './Pages/Faq'
import { AuthProvider } from './context/Authcontext'
import Dashboard from './Pages/Dashboard'
import ResetPassword from './Pages/ResetPassword'
import Cart from './Pages/Cart'
import ThankYou from './Pages/ThankYou'
import Goals from './components/Goals'
import AgeRange from './components/AgeRange'
import Injury from './components/Injury'
import Experience from './components/Experience'
import TimeSlot from './components/TimeSlot'
import Budget from './components/Budget'
import InfoForm from './components/InfoForm'
import BuildPlanDetails from './components/BuildPlanDetails'
import CustomizedProgram from './components/CustomizedProgram'
import OnboardingProcess from './Pages/OnboardingProces'
import TolkToExpert from './Pages/TolkToExpert'
import MyBookingDetails from './components/myBookingDetails'
import MyTrainerDetails from './components/MyTrainerDetails'
import MyBooking from './components/MyBooking'
import MyTrainer from './components/MyTrainer'
import MyProfile from './components/MyProfile'
import OnboardingRegisterForm from './components/OnboardingRegisterForm'
import SlotForm from './components/SlotForm'
function App() {

  return (
    <>
    <AuthProvider>
    <ScrollToTop/>
    <Routes>
      <Route 
        path='/test'
        element ={<Test/>}
      />

      <Route 
        path='/'
        element ={<Hero/>}
      />

      <Route 
        path='/process'
        element ={<Process />}
      />

      <Route 
        path='/program/:id'
        element ={<ProgramDetails />}
      />
    
      <Route 
        path='/signin'
        element ={<Signin />}
      />

      <Route 
        path='/signup'
        element ={<SignUp />}
      />
      <Route 
        path='/forgot'
        element ={<Forgot />}
      />
      <Route 
        path='/otp'
        element ={<Otp/>}
      />
      <Route 
        path='/plans/:id'
        element ={<Plan/>}
      />
      <Route 
        path='/category/:id'
        element ={<Programlisting/>}
      />
      <Route 
        path='/cart/:id'
        element ={<Cart/>}
      />
      <Route 
        path='/payment'
        element ={<Payment/>}
      />
      <Route 
        path='/faq'
        element ={<Faq/>}
      />
      <Route 
        path='/dashboard'
        element ={<Dashboard/>}
      />
      <Route 
        path='/reset-password'
        element ={<ResetPassword/>}
      />
      <Route 
        path='/thankyou'
        element ={<ThankYou/>}
      />
      <Route 
        path='/goals'
        element ={<Goals/>}
      />
      <Route 
        path='/agerange'
        element ={<AgeRange/>}
      />
      <Route 
        path='/injury'
        element ={<Injury/>}
      />
      <Route 
        path='/experience'
        element ={<Experience/>}
      />
      <Route 
        path='/timeslot'
        element ={<TimeSlot/>}
      />
      <Route 
        path='/budget'
        element ={<Budget/>}
      />
      <Route 
        path='/info'
        element ={<InfoForm/>}
      />
      <Route 
        path='/build-plan-details'
        element ={<BuildPlanDetails/>}
      />
      <Route 
        path='/customized-plans'
        element ={<CustomizedProgram/>}
      />
      <Route 
        path='/onboarding'
        element ={<OnboardingProcess/>}
      />
      <Route 
        path='/tolktoexpert'
        element ={<TolkToExpert/>}
      />
      <Route 
        path='/mybooking/booking-details/:id'
        element ={<MyBookingDetails/>}
      />
      <Route 
        path='/trainer-details/:id'
        element ={<MyTrainerDetails/>}
      />
      <Route 
        path='/mybooking'
        element ={<MyBooking/>}
      />
      <Route 
        path='/myTrainer'
        element ={<MyTrainer/>}
      />
      <Route 
        path='/myProfile'
        element ={<MyProfile/>}
      />
      <Route 
        path='/onboarding-registration'
        element ={<OnboardingRegisterForm/>}
      />
      <Route 
        path='/booking-time-slot'
        element ={<SlotForm/>}
      />

    </Routes>
    </AuthProvider>
    </>
  )
}

export default App
