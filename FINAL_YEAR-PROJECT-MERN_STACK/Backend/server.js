require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const bodyParser = require('body-parser');
const multer = require('multer');
const  imgRoutes = require('./routes/image')
const path = require('path');
const login = require('./routes/log')
const alert = require('./routes/alert')
const del = require('./routes/del')
// express app
const app = express()

// middleware 
app.use(express.json())


// Middleware for handling multipart/form-data (image uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/datas', workoutRoutes)
app.use('/user', userRoutes)
app.use('/image',imgRoutes)
app.use('/log',login)
app.use('/alert',alert)
app.use('/delll', del)
// Middleware for parsing JSON
app.use(bodyParser.json());


// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })


 
