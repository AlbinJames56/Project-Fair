 
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './Components/Footer' 
import Auth from './Pages/Auth' 
import Projects from './Pages/Projects' 
import Home from './Pages/Home'
import DashBoard from './Pages/DashBoard'
import 'react-toastify/dist/ReactToastify.css';
import {   ToastContainer, toast,Bounce } from 'react-toastify';
import { TokenAuthContext } from './ContextAPI/TokenAuth'
import { useContext } from 'react'

function App() {
  const {isAuthorized,setIsAuthorized}=useContext(TokenAuthContext)
  return (
    <> 
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={isAuthorized?<DashBoard/>:<Home/>}/>
      <Route path='/login' element={<Auth/>}/>
      <Route path='/register' element={<Auth register/>}/>
      <Route path='/projects' element={isAuthorized?<Projects/>:<Home/>}/> 
      <Route path='/*' element={<Navigate to={'/'}/>}/>
    </Routes>
    <Footer/>
    <ToastContainer position="top-center" autoClose={3000} theme="dark" transition={Bounce}/>
    </>
  )
}
export default App
