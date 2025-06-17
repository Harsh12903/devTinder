import React, { useEffect } from 'react'
import baseUrl from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice';
import axios from 'axios';
import UserCard from './UserCard';
import SwipeCards from './SwipeCards';

const Feed = () => {
  const feed=useSelector(store=>store.feed);
  const dispatch=useDispatch();
  const getfeed=async()=>{
    if(feed)return;
    try{const res=await axios.get(baseUrl+"/feed",{withCredentials:true});
    dispatch(addFeed(res?.data?.data));
    console.log(res.data);
  }
  catch(err){
    console.error(err);
  }  
  }
  useEffect(()=>{
    getfeed();
  },[]);
  const handleSendRequest=async(status,userId)=>{
    try {
      const res=await axios.post(baseUrl+'/request/send/'+status+'/'+userId,{},{withCredentials:true});
      dispatch(removeFeed(userId));
    } catch (error) {
      
    }
  }
  const handleswipe=(dir,profile)=>{
    if(dir==='right'){
      handleSendRequest("interested",profile._id);
    }else if(dir==='left'){
      handleSendRequest("ignored",profile._id);
    }
  }
  if(!feed)return;
  if(feed.length<=0)return(<h1 className='flex justify-center my-10'>No New Users Found!!</h1>)
  return ( feed &&(
    <div className='flex justify-center my-10'> 
      <SwipeCards profiles={feed} onSwipe={handleswipe} />  
    </div>
  ))
}

export default Feed
