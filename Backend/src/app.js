require('dotenv').config();
const express=require('express');
const app=express();
const connectDb=require('./config/database');
const cookieparser=require('cookie-parser');
const authRouter=require('./routes/auth');
const profileRouter=require('./routes/profile');
const cors=require('cors');
const requestRouter=require('./routes/request');
const userRouter=require('./routes/user');
app.use(cors({origin:"http://localhost:5173",credentials:true}));
app.use(cookieparser());
app.use(express.json());//to convert the coming json to jso

app.use('/',authRouter);
app.use('/',profileRouter);
app.use('/',requestRouter);
app.use('/',userRouter);

// first connecting the database and then starting the server
connectDb().then(()=>{
    console.log("database connected");
    app.listen(3000,()=>{console.log("hello from the server")});
}).catch((err)=>{
    console.log("Not connected");
});
