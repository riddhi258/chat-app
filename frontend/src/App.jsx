import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import LoginPage from './Pages/LoginPage.jsx';
import SettingsPage from './Pages/SettingsPage.jsx';
import ProfilePage from './Pages/ProfilePage.jsx';
import Navbar from '../src/Components/Navbar';
import { useAuthStore } from './store/useAuthStore.js';
import { useEffect } from 'react';
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore.js';

function App() {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore();
  const{theme}=useThemeStore()

  console.log({onlineUsers});

  useEffect(()=>{
    checkAuth();
  },[checkAuth])
  console.log({authUser});
  if(isCheckingAuth && !authUser)return(
     <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>
     </div>
  )
  return (
    <div data-theme ={theme}>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}/>
        <Route path='/signup' element={!authUser ? <SignupPage/> : <Navigate to="/"/>}/>
        <Route path='/login' element={!authUser ?<LoginPage/> : <Navigate to="/"/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login"/>}/>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
