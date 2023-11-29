const mongoose = require('mongoose');

let userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },})
    mongoose.models={}
    
    let User=mongoose.model('User',userSchema)
export default User