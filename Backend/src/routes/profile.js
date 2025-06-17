const express=require('express');
const {userAuth}=require('../middlewares/auth');
const profileRouter=express.Router();
const {validateEditData}=require('../utils/validation');
const bcrypt=require('bcrypt');
const validator=require('validator');

// for getting the profile
profileRouter.get('/profile/view',userAuth,async(req,res)=>{
    try{
        const user=req.user;
        res.send(user);
    }catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
})

profileRouter.patch('/profile/edit',userAuth,async (req,res)=>{
    try{
        if(!validateEditData(req)){
        throw new Error("Edit not Allowed!!");
    }
    const loggedInUser=req.user;
    Object.keys(req.body).forEach((f)=>(loggedInUser[f]=req.body[f]));
    await loggedInUser.save();
    res.json({message:`${loggedInUser.firstName}, your profile has updated successfully`,data:loggedInUser});}
    catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
})

profileRouter.patch('/profile/password',userAuth,async(req,res)=>{
    try{
        if(!validator.isStrongPassword(req.body.password)){
            throw new Error("Enter a Strong Password");
        }
        const hashedpass=await bcrypt.hash(req.body.password,10);
        const loggedInUser=req.user;
        loggedInUser.password=hashedpass;
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName}, your password has been changed successfully!!`);
    }catch(err){
        res.status(400).send("ERROR : "+err.message);
    }
})

module.exports=profileRouter;