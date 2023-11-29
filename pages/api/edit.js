import connectToMongo from './connectToMongo.js'
import Note from './Model/noteModel.js'
import jwt from 'jsonwebtoken';
export default async function handler(req, res) {
  const secretKey = 'Taskmate@D-Sandhu';
  if (req.method === 'POST') {
try {
  let user = await jwt.verify(req.body.user, secretKey);
  if(!user){
    res.status(200).json({ alert: 'Note Not Edited ', })
  }
  let note= await Note.find({_id:req.body.id})
   let item= await Note.findOneAndUpdate({_id:req.body.id},{
     title:req.body.title||note[0].title,
     desc:req.body.desc||note[0].desc,
     isCompleted:req.body.marked!="undefined"?req.body.marked:note[0].isCompleted,
     label:req.body.label||note[0].label,
     user:note[0].user,
     date:note[0].date
   })
  console.log(item)
  let note1= await Note.find({_id:req.body.id})
console.log(item)
console.log(note1)
  return res.status(200).json({ success: 'Note updated successfully' ,item,note1});
} catch  {
   return res.status(200).json({ alert: 'Note Not Updated' });

}


  } else {
   res.json({error:"Invalid method"})
  }
}