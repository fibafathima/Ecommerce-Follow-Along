const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mongURL='mongodb+srv://fibaaah:Jaseenamujeeb8830@fibaaah.dnfd5.mongodb.net/ecommerce_db';
let connection = mongoose.connect(mongURL)
PORT = 8084

app.get("/ping",(req,res)=>{
    res.send("pong");
})

app.listen(PORT,async()=>{
    try{
        await connection;
    console.log('sucessfully connected to MOngoDB');
    }catch(err){
        console.log(err);
        
     }
     console.log(`server is running on ${PORT}`);
})