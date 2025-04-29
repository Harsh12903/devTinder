const express=require('express');
const app=express();

app.use("/ram",(req,res)=>{
    res.send("Jai shree ram");
})
app.use((req,res)=>{
    res.send("Jai Hanuman");
})
app.listen(3000,()=>{console.log("hello from the server")});