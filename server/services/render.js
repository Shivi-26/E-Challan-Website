const axios=require('axios');

exports.homeRoutes=(req,res)=>{
  res.render('index');
}
    
exports.admin=(req,res)=>{
  res.render('admin');
}

exports.userlogin = (req, res) => {
  const { email } = req.query;
  axios.get(`http://localhost:4000/api/challanusers?email=${email}`)
    .then(function (response) {
      const userData = response.data.find(user => user.email === email);
      res.render('userlogin', { challanusers: userData });
    })
    .catch(err => {
      res.send(err);
    });
};


exports.admin_home=(req,res)=>{
  //Make a get request to /api/users
  axios.get('http://localhost:4000/api/users')
  .then(function(response){
      //console.log(response.data);
      //res.render('index',{users:New data});
      res.render('admin_home',{users:response.data});
  })
  .catch(err=>{
      res.send(err);
  })

}
exports.pay_table=(req,res)=>{
  axios.get('http://localhost:4000/api/challans')
  .then(function(response){
    res.render('pay_table',{challans:response.data});
  })
  .catch(err=>{
    res.send(err);
  })
}

exports.add_user=(req,res)=>{
    res.render('add_user');
}
exports.challan=(req,res)=>{
    res.render('challan');
}

exports.payment=async(req,res)=>{
  res.render('payment');
}

exports.indexchallan=(req,res)=>{
  axios.get('http://localhost:4000/api/challanusers')
  .then(function(response){
      //console.log(response.data);
      //res.render('index',{users:New data});
      res.render('indexchallan',{challanusers:response.data});
  })
  .catch(err=>{
      res.send(err);
  })

}
exports.update_user=(req,res)=>{
    axios.get('http://localhost:4000/api/users',{params:{id:req.query.id}})
      .then(function(userdata){
        res.render("update_user",{user:userdata.data});
      })
      .catch(err=>{
        res.send(err);
      })
}

