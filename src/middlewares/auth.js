const jwt=require('jsonwebtoken');
const User=require('../models/user');

const userAuth=async(req,res,next)=>{
    try{const {token}=req.cookies;
    if(!token){
        return res.status(401).send("Please Login")
    }
    const decoded=jwt.verify(token,"Harsh@52");
    const user=await User.findById(decoded);
    if(!user){
        throw new Error("User not found");
    }
    req.user=user;
    next();}
    catch(err){
        res.send("ERROR : "+err.message);
    }
}
module.exports={
    userAuth,
};