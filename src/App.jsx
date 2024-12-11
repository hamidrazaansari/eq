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

      
    

    </Routes>
    </AuthProvider>
    </>
  )
}

export default App
