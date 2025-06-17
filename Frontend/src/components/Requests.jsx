import axios from 'axios'
import React, { useEffect } from 'react'
import baseUrl from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addRequest, removeRequest } from '../utils/requestsSlice'

const Requests = () => {
    const requests=useSelector((store)=>store.requests);
    const dispatch=useDispatch();
    const reviewRequest=async(status,_id)=>{
       try{ const res=await axios.post(baseUrl+'/request/review/' +status+'/'+_id,{},{withCredentials:true});
        dispatch(removeRequest(_id));}    
    catch(err){
        console.error('Review request failed:', err.response?.data || err.message);
    }
    }

    const fetchrequests=async()=>{
        const res=await axios.get(baseUrl+'/user/requests/received',{withCredentials:true});
        dispatch(addRequest(res.data.data))
    }
    useEffect(()=>{
        fetchrequests();
    },[]);
    if(!requests)return;
    if(requests.length===0)return <h1 className='flex justify-center py-10'>No Requests found</h1>;
  return (
    <div className='flex justify-center flex-col items-center'>
      <h1 className='font-bold text-3xl'>Requests</h1>  
      
      {requests.map((request)=>{
          const{_id,firstName,lastName,age,gender,about,photoUrl}=request.fromuserId;
        
        return(
            <div key={_id} className='flex h-auto mx-5 bg-base-300 justify-between my-4 w-1/2 rounded-2xl'>
                <div>{console.log(_id,firstName)}
                <img src={photoUrl} className='rounded-full w-28' alt="" />
                </div>
                <div className="mx-10">
                    <h2 className='text-2xl'>{lastName?firstName+' '+lastName:firstName}</h2>
                    {age && gender &&<p>{age+', '+gender} </p>}
                    <p>{about}</p>
                </div>
                <div className='flex justify-end  items-end'>
                <button className="btn hover:scale-110 transition duration-200 ease-in-out bg-violet-500 mx-1" onClick={()=>reviewRequest("accepted",request._id)}>Accept</button>
                <button className="btn hover:scale-110 transition duration-200 ease-in-out bg-cyan-700 text-white mx-1" onClick={()=>reviewRequest("rejected",request._id)}>Reject</button></div>
            </div>
        )
      })}
    </div>
  )
}

export default Requests;
