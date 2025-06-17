const express=require('express');
const { userAuth } = require('../middlewares/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const userRouter=express.Router();
const safedata="firstName lastName about age gender skills photoUrl";

userRouter.get('/user/requests/received',userAuth,async(req,res)=>{
    try {
        const loggedInUser=req.user;
        const connectionList=await ConnectionRequest.find({
            touserId:loggedInUser._id,
            status:"interested"
        }).populate("fromuserId",safedata);
        res.json({message:"data fetched successfully", data:connectionList});

    } catch (error) {
        res.status(400).send("ERROR : "+error.message);
    }
})

userRouter.get('/user/connections',userAuth,async(req,res)=>{
    try {
        const loggedInUser=req.user;
        const connectionList=await ConnectionRequest.find({
            $or:[
                {fromuserId:loggedInUser._id,status:"accepted"},
                {touserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromuserId",safedata).populate("touserId",safedata);

        const data=connectionList.map((row)=>{
            if(row.fromuserId._id.toString()===loggedInUser._id.toString()){
                return row.touserId;
            }else{
                return row.fromuserId;
            }
        });
        res.json({data});
    } catch (error) {
        res.status(400).send("ERROR : "+error.message);
    }
})

userRouter.get('/feed',userAuth,async(req,res)=>{
    try {
        const page=parseInt(req.query.page)|| 1;
        let limit=parseInt(req.query.limit)||10;
        limit=limit>50?50:limit;
        const skip=(page-1)*limit;
        const loggedInUser=req.user;
        const connectionList=await ConnectionRequest.find({
            $or:[
                {fromuserId:loggedInUser._id},{touserId:loggedInUser._id}
            ]
        }).select("fromuserId touserId");
        const hideUserFromFeed=new Set();
        connectionList.forEach((user)=>{
            hideUserFromFeed.add(user.fromuserId.toString());
            hideUserFromFeed.add(user.touserId.toString());
        })
        const users=await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUserFromFeed)}},{_id:{$ne:loggedInUser._id}}
            ]
        }).select(safedata).skip(skip).limit(limit);
        // console.log(users)
        res.json({data:users});
    } catch (error) {
        res.status(400).send("ERROR : "+error.message);
    }
})
module.exports=userRouter;