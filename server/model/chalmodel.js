const mongoose=require("mongoose");

var adminschema=new mongoose.Schema({
    policeid:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    }
})

const adminlogin=mongoose.model('adminlogin',adminschema)
//mongoose have a method name model(they are responsible for creating and reading documents) in which i have specified document name userdb(we can specify any name to this 
//document)and then pass the shape of thos document i.e schema.

module.exports=adminlogin;
//Now after creating the model we have to create controller of this website using controller, i am going to update,
// delete and add records.



