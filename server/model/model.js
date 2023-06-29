const mongoose=require("mongoose");

var schema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        type:Number,
        unique:true
    },
    licenseno:String,
    vehicleno:String,
})

const Userdb=mongoose.model('userdb',schema);
//mongoose have a method name model(they are responsible for creating and reading documents) in which i have specified document name userdb(we can specify any name to this 
//document)and then pass the shape of thos document i.e schema.

module.exports=Userdb;
//Now after creating the model we have to create controller of this website using controller, i am going to update,
// delete and add records.



