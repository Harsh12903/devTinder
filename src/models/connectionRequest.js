const mongoose=require('mongoose');
const User=require('./user');
const connectionRequestSchema=new mongoose.Schema({
    fromuserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    touserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    },
    status:{
        type:String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
        },
        required:true,
    }
},{timestamps:true})

//this is called every time before ssaving
connectionRequestSchema.pre('save',function(next){
    const connection=this;
    if(connection.touserId.equals(connection.fromuserId)){
        throw new Error("You can't send request to yourself");
    }
    next();
})
connectionRequestSchema.index({fromuserId:1,touserId:1});
const ConnectionRequest=new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports=ConnectionRequest;