const mongoose=require('mongoose');

const connectDb=async ()=>{
    await mongoose.connect("mongodb+srv://aarush2752:ceWYIWd0ExrfxI0T@cluster0.fdsypkk.mongodb.net/devTinder");
};
module.exports=connectDb;