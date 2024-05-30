const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '300d' })
}

// Function to send a welcome email
const sendWelcomeEmail = (email, name,password) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'diginasset@gmail.com',  // Replace with your Gmail email
      pass: 'rylx trgo cxbn rdio',        // Replace with your Gmail password
    },
  });

  var mailOptions = {
    from: 'diginasset@gmail.com',  // Replace with your Gmail email
    to: email,
    subject: 'Welcome to Your Digin',  // Customize the subject
    text: `Hello ${name}, Welcome to our app ......you are added as a user by the Admin :)..... Email : ${email}, Password : ${password}, happy working !`,  // Customize the email body
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// signup a user
const signupUser = async (req, res) => {
  const { name, email, authority, password, cpassword, phno } = req.body;

  try {
    // Check if password and cpassword match
    const user = await User.signup(name, email,authority, password, cpassword, phno);

    // create a token
    const token = createToken(user._id);
    
    // Call the function to send a welcome email
    sendWelcomeEmail(email, name,password);

    res.status(200).json({ email, token, name, phno,authority });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//get the datas from singup
const getdatas = async (req, res) => {
  try {
    // Assuming there's a property 'isSignedUp' to filter the data
    const users = await User.find({ isSignedUp: true }).sort({ name: 1 });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// delete id
const deleteid = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such data'})
  }

  const workout = await User.findOneAndDelete({_id: id})

  if (!workout) {
    return res.status(400).json({error: 'No such data'})
  }

  res.status(200).json(workout)
}
//getting sigle id info 
const email = async (req, res) => {
  try {
    const userEmail = req.params.email;
    console.log(userEmail)
    const user = await User.findOne({ email: userEmail });

    if (!user) {
    return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
//updating infooo
const updateuser = async (req, res) => {
  try {
    // Extract email from request parameters
    const userEmail = req.params.email;
    
    // Find the user by email in the database
    let user = await User.findOne({ email: userEmail });

    // If user not found, return 404 error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user information with data from request body
    user.name = req.body.name || user.name;
    user.phno = req.body.phno || user.phno;
    user.authority=req.body.authority ||user.authority;

    // Check if password field is present in request body
    if (req.body.password) {
      // Hash the new password
      user.cpassword = req.body.password;
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      // Update user's hashed password field
      user.hashedPassword = hashedPassword;
      // Also update the original password field
      user.password = req.body.password;
    }

    // Save the updated user information
    user = await user.save();

    // Return success response with updated user information
    res.status(200).json(user);
  } catch (error) {
    // If any error occurs, return 400 error with error message
    res.status(400).json({ error: error.message });
  }
};



module.exports = { signupUser, loginUser ,getdatas,deleteid ,email,updateuser}