import axios from 'axios'
import React, { useEffect } from 'react'
import baseUrl from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnection } from '../utils/connectionSlice'

const Connections = () => {
    const dispatch=useDispatch();
    const connections=useSelector((store)=>store.connections);
    const fetchConnections=async()=>{
        const res=await axios.get(baseUrl+'/user/connections',{withCredentials:true});
        dispatch(addConnection(res.data.data));
    }
    useEffect(()=>{
        fetchConnections();
    },[]);
    if(!connections)return;
    if(connections.length===0)return <h1 className='flex justify-center py-10'>No connections found</h1>;
  return (
    <div className='flex justify-center flex-col items-center'>
      <h1 className='font-bold text-3xl'>Connections</h1>  
      
      {connections.map((connection)=>{
          const{_id,firstName,lastName,age,gender,about,photoUrl}=connection;
        return(
            <div key={_id} className='flex h-auto mx-5 bg-base-300 my-4 w-1/2 rounded-2xl hover:scale-105 transition duration-150 ease-linear'>
                <div>
                <img src={photoUrl} className='rounded-full w-28' alt="" />
                </div>
                <div className="mx-10">
                    <h2 className='text-2xl'>{lastName?firstName+' '+lastName:firstName}</h2>
                    {age && gender &&<p>{age+', '+gender} </p>}
                    <p>{about}</p>

                </div>
            </div>
        )
      })}
    </div>
  )
}

export default Connections
