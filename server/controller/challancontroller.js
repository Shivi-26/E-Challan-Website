var Userchallan = require('../model/indexmodel');

//create and save new user
exports.create = (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }

  //new user
  const challanuser = new Userchallan({
    name: req.body.name,
    email: req.body.email,
    ruleviolated: req.body.ruleviolated,
    dateOfviolation: req.body.dateOfviolation,
    vehicleno: req.body.vehicleno,
    amount: req.body.amount,
  })
  //if we have the body of the post,i am gonna take all the contents and create an instance of this model to save method 
  //just out of that i'm going to call the promise then return this save data to the user and if there is any error we
  // will call the catch method.
  //save user in the databse

  challanuser
    .save(challanuser)
    .then(data => {
      //res.send(data)
      res.redirect("/challan-user");
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occured while creating a create operation"
      });
    });//Now i will use postman to check my api
}


exports.find = (req, res) => {
  //if i want a single data not all data then we do that else we got the whole data.
  if (req.query.id) {  //this is type of query paraeter of express.
    const id = req.query.id;

    Userchallan.findById(id)
      .then(data => {
        if (!data) {
          res.status(404).send({ message: "Not found user with id" + id })
        } else {
          res.send(data)
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Error retrieving user with id" + id })
      })
  } else {
    //so,firstly we will get the data from database and return as resposne 
    Userchallan.find()
      .then(challanuser => {    //calling find method of userChallan object and then call method of promise
        res.send(challanuser)
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "Error occured while retrieving users information" });
      });
  }
}





