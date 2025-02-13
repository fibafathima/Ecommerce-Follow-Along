const jwt = require('jsonwebtoken');
require('dotenv').config()

const authenticate = (req,res,next)=>{
    const token = req.headers?.authorization?.split("")[1]

    if(token){
        const decoded = jwt.verify(tokenprocess.env.SECRET_KEY)
        if (decoded){
            const emailId = decoded.email
            req.body.email = emailId
            next()

        }else{
            res.send("Login Please")
        }
    }
}

module.export ={authenticate}