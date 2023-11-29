  const mongoose = require('mongoose');
async function connectToMongo(){
console.log("HI")
  const mongoURI = 'mongodb+srv://DSandhu:vYvzLxLPaEvDHcON@cluster0.utx41cq.mongodb.net/?retryWrites=true&w=majority';

 await  mongoose.connect(mongoURI);

  const db = mongoose.connection;

   db.on('error', console.error.bind(console, 'Connection error:'));
   db.once('open', function() {
    console.log('Connected to MongoDB!');
    // Your code for interacting with the database goes here
  });

}
export default connectToMongo