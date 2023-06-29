//npm i express morgan nodemon ejs body-parser dotenv mongoose axios
//express:-we are using express to rapidly develop the node application
//morgan:-morgan helps us to log a message everytime when we make a request.
//nodemon:-it allows us to restart the server automatically when we make chnages in the project.
//ejs:-It is the template engine ,it helps us to create dynamic html.
//body parser:-it allows us to serialiaze the data and access the form data using body property.
//dotenv :-it allows us to separate the secret from our spuce code this is useful for collaborative enviornment where 
//we may not share our database login credential to other people.
//mongoose:-it helps to connect with mongodb database.
//axios:-this helps to make a request in express application.

const express = require('express');
const dotenv=require('dotenv');
const morgan = require('morgan');
const bodyparser=require('body-parser');
const path=require("path");
const app=express();
const session=require("express-session");
const {v4:uuidv4} = require("uuid");

const connectDB=require('./server/database/connection');

dotenv.config({path:'config.env'})
const PORT=process.env.PORT||8080

//log request
app.use(morgan('tiny'));

//mongodb connection
connectDB();

app.use(bodyparser.json())
//parse request to body-parser
app.use(bodyparser.urlencoded({extended:true}));

//set view engine
app.set('view engine','ejs');
//app.set("views",path.resolve(__dirname,"views/ejs"));

//load assets
app.use("/css",express.static(path.resolve(__dirname,"assets/css")))
app.use("/js",express.static(path.resolve(__dirname,"assets/js")))

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

//load routers
app.use('/',require('./server/routes/router'));
/*
app.get('/admin_home',(req,res)=>{
    res.render('admin_home');
})
*/

app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`);
})
