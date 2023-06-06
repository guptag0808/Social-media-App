const jwt= require("jsonwebtoken")
const {userModel} = require("../model/userModel")
require('dotenv').config();

const  auth= async(req,res,next)=>{
  const token=  req.headers.authorization
   try{
	if(!token) return res.status(403).send({"msg":"Please Login First"})
	var decoded = jwt.verify(token,process.env.JWTtoken )
	const {userId}= decoded
	const user= await userModel.findById(userId)
	if(!user) return res.status(401).send({"msg":"User not found"})
	req.user= user
	console.log(user)
	next()
	 
   }
   catch(err){
	res.send(err.message)
   }
}


module.exports = {auth}