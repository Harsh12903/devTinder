const express=require('express');
const authRouter=express.Router();
const {validateSignUpData}=require('../utils/validation');
const User=require('../models/user');
const bcrypt=require('bcrypt');


// to sign up the user
authRouter.post('/signup', async(req,res)=>{
    try{
        // first validate the data
        validateSignUpData(req);

        //then encrypt the password
        const {password,firstName,lastName,email}=req.body;
        const hashedpass=await bcrypt.hash(password,10);
        const user=new User({
            firstName,lastName,email,password:hashedpass
        });
        const savedUser=await user.save();
        const token=await user.getJwt();
        res.cookie("token",token,{expires:new Date(Date.now()+24*3600000)});
        res.json({message:"user added Successfuly",data:savedUser});
    }catch(err){
        res.status(400).send("Something went wrong "+err.message);
    }
})


// for logging in the user
authRouter.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email:email});
        if(!user){
            throw new Error("Invalid Credentials");
        }
        const isvalidpass=await user.validatepass(password);
        if(isvalidpass){
            const token=await user.getJwt();
            res.cookie("token",token,{expires:new Date(Date.now()+24*3600000)});
            res.send(user);
        }else{
            throw new Error("Invalid Credentials");
        }
    }catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
})

authRouter.post('/logout',async(req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())});
    res.send("Logout Successful!!");
})
module.exports=authRouter;