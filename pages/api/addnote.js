import Note from './Model/noteModel.js';
import connectToMongo from './connectToMongo.js';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  const secretKey = 'Taskmate@D-Sandhu';

  if (req.method === 'POST') {
    try {
      await connectToMongo();

      let user = await jwt.verify(req.body.user, secretKey);
        console.log(user)
      if (user) {
        let notes = await Note.create({
          user: user.username,
          title: req.body.title,
          desc: req.body.desc
        });

        res.json({ success: "Task Added Successfully" });
      } else {
        res.json({ alert: "Invalid User" });
      }
    } catch (error) {
      res.json({ alert: "Something Went Wrong" });
    }
  } else {
    res.json({ error: "Invalid method" });
  }
}
