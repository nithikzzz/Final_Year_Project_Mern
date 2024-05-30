const deletee = require('../models/delModel')
const mongoose = require('mongoose')
const multer = require('multer');
//middleware 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get all scrap data
const getdel = async (req, res) => {
    try {
      const scrapData = await deletee.find({}).sort({ name: 1 });
      console.log("heyyyy");
      if (scrapData.length === 0) {
        return res.status(404).json({ error: 'No scrap data found' });
      }
      res.status(200).json(scrapData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


  //inserting

  const credata = async (req, res) => {
    const { name, model, amount,count, place, warentty_date} = req.body;
  
    let emptyFields = [];
    if (!req.files || req.files.length !== 2) {
      emptyFields.push('image', 'invoice');
    }
    if (!name) {
      emptyFields.push('name');
    }
    if (!model) {
      emptyFields.push('model');
    }
    if (!amount) {
      emptyFields.push('amount');
    }
    if (!count) {
      emptyFields.push('count');
    }
    if (!place) {
      emptyFields.push('place');
    }
    if (!warentty_date) {
      emptyFields.push('warentty_date');
    }
   
  
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }
    
    try {
      console.log(req.body);
      console.log(req.files);
  
      const imageBuffer = req.files[0].buffer;
      const base64Image = imageBuffer.toString('base64');
      const totamount = amount * count;
      //invoice
  
      const inbuffer = req.files[1].buffer;
      const basein = inbuffer.toString('base64');
  
      const workout = await deletee.create({
        image: base64Image,
        name,
        model,
        amount,
        count,
        place,
        warentty_date,
        totamount,
        invoice:basein ,
      });
  
      res.status(200).json(workout);
      console.log(req.body);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
module.exports={upload,getdel,credata}  ;