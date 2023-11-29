
import connectToMongo from './connectToMongo.js'
import jwt from 'jsonwebtoken';
import Note from './Model/noteModel.js'
export default async function handler(req, res) {
  const secretKey = 'Taskmate@D-Sandhu';
  if (req.method === 'POST') {
  try{
    await connectToMongo()
    let user = await jwt.verify(req.body.user, secretKey);
    if(!user){
      res.status(200).json({ alert: 'Something Went Wrong ', })
    }
    let notes= await Note.find({user:user.username.toLowerCase()});
    console.log(notes)
    res.json({tasks:notes})
  }
    catch{
      res.json({alert:"Something Went Wrong"})
    }
  } else {
   res.json({error:"Invalid method"})
  }
}