import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import baseUrl from '../utils/constants'
import { addUser } from '../utils/userSlice'

const Body = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const userdata=useSelector((store)=>store.user);
  const fetchuser=async()=>{
    if(userdata)return;
    try{const res=await axios.get(baseUrl+"/profile/view",{withCredentials:true});
    dispatch(addUser(res.data));  
  }catch(err){
    if(err.status===401){
      navigate("/login");
    }
    console.error(err);
  }
}
useEffect(()=>{
  fetchuser();
},[]);


  return (
    <div>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Body
