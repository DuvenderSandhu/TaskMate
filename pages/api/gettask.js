import connectToMongo from './connectToMongo.js'
import Note from './Model/noteModel.js'

export default async function handler(req, res) {

  if (req.method === 'POST') {
try {
  let note= await Note.find({_id:req.body.id})
   if(note.length!=0){
  return res.status(200).json({ success: note});
     
   }
  else{
    
   return res.status(200).json({ alert: 'Task Not Found' });
  }
} catch  {

}


  } else {
   res.json({error:"Invalid method"})
  }
}