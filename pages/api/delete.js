import connectToMongo from './connectToMongo.js'
import jwt from 'jsonwebtoken';
import Note from './Model/noteModel.js'
const secretKey = 'Taskmate@D-Sandhu';
export default async function handler(req, res) {

  if (req.method === 'POST') {
try {
  let user = await jwt.verify(req.body.user, secretKey);
  if(!user){
    res.status(200).json({ alert: 'Note Not deleted ', })
  }
  
   let note= await Note.deleteOne({_id:req.body.id})
  if(note.deletedCount!=0){
  return res.status(200).json({ success: 'Note deleted successfully' ,note});
  }
  else{
  return res.status(200).json({ alert: 'Note Not deleted ', });
    
  }
} catch (e) {
  return res.status(200).json({ alert: 'Note Not deleted ', });
}// Process a POST request
  } else {
   res.json({error:"Invalid method"})
  }
}