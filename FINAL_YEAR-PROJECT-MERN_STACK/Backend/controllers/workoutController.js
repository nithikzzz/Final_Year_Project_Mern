const asset = require('../models/workoutModel')
const deletee = require('../models/delModel')
const mongoose = require('mongoose')
const multer = require('multer');
//middleware 
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//const fs = require('fs').promises;

// get all workouts
const getdatas = async (req, res) => {
  
  const assets = await asset.find({}).sort({name: 1})

  res.status(200).json(assets)
}
//get scarap


// get a single workout with id 
const getdata = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such data'})
  }

  const assett = await asset.findById(id)

  if (!assett) {
    return res.status(404).json({error: 'No such data'})
  }
  
  res.status(200).json(assett)
}

////inserting details with img
const createdata = async (req, res) => {
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

    const workout = await asset.create({
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

//deleting
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid ID' });
  }

  try {
    // Find the workout to be deleted
    const deletedWorkout = await asset.findByIdAndDelete(id);

    if (!deletedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    // Insert the deleted workout details into the deletee table
    const { image, name, model, amount, count, place, warentty_date, totamount, invoice } = deletedWorkout;
    await deletee.create({
      image,
      name,
      model,
      amount,
      count,
      place,
      warentty_date,
      totamount,
      invoice
    });

    res.status(200).json({ message: 'Workout deleted successfully', deletedWorkout });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// update  the existing details in a workout 
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid workout ID' });
  }

  try {
    // Update the existing workout details with the new data from req.body
    const updatedWorkout = await asset.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedWorkout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(updatedWorkout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




// get all workouts with name
const searchBar = async (req, res) => {
try{
        const varr = req.params.query;
            console.log(varr)
  const assets = await asset.find({name :varr},'name')
     console.log(assets);
  res.status(200).json(assets)
}
catch (error) {
  res.status(400).json({error: error.message})
}
}


//update with extra fields 
const upWorkout = async (req, res) => {
  const { id } = req.params;
  console.log('Received PATCH request for workout ID:', id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' });
  }

  const { issue, updatedAmount, updatedDate } = req.body;

  try {
    const updatedProduct = await asset.findOneAndUpdate(
      { _id: id },
      {
        issue,
        updatedAmount,
        updatedDate
        
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(400).json({ error: 'No such products' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//update with limit  
const uplimit = async (req, res) => {
  const { id } = req.params;
  console.log('Received PATCH request for workout ID:', id);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such product' });
  }

  const {limit } = req.body;

  try {
    const updatedProduct = await asset.findOneAndUpdate(
      { _id: id },
      {
        limit
        
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(400).json({ error: 'No such products' });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getdatas,
  getdata,
  createdata,
  upload,
   uplimit,
  deleteWorkout,
  updateWorkout,
  searchBar,
  upWorkout,
  
  
  
  // Add this line
}