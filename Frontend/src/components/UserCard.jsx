import axios from 'axios';
import React from 'react'
import baseUrl from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
  const {_id,firstName,lastName,age,gender,about,photoUrl,skills}=user;
  const dispatch=useDispatch();
  const handleSendRequest=async(status,userId)=>{
    try {
      const res=await axios.post(baseUrl+'/request/send/'+status+'/'+userId,{},{withCredentials:true});
      dispatch(removeFeed(userId));
    } catch (error) {
      
    }
  }
  return (
    <div>
      <div className="card bg-base-200 w-80 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="User" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{lastName? firstName + " "+lastName: firstName}</h2>
    {age && gender && <p>{age+', '+gender} </p>}
    <p>{about}</p>
    <p className="text-white">{skills}</p>
    <div className="card-actions justify-center my-4">
      <button className="btn hover:scale-110 transition duration-200 ease-in-out bg-violet-500" onClick={()=>handleSendRequest("interested",_id)}>Interested</button>
      <button className="btn hover:scale-110 transition duration-200 ease-in-out bg-cyan-700 text-white" 
      onClick={()=>handleSendRequest("ignored",_id)}>Ignore</button>

    </div>
  </div>
</div>
    </div>
  )
}

export default UserCard
