const mongoose = require('mongoose');

let noteSchema=mongoose.Schema({
    title:{
      type:String,
      required:true
    },
  desc:{
    type:String,
    required:true
  },
  user:{
      type:String,
      required:true
    },
  date:{
    type:Date,
    default:Date.now
  },
  isCompleted:{
    type:Boolean,
    default:false
  },
  label:{
      type:String,
    default:""
    }
    })
    mongoose.models={}

    let Note=mongoose.model('Note',noteSchema)
export default Note