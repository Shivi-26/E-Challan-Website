const mongoose=require("mongoose");

var userschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    ruleviolated:String,
    dateOfviolation:String,
    vehicleno:String,
    amount:Number,
})
const Userchallan=mongoose.model('userchallan',userschema);
module.exports=Userchallan;