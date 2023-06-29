const Challan=require('../model/payment');

exports.create=(req,res)=>{
    if(!req.body){
        res.status(400).send({message:"Content cannot be empty"});
        return;
    }

    const challan=new Challan({
        optionId:req.body.optionId,
        optionText:req.body.optionText,
        pay:req.body.pay,
        amount:req.body.amount,
    })

    challan
      .save(challan)
      .then(data=>{
        res.redirect("/payment-user");
      })
      .catch=(err=>{
        res.status(500).send({
            message:err.message || "Some errror occurred"
        });
      });
}

exports.find = (req, res) => {
    //if i want a single data not all data then we do that else we got the whole data.
    if (req.query.id) {  //this is type of query paraeter of express.
        const id = req.query.id;

        Challan.findById(id)
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
        Challan.find()
            .then(challan => {    //calling find method of Userdb object and then call method of promise
                res.send(challan)
            })
            .catch(err => {
                res.status(500).send({ message: err.message || "Error occured while retrieving users information" });
            });
    }
}
