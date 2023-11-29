import connectToMongo from './connectToMongo.js'
import User from './Model/userModel.js' 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
export default async function handler(req, res) {

  if (req.method === 'POST') {
    await connectToMongo()
    let users= await User.find({username:req.body.username})
  if(users.length===0){
    await User.create({username:req.body.username.toLowerCase(),password:await bcrypt.hash(req.body.password, await bcrypt.genSalt(10))})
    console.log(req.body.password)
    res.json({"success":"User Created"})
  }else{
    res.send({"alert":"Username Already Exists"})
  }
    // Process a POST request
  } else {
   res.json({error:"Invalid method"})
  }
}