const validator=require('validator');

const validateSignUpData=(req)=>{
    const {firstName,email,password}=req.body;

    if(!firstName){
        throw new Error("Not a Valid Name");
    }
    if(!validator.isEmail(email)){
        throw new Error("Email is not Valid");
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Enter a Strong Password");
    }
}
const validateEditData=(req)=>{
    const allowedUpdate=["about","age","skills","photoUrl","gender","firstName","lastName"];
    const isEditAllowed=Object.keys(req.body).every((field)=>allowedUpdate.includes(field));
    return isEditAllowed;
}
module.exports={validateSignUpData,validateEditData,};