const Image = require('../models/imgModel'); // Corrected model name
const mongoose = require('mongoose');

const imgup = async (req, res) => {
  try {
    const { buffer } = req.file; // Access the buffer containing the image data
    const newImage = new Image({
      image: buffer.toString('base64'), // Convert buffer to base64 and save in the database
    });
    await newImage.save();
    res.json(newImage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = { imgup , getAllImages };
