// routes/auth.js


const LoginLog = require('../models/logmodel');
const mongoose = require('mongoose');


// Login route
//router.post('/login', async (req, res) => {
  
  const login = async (req, res) => {
  
    const email = req.body.email;
    const timestamp = new Date();
    await LoginLog.create({ email, action: 'login' , timestamp});

  // Send response
  res.json({ message: 'Login successful' });
  }

// Logout route
//router.post('/logout', async (req, res) => {
  
  const logout = async (req, res) => {
    const email = req.body.email;
    const timestamp = new Date();

    // Save logout log
    await LoginLog.create({ email, action: 'logout', timestamp });
  
    // Send response
    res.json({ message: 'Logout successful' });
  }
  //get details 
  const gett = async (req, res) => {
  
    const log = await LoginLog.find({}).sort({name: 1})
  
    res.status(200).json(log)
  }
   //delete 
   const del = async (req, res) => {
    const { id } = req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({error: 'No such data'})
    }
  
    const workout = await LoginLog.findOneAndDelete({_id: id})
  
    if (!workout) {
      return res.status(400).json({error: 'No such data'})
    }
  
    res.status(200).json(workout)
  }

  module.exports =  {login,logout,gett,del}
