const express = require('express');

const route = express.Router();
var Userchallan = require('../model/indexmodel');
var adminlogin = require('../model/chalmodel');

const services = require('../services/render');
const controller = require('../controller/controller');
const challancontroller=require('../controller/challancontroller');
const paycontroller=require('../controller/paycontroller');

/**
 * @description Root Route
 * @method GET/
 */
route.get('/', services.homeRoutes);

/**
 * @description for add users
 * @method GET/add-user
 */

route.post('/admin-log', services.admin);
route.get('/admin-log', services.admin);
route.get('/user-log', services.userlogin);
route.get('/admin_home',services.admin_home);
route.get('/add-user', services.add_user);
route.get('/payment-user',services.payment);
route.post('/payment-user',services.payment);
route.get('/pay-table',services.pay_table);
route.post('/pay-table',services.pay_table);

// Login route

route.post('/admin_home', async (req, res) => {
  try {
    const { policeid, password } = req.body;

    // Find the admin document based on policeid
    const admin = await adminlogin.findOne({ policeid });
    console.log(req.body) 

    // Check if admin exists and compare passwords
    if (!admin) {
      console.log('Admin not found:', policeid);
      return res.status(401).json({ error: 'Invalid ID and password.' });
    }

    // Compare the provided password with the stored hashed password
    if (password !== admin.password) {
      console.log('User logged in:', policeid);
      return res.status(401).json({ error: 'Invalid ID and password.' });
    }

    // Store the logged-in user in the session
    req.session.user = policeid;

    // Redirect to the admin_home page or handle success response
    res.redirect('/admin_home');
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Some error occurred while logging in.' });
  }
});


route.get('/userlogin', async (req, res) => {
  try {
    const { email } = req.query;
    const userData = await Userchallan.findOne({ email });
    res.render('userlogin', { challanusers: userData,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send('An error occurred: ' + error.message);
  }
});

/**
 * @description for update user
 * @method GET/update-user
 */
route.get('/update-user', services.update_user);
route.get('/challan-user',services.challan);
route.get('/index-challan',services.indexchallan);
route.post('/index-challan',services.indexchallan);
route.post('/challan-user',services.challan);
route.post('/user-login',services.userlogin);


//API,here we create a request
//route have four http methods post,get,put and delete. and they all take two variables first one we are giving the path and
// in second one we are specifying caklback function of controller.
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

route.post('/api/challanusers', challancontroller.create);
route.get('/api/challanusers', challancontroller.find);

route.post('/api/challans',paycontroller.create);
route.get('/api/challans',paycontroller.find);

module.exports = route;
