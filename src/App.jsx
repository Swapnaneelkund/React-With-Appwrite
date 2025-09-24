import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css'
import authService from './appwrite/Auth';
import { setLogin,logout } from './store/authSlice';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import { Outlet } from 'react-router-dom';
function App() {
  const[loading,setloading]=useState(true);
  const dispatch=useDispatch();
  useEffect(()=>{
    authService.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(setLogin({userData}));
      }else{
        dispatch(logout());
      }
    }).catch((err)=>{
      console.log(err);
      
    }).finally(()=>{
      setloading(false);
    })
  })
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400 w-full p-8 '>
      <div className='w-full block jusify-center items-center'>
           <Header/>
           <main>
            <Outlet/> 
           </main>
           <Footer/>
      </div>

    </div>
  ):(null);
}

export default App
