import connectToMongo from './connectToMongo.js'
import jwt from 'jsonwebtoken';
import User from './Model/userModel.js'  
import bcrypt from 'bcryptjs';
export default async function handler(req, res) {
  const secretKey = 'Taskmate@D-Sandhu';
  
  if (req.method === 'POST') {
    await connectToMongo()
    let users=await User.find({username:req.body.username.toLowerCase()})
    // Process a POST request
    if(users.length!=0){
      if(bcrypt.compareSync(req.body.password, users[0].password)){
        const payload = {
          username: req.body.username.toLowerCase(),
        };
        const token = await jwt.sign(payload, secretKey, { expiresIn: '1h' });
        console.log(token)
        res.status(200).json({success:"Login Successfully",token:token})
      }
      else{
        res.json({alert:"Invalid Username and Password"})
      }
    }else{
      res.json({alert:"Invalid Username  and Password"})
    }
  } else {
   res.json({error:"Invalid method"})
  }
}