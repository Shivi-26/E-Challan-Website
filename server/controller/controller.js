var Userdb = require('../model/model');

//create and save new user
exports.create = (req, res) => {
    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content cannot be empty" });
        return;
    }

    //new user
    const user = new Userdb({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        licenseno: req.body.licenseno,
        vehicleno: req.body.vehicleno,
    })

    //if we have the body of the post,i am gonna take all the contents and create an instance of this model to save method 
    //just out of that i'm going to call the promise then return this save data to the user and if there is any error we
    // will call the catch method.

    //save user in the databse
    user
        .save(user)
        .then(data => {
            //res.send(data)
            res.redirect("/add-user");
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured while creating a create operation"
            });
        });//Now i will use postman to check my api

}



//retrieve and return all users/ retrieve and return a single user
exports.find = (req, res) => {
    //if i want a single data not all data then we do that else we got the whole data.
    if (req.query.id) {  //this is type of query paraeter of express.
        const id = req.query.id;

        Userdb.findById(id)
         .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found user with id"+id})
            }else{
                res.send(data)
            }
         })
         .catch(err=>{
            res.status(500).send({message:"Error retrieving user with id" +id})
         })
    } else {
        //so,firstly we will get the data from database and return as resposne 
        Userdb.find()
            .then(user => {    //calling find method of Userdb object and then call method of promise
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occured while retrieving users information" });
            });
    }
}

//update a new identified user by user id
exports.update = (req, res) => {
    if (!req.body) {
        return res
            .status(400)
            .send({ message: "Data to update can not be empty" })
    }
    const id = req.params.id;  //s0, i get the id value from this request by using the param object
    //in express two types of parameters exist url and query parameter so in router.js we have(route.put('/api/users/:id',controller.update);)
    //url parameter, when we make port request i need to specify value to this id parameter(jis id ko denge usi ki value update hogi)
    //and that value is going to be stored in const id variable.

    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        //findByIdAndUpdate:-grabs the document matching that particular id and simply updates the data inside the documnet.
        //useFindAndModify:-it is deprecations in the mongodb nodejs driver that mongoose should be aware of by default we 
        //need to set it false
        .then(data => {  //and then here we return the promise
            if (!data) {
                res.status(404).send({ message: `Cannot update user with ${id}.may user not found!` })
            } else {
                res.send(data)
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error update user information" })
        })
}

//delete a user with specified user id in the request
exports.delete = (req, res) => {
    const id = req.params.id;   //
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `cannot delete with id ${id}.Maybe id is wrong` })
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
}




