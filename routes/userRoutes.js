const express= require('express')
const jwt= require("jsonwebtoken");
const bcrypt= require("bcrypt")
const {userModel} = require("../model/userModel")
const {auth}= require("../middleware/authentication")
require('dotenv').config();
const userRouter= express.Router()


//  user Regiter 
userRouter.post("/register",async(req,res)=>{
	const {name,email,password,dob,bio}= req.body
	   try{
		const user= await userModel.findOne({email})
	    
		if(user) return res.send({"msg":"User already exists"})
		bcrypt.hash(password, 5, async(err, hash)=> {
              if(err) throw err
			  const newUser= new userModel({name,email,password:hash,dob,bio})
			 await newUser.save()
			 res.status(201).send({"msg":"User successfully registered",newUser})
		});
   }catch(err){
	res.status(500).send({"msg":err.message})
		console.log(err.message)
	}
})

 userRouter.post("/login",async(req,res)=>{
	const {email,password}= req.body;
	try{
		const user= await userModel.findOne({email})
		if(user){
			bcrypt.compare(password, user.password, async(err, result)=> {
		       if(err)return res.send ({msg:"Password incorrect"})
			   var token = jwt.sign({ userId: user._id }, process.env.JWTtoken);
			      res.status(201).send({"msg":"User successfully registered","Token":token})
			});
		}else{
			res.send({"msg":"Please Register First"})
		}
	}catch(err){
		res.status(500).send({"msg":err.message})
	}
 })

 // find all user 

 userRouter.get("/users",async(req,res)=>{
    try{
      const user= await userModel.find()
	   res.status(200).send(user)
	}catch(err){
		res.send({"msg":err.message})
	}
 })

 // send friends Request

 userRouter.post("/users/:id/friends", auth, async (req, res) => {
	try {
	  const { id } = req.params;
	  const { user } = req;
  
	  const findUser = await userModel.findById(id);
	  if (!findUser) {
		return res.status(404).send({ msg: "User not found" });
	  }
  
	  const isAlready = findUser.friendRequests.includes(user._id);
	  if (isAlready) {
		return res.status(400).send({ error: "Friend request already sent" });
	  }
  
	  findUser.friendRequests.push(user._id);
	  await findUser.save();
  
	  res.send({ message: "Friend request sent successfully" });
	} catch (err) {
	  res.status(500).send({ msg: "Internal Server Error", err: err.message });
	}
  });



  userRouter.put("/users/:id/friends/:friendId", auth, async (req, res) => {
    try {
      const { id, friendId } = req.params;
      const { user } = req;
  
      const getUser = await userModel.findById(id);
      if (!getUser) {
        return res.status(404).send({ msg: "User not found" });
      }
  
      const RequestId =new mongoose.Types.ObjectId(friendId); 
  
      const requestIndex = getUser.friendRequests.findIndex(
        (request) => request.equals(RequestId) 
      );
      if (requestIndex === -1) {
        return res.status(404).send({ msg: "Friend request not found" });
      }
  
      getUser.friendRequests.splice(requestIndex, 1);
  
      const { status } = req.body;
      if (status === "accept") {
        getUser.friends.push(friendId);
  
        const friend = await userModel.findById(friendId);
        if (!friend) {
          return res.status(404).send({ msg: "Friend not found" });
        }
        friend.friends.push(id);
  
        await friend.save();
      }
  
      await getUser.save();
  
      res.send({ message: "Friend request handled successfully" });
    } catch (err) {
      res.status(500).send({ msg: "Internal Server Error", error: err.message });
    }
});
  


userRouter.get("/users/friends", auth, async (req, res) => {
    try {
      const { user } = req;
  
      const authuser = await userModel.findById(user._id).populate("friends", "name email");
  
      if (!authuser) {
        return res.status(404).send({ msg: "User not found" });
      }
  
      res.send(authuser.friends);
    } catch (err) {
      res.status(500).send({  "error": err.message });
    }
});

module.exports= {userRouter}