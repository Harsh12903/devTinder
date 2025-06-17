const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const validator=require('validator');
const bcrypt=require('bcrypt');

const userSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        maxLength:14,
    },
    lastName:{
        type:String,
        maxLength:20
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error("Invalid Email "+val);
            }
        }
        // match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password:{
        type:String
    },
    gender:{
        type:String,
        lowercase:true,
        validate(val){
            if(!["male","female","others"].includes(val)){
                throw new Error("Gender: invalid Gender");
            }
        }
    },
    age:{
        type:Number,
        min:18
    },
    photoUrl:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/thumbnails/045/711/185/small/male-profile-picture-placeholder-for-social-media-forum-dating-site-chat-operator-design-social-profile-template-default-avatar-icon-flat-style-free-vector.jpg",
        validate(val){
            if(!validator.isURL(val)){
                throw new Error("invalid Url");
            }
        }
    },
    about:{
        type:String,
        default:"i am a software developer",
        maxLength:1000
    },
    skills:{
        type:[String],
    }
},{timestamps:true})
userSchema.methods.getJwt=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"Harsh@52",{expiresIn:"1d"});
    return token;
}
userSchema.methods.validatepass=async function(passwordbyInput){
    const user=this;
    const hashedpass=user.password;
    const isvalidate=await bcrypt.compare(passwordbyInput,hashedpass);
    return isvalidate;
}
const User=mongoose.model('User',userSchema);
module.exports=User;