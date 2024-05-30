const express = require('express')

// controller functions
const { loginUser, signupUser, getdatas, deleteid,email,updateuser } = require('../controllers/userController')

const router = express.Router()
const mongoose = require('mongoose');
// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

//getting
router.get('/get', getdatas)

//deleting
router.delete('/del/:id', deleteid)

//getting id info 
router.get('/email/:email', email);
//updating user
router.patch('/up/:email', updateuser);

module.exports = router