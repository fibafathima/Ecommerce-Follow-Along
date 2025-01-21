const express = require('express');
const mongoose = require('mongoose');
const { userModel } = require('./modell/user.model');

const app = express();
const PORT = 8084
app.use(express.json());
const mongURL='mongodb+srv://fibaaah:Jaseenamujeeb8830@fibaaah.dnfd5.mongodb.net/ecommerce_db';
let connection = mongoose.connect(mongURL)




app.get("/ping",(req,res)=>{
    res.send("pong");
})

app.post("/create",async(req,res)=>{
    let payload = req.body;
    
    try{
        let new_user = new userModel(payload);
        await new_user.save();
        res.send({"message":"Hurray! Successfully saved user to the Database"})
    }catch(error){
        console.log(error)
        res.send({"error": error})

    

}})

app.listen(PORT,async()=>{
    try{
        await connection;
    console.log('sucessfully connected to MOngoDB');
    }catch(err){
        console.log(err);
        
    }
    console.log(`server is running on ${PORT}`);
})