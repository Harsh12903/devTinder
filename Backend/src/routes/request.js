const express=require('express');
const {userAuth}=require('../middlewares/auth');
const requestRouter=express.Router();
const connnection=require('../models/connectionRequest');
// const { connection } = require('mongoose');
const user=require('../models/user');


// sending the connection request
requestRouter.post('/request/send/:status/:touserId',userAuth,async(req,res,next)=>{
    try{const fromuserId=req.user._id;
        const touserId=req.params.touserId;
        const status=req.params.status;
        const allowedStatus=["ignored","interested"];
    if(!allowedStatus.includes(status)){
        throw new Error("Request Status invalid");
    }
    const uservalid=await user.findById(touserId);
    if(!uservalid){
        throw new Error("User does not exist");
    }
    const existingConnectionRequest=await connnection.findOne({
        $or:[
            {fromuserId,touserId},
            {fromuserId:touserId,touserId:fromuserId},
        ]
    });
    if(existingConnectionRequest){
        throw new Error("Connection request already exists");
    }
    const newconnection=new connnection({touserId,fromuserId,status});
    await newconnection.save();
    res.json({message:`${req.user.firstName} is ${status==='interested'?'interested':'not interested'} in ${uservalid.firstName}`});}
    catch(err){
        res.status(400).send("ERROR : "+ err.message);
    }
})

//reviewing the request
requestRouter.post('/request/review/:status/:requestId',userAuth,async(req,res)=>{
    try{const {status,requestId}=req.params;
    const allowedStatus=["accepted","rejected"];
    if(!allowedStatus.includes(status)){
        throw new Error("Invalid status");
    }
    const loggedInUser=req.user;
    const connectionRequest=await connnection.findOne({
        _id:requestId,
        touserId:loggedInUser._id,
        status:'interested'
    });
    if(!connectionRequest){
        return res
        .status(404)
        .json({ message: "Connection request not found" });    }
    connectionRequest.status=status;
    const data=await connectionRequest.save();
    res.json({message:"Request accepted",data});}
    catch(err){res.status(400).send("ERROR : "+err.message)};
})

module.exports=requestRouter;