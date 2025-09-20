import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './App.css'
import authService from './appwrite/Auth';
import { setLogin,logout } from './store/authSlice';
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
  return (
    <>
      
      <h1>A blog app with appwrite</h1>
    </>
  )
}

export default App
