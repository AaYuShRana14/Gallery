const mongoose=require('mongoose');
const {Schema}=mongoose;
const userSchema=new Schema({
    password:{
        type:String,
        required:true,
    },
    images:[],
    email:{
        type:String,
        required:true,
        unique:true
    }
})
module.exports=mongoose.model("TheUsers",userSchema);