import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './components/user/navbar/Navbar'
import { Outlet } from "react-router-dom";
import Footer from './components/user/footer/Footer';

export default function Root({isLogin,  handelLogout, userData}) {
  return (
    <>
        <Navbar isLogin={isLogin} handelLogout={handelLogout} userData = {userData}/>
        <Outlet/>
        <Footer/>
    
    </>
  )
}
